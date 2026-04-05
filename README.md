# Finance Dashboard Backend API

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs

## Core Features

1. **User & Role Management:** Secure registration and login system. roles: (`viewer`, `analyst`, `admin`)
2. **Financial Records CRUD:** Full management of financial entries (Income/Expense) with dynamic filtering (by type, category, date).
3. **Analytics:** A dedicated dashboard API utilizing MongoDB's Aggregation Pipeline to instantly calculate total income, total expenses, net balance, category-wise totals, and monthly trends.
4. **Secure Authentication:** JWTs are delivered via secure, HTTP-only cookies.

---

## Local Setup Instructions

**1. Clone the repository**

```bash
git clone https://github.com/Redfreet/Finance-Dashboard.git
cd Backend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure Environment Variables**
Create .env in root folder

```bash
PORT=3030
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_key
```

**4. Start the server**

```bash
npm run dev
```

## Assumptions Made

1. If a date is not explicitly provided during record creation, the system assumes the current server time.

## Tradeoffs

```bash

**Tradeoff:** SQL provides strict ACID compliance which is traditionally preferred for financial ledgers.
**Decision:** MongoDB was chosen because this application functions primarily as an analytical dashboard and expense tracker rather than a live payment gateway.

**Tradeoff:** No global error handler.
**Decision:** Handled errors locally within controller try/catch blocks to prioritize readability and rapid development with error codes.
```

## API Documentation

I have added postman collection in root folder which contains all APIs.
