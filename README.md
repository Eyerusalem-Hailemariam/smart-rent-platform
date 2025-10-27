# Smart Rent Platform — Backend

Microservices:
- auth-service
- listing-service
- booking-service
- notification-service
- payment-service

Prerequisites:
- Node.js 18+, npm
- Docker (optional)

Quick start (Docker):
```bash
docker compose up --build
```

Run a single service locally:
```bash
cd <service>
npm install
# create .env (see examples below)
npm run dev
```

Example .env (minimal)
auth-service/.env
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/authServiceDB
JWT_SECRET=your_jwt_secret
```
listing-service/.env
```
PORT=5002
MONGO_URI=mongodb://localhost:27017/listingdb
```

Tests:
```bash
cd listing-service
npm install
npm test
```

Notes:
- Use `"type": "module"` in package.json for ESM or keep CommonJS exports/imports consistent.
- If `docker-compose` is not found, install Docker Compose or use `docker compose`.

Project structure:
- auth-service/
- listing-service/
- booking-service/
- notification-service/
- payment-service/
- docker-compose.yml
