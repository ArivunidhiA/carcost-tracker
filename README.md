# 🚗 CarCost Tracker

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](./package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Status](https://img.shields.io/badge/status-active-success)](#)
[![Tech](https://img.shields.io/badge/tech-Node.js%20%7C%20Express%20%7C%20TypeScript%20%7C%20Prisma%20%7C%20PostgreSQL-black)](#-tech-stack)

CarCost Tracker is a lightweight **vehicle expense tracking REST API**. It lets you:

- Register users and issue JWTs
- Create vehicles per user
- Log expenses per vehicle (fuel, service, insurance, etc.)

---

## 📚 Table of Contents

- [✨ Overview](#-overview)
- [✅ Features](#-features)
- [🏗️ Architecture](#-architecture)
- [🧰 Tech Stack](#-tech-stack)
- [⚡ Quick Start](#-quick-start)
- [🔐 Configuration](#-configuration)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [📌 API Reference](#-api-reference)
- [📄 License](#-license)

---

## ✨ Overview

**Goal:** Provide a clean backend foundation for tracking vehicle ownership + expenses using a relational model (User → Vehicle → Expense).

**Highlights**

- **TypeScript-first** Express API
- **Prisma + Postgres** persistence
- **JWT authentication** (login endpoint issues token; enforcing auth on routes can be added via middleware)
- **Docker Compose** for local Postgres
- Ready to deploy via **Render** (`render.yaml`) and **Procfile**

---

## ✅ Features

### 👤 User & Auth

- Create user account (`POST /api/users`)
- Login to receive JWT (`POST /api/users/login`)
- Password hashing using `bcrypt`

### 🚙 Vehicle Management

- List vehicles (`GET /api/vehicles`)
- Create vehicle (`POST /api/vehicles`)

### 🧾 Expense Tracking

- List expenses (`GET /api/expenses`)
- Create expense (`POST /api/expenses`)
- Supports category, note, and optional custom date

### 🧱 Platform / Ops

- Security headers via `helmet`
- Request logging via `morgan`
- CORS enabled via `cors`
- Basic JSON error responses via `errorHandler`

---

## 🏗️ Architecture

### 🗺️ High-level diagram

```text
Client / Frontend
       |
       v
 Express API (TypeScript)
  - Routes (/api/*)
  - Controllers
  - Middleware
       |
       v
 Prisma Client
       |
       v
 PostgreSQL
```

### 🧩 Components

| Component | Location | Responsibility |
|---|---|---|
| Express app bootstrap | `src/app.ts` | Middleware setup + mount API routes under `/api` |
| Server entrypoint | `src/server.ts` | Loads env + starts HTTP server |
| Routers | `src/routes/*` | Route definitions (`/users`, `/vehicles`, `/expenses`) |
| Controllers | `src/controllers/*` | Request handlers + input mapping |
| Prisma client | `src/services/prisma.ts` | Database client + graceful disconnect |
| Error handler | `src/middleware/errorHandler.ts` | Centralized error → JSON response |
| Prisma schema | `schema.prisma` | Data model (User/Vehicle/Expense) |
| Deploy config | `render.yaml`, `Procfile` | Render & Proc-style startup |

---

## 🧰 Tech Stack

### 🖥️ Backend

- **Node.js** (>= 18)
- **Express** (REST API)
- **TypeScript**
- **Prisma** ORM
- **PostgreSQL** database

### 🧪 Quality

- **Jest** (`npm test`)

### 🧱 Infrastructure

- **Docker Compose** for local Postgres (`docker-compose.yml`)
- **Render** deployment (`render.yaml`)

---

## ⚡ Quick Start

### ✅ Prerequisites

- Node.js **18+**
- A Postgres database (local, Docker, or managed)
- (Optional) Docker + Docker Compose

### 📦 Installation

```bash
npm install
```

### 🔐 Environment setup

Create a `.env` file (example below) and set at minimum:

- `DATABASE_URL`
- `JWT_SECRET`

### 🗄️ Database migration

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### ▶️ Run locally (dev)

```bash
npm run dev
```

API base URL:

- `http://localhost:3000/api`

### 🐳 Run with Docker Compose (Postgres + app)

This repo includes a `docker-compose.yml` with `db` and `app` services. **Note:** the `app` service expects a `Dockerfile`, which is not currently present.

Start Postgres only:

```bash
docker compose up db
```

Or, after adding a `Dockerfile`, run everything:

```bash
docker compose up --build
```

---

## 🔐 Configuration

### 🌱 Environment variables

| Variable | Required | Example | Notes |
|---|---:|---|---|
| `PORT` | no | `3000` | Defaults to `3000` |
| `DATABASE_URL` | yes | `postgresql://postgres:example@localhost:5432/carcost?schema=public` | Prisma Postgres connection string |
| `JWT_SECRET` | yes | `change-me` | Used to sign JWTs (do not use `dev` in production) |

Example `.env`:

```bash
PORT=3000
DATABASE_URL="postgresql://postgres:example@localhost:5432/carcost?schema=public"
JWT_SECRET="super-long-random-secret"
```

---

## 🧪 Testing

Run tests:

```bash
npm test
```

Notes:

- A basic test exists under `src/routes/index.test.ts`.
- If you expand the test suite with `supertest`, ensure the dependency is installed and configured for CI.

---

## 🚀 Deployment

### Render

This repo includes `render.yaml` with:

- Build: `npm run build`
- Start: `npm run start`

You must provide `DATABASE_URL` (and `JWT_SECRET`) as Render environment variables.

### Procfile platforms

`Procfile` runs:

```text
web: npm run start
```

---

## 📌 API Reference

Base path: `/api`

### 👤 Users

- `POST /api/users`
  - Body: `{ "email": string, "password": string, "name"?: string }`
- `POST /api/users/login`
  - Body: `{ "email": string, "password": string }`
  - Returns: `{ "token": string }`

### 🚙 Vehicles

- `GET /api/vehicles`
- `POST /api/vehicles`
  - Body: `{ "make": string, "model": string, "year": number, "userId": string }`

### 🧾 Expenses

- `GET /api/expenses`
- `POST /api/expenses`
  - Body: `{ "vehicleId": string, "amount": number, "category": string, "note"?: string, "date"?: string }`

---

## 📄 License

Licensed under the **MIT License**. See [`LICENSE`](./LICENSE).