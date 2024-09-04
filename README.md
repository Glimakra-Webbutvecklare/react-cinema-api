# React Cinema API

## Översikt
Detta är API:et för React Cinema-applikationen. Det hanterar filmer, visningar och bokningar för ett biografsystem.

## Funktioner
- Hantering av filmer (CRUD-operationer)
- Hantering av visningar (CRUD-operationer)
- Hantering av bokningar (CRUD-operationer)
- Swagger-dokumentation för API-endpoints

## Teknisk stack
- Node.js
- Express.js
- MongoDB med Mongoose
- Swagger för API-dokumentation

## Installation
1. Klona repot
2. Kör `npm install` för att installera beroenden
3. Konfigurera din MongoDB-anslutning i en .env-fil
4. Kör `npm start` för att starta servern

## API-dokumentation
API-dokumentationen är tillgänglig via Swagger UI. Efter att ha startat servern, gå till `/` för att se och testa API-endpoints.

## Modeller
- Film (Movie)
- Visning (Show)
- Bokning (Booking)

## Rutter
- `/api/v1/movies`: Hantering av filmer
- `/api/v1/shows`: Hantering av visningar
- `/api/v1/bookings`: Hantering av bokningar

## Utveckling
För att köra i utvecklingsläge, använd `npm run dev`. Detta startar servern med nodemon för automatisk omstart vid ändringar.

## Produktion
API:et är konfigurerat för produktion på `https://cinema-api.henrybergstrom.com/api/v1`

## Bidrag
Bidrag är välkomna! Vänligen skapa en pull request för eventuella förbättringar eller nya funktioner.
