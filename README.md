
# WorkSphere HRMS 🏢🚀

WorkSphere is a modern, high-performance Human Resource Management System (HRMS) built to manage corporate attendance logging pipelines, leave authorization flows, and payroll ledgers. 

The system features a decoupled architectural pattern containing an administrative governance interface and an employee workflow terminal portal.

---

## 🏗️ Tech Stack Architecture

### Frontend (Client Portal)
* **Framework:** React.js (Vite Core Engine Engine)
* **Styling Engine:** Tailwind CSS (Custom Typography & Color Asset Mapping)
* **Routing:** React Router DOM (Dynamic Dashboard Access Protection)
* **Network Client:** Axios (API Data Payload Streaming)

### Backend (Governance API & Matrix)
* **Runtime Environment:** Node.js
* **Server Framework:** Express.js 
* **Database Engine:** PostgreSQL (Relational Integrity Configuration)
* **Security Layer:** JSON Web Tokens (JWT Access Authentication Policies)

---

## 🎨 System Color Identity Mapping
The platform’s user interface maps directly to customized structural assets in `tailwind.config.js`:
* **Navy Primary (`#1B365D`):** Corporate authority and framework grounding.
* **Mint Teal (`#00A896`):** Status actions, execution targets, and terminal responses.
* **Off-White (`#F9F8F3`):** Flat background structural canvas texture.

---

## 🚀 Unified Deployment & Quick Start

This workspace utilizes `concurrently` to launch both the backend Express engine and the React client ecosystem in a single terminal execution block.

### Prerequisites
Ensure you have **Node.js** and **PostgreSQL** running locally on your perimeter device.

### One-Command Setup & Execution
Copy and paste this script into your terminal terminal to configure the architecture from scratch:

```bash
# 1. Initialize dependencies for both frontend and backend portfolios
npm run install-all

# 2. Fire up the API server and user interface simultaneously
npm start|
```



##📁 Repository Directory Structure

WorkSphere-HR-/
├── client/                 # React SPA Frontend Application
│   ├── src/
│   │   ├── pages/          # Dashboards, Logins, Stream Views
│   │   ├── index.css       # Tailwind directive structures
│   └── package.json
├── server/                 # Node.js Server & Router System
│   ├── api/                # Corporate Endpoint Routing Gateways
│   └── package.json
├── package.json            # Unified Root Workspace Orchestration Control
└── README.md               # Architecture Documentation File
