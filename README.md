# TMTC Backend API

This is the backend API for **project**, built with **Node.js, Express, MongoDB, and Redis**.  
The project is fully containerized using **Docker** and **Docker Compose** and **CI/CD PIPELINE JENKINS**

---

## 🚀 Features
- User authentication with JWT
- user creation with validation (register and login)
- Itinerary management (CRUD operations)
- Redis caching for optimized performance
- MongoDB for persistent storage
- Swagger API documentation
- Dockerized setup with MongoDB & Redis
- easyly you can create user and with his token you can create itineraries.
- just for info you can use get itineraries api like : api/itineraries?sort=startDate:asc or api/itineraries?destination=goa ....

---

## 📦 Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB ( Docker)
- **Cache:** Redis
- **Auth:** JWT
- **API Docs:** Swagger
- **Containerization:** Docker & Docker Compose

---
## 🛠️ build CI/CD PIPELINE (jenkins)

![Alt text](https://github.com/user-attachments/assets/d1a280f5-ff99-4840-aec1-dc27f42c1834)


## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/vijay6781/tmtc-backend.git
cd tmtc-backend
docker-compose up --build
swagger endpoint -> /api-docs/


