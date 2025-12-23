# CarCost Tracker

Initial scaffold for CarCost Tracker — a simple expense tracking API for vehicles.

Setup
1. Copy .env.example to .env and update DATABASE_URL and JWT_SECRET.
2. npm install
3. npx prisma migrate dev --name init
4. npm run dev

Project layout
- src/ - application source
- prisma/ - Prisma schema

CI/Tests
- GitHub Actions workflow defined in .github/workflows/ci.yml

License: MIT