const fs = require('fs');
const path = require('path');
const readline = require('readline');
const geoip = require('geoip-lite');

const logFilePath = path.join(__dirname, '..', 'access.log');

exports.getPopularRoutes = (req, res) => {
    const routeCount = {};

    const readInterface = readline.createInterface({
        input: fs.createReadStream(logFilePath),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function(line) {
        const match = line.match(/GET ([^\s]+)/);
        if (match) {
            const route = match[1];
            routeCount[route] = (routeCount[route] || 0) + 1;
        }
    });

    readInterface.on('close', function() {
        const sortedRoutes = Object.entries(routeCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([route, count]) => ({ route, count }));

        let htmlTable = '<table border="1"><tr><th>Route</th><th>Count</th></tr>';
        sortedRoutes.forEach(({ route, count }) => {
                htmlTable += `<tr><td>${route}</td><td>${count}</td></tr>`;
            });
            htmlTable += '</table>';

            res.send(htmlTable);
    });
};

exports.getIPRequests = (req, res) => {
    const ipCounts = {};

    const readInterface = readline.createInterface({
        input: fs.createReadStream(logFilePath),
        output: process.stdout,
        console: false
    });

    readInterface.on('line', function(line) {
        const ip = line.split(' ')[0];
        const geo = geoip.lookup(ip);

        ipCounts[ip] = {
            count: (ipCounts[ip]?.count || 0) + 1,
            city: geo?.city || "Unknown",
            country: geo?.country || "Unknown"
        }
        
    });

    readInterface.on('close', function() {
        const sortedIPs = Object.entries(ipCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([ip, data]) => ({ ip, ...data }));

        console.log(sortedIPs);

        let htmlTable = '<table border="1"><tr><th>IP Address</th><th>City</th><th>Country</th><th>Request Count</th></tr>';
        sortedIPs.forEach(({ ip, count, city, country }) => {
            htmlTable += `<tr><td>${ip}</td><td>${city}</td><td>${country}</td><td>${count}</td></tr>`;
        });
        htmlTable += '</table>';

        res.send(htmlTable);
    });
};
exports.getRealTimeLogs = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    const logStream = fs.createReadStream(logFilePath, {encoding: 'utf8'});
    const rl = readline.createInterface({input: logStream, crlfDelay: Infinity});

    rl.on('line', (line) => {
        res.write(line);
    });

    req.on('close', () => {
        rl.close();
    });
};