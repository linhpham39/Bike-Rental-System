# Bikestore Rental Website

This repo is for our class project (IT4409E). We used MERN stack to build the website. Happy watching!

## Executing Instruction

### Backend

    cd backend
    npm i
    npm start

### Frontend

    cd frontend
    npm i
    npm start

    cd server
    npm i
    npm start

## API Documentation:

### Status

    GET /status

### Authentication

    POST /auth/register
    POST /auth/login

### Customer

    GET /customers/
    GET /customers/token
    POST /customers/
    PATCH /customers/:id
    DELETE /customers/:id

### Order

    GET /orders/
    GET /orders/:id
    POST /orders/
    PATCH /orders/:id
    DELETE /orders/:id

### Bike

    GET /bikes/
    GET /bikes/:id
    POST /bikes/
    PATCH /bikes/:id
    DELETE /bikes/:id
    GET /bikes/dock/:dock

### Rating

    GET /rating/
    GET /rating/:id
    POST /rating/
    PATCH /rating/:id
    DELETE /rating/:id

### Coupon

    GET /coupons/
    GET /coupons/:id
    POST /coupons/
    PATCH /coupons/:id
    DELETE /coupons/:id