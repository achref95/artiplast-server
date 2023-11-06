# ARTIPLAST

<br>

## Description

Welcome to ARTIPLAST invoice generator, the ultimate invoice generator designed to empower your business with effortless invoicing and unmatched customization! Tailored for businesses of all sizes, our cutting-edge solution redefines the way you create invoices, making the process seamless, stylish, and entirely personalized.

## User Stories

# User
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's not available for me.
-  **Signup:** As a user I can sign up in the platform so that I can start generating invoice for my clients.
-  **Login:** As a user I can login to the platform so that I can start generating invoice for my clients.
-  **Logout:** As a user I can logout from the platform so no one else can tamper mine and my clients information.
-  **Add clients:** As a user I can add new clients to my database.
-  **Add Products:** As a user I can add new products to my database.
-  **Generate Invoices:** As a user I can generate new invoices for my previously added clients by using the previously added products I added
-  **See clients list:** As a user I can see my clients list.
-  **See generated invoices:** As a user I can see previously generated invoices for each client.
-  **Delete previously generated invoices:** As a user I delete previously generated invoices.

<br>

# Server / Backend


## Models



User model

```javascript
 {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
```

Client model

```javascript
  {
    name: {
      type: String,
      required: true
    },
    taxNumber: {
      type: String,
    },
    invoices: [{
      type: Schema.Types.ObjectId,
      ref: 'Invoice'
    }]
  }
```

Invoice model

```javascript
{
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true
    },
    products: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Product"
    },
    price: {
      type: [Number],
      required: true
    },
    quantity: {
      type: [Number],
      required: true,
    },
    discount: {
      type: [Number],
    },
    tva: {
      type: [Number],
    },
    timbre: {
      type: Number,
    },
    observation: {
      type: String,
    }
  }
```

Product model

```javascript
  {
    product: {
      type: String,
      required: true
    }
  },
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/verify    `           | jwt token                | 200            | 400          | Check if user is logged in and return user details      |
| POST        | `/auth/signup`                | {username, password}      | 200         | 400          | Signup new user                      |
| POST        | `/auth/login`                | {username, password}      | 200          | 400          | Login                      |
| GET         | `/client/all`                 | (empty)         | 200            | 400          | Login              |
| GET         | `/client/get`             |      (empty)         |     200          |      404       | Get all clients from the database           |
| GET         | `/client/:clientId`              |            {clientId}                   |     200          |     404         | Get specific client details     |
| POST        | `/client/add`              |              {name, taxNumber}                |    200     | 404             | Get new client to the database                |
| GET         | `/invoice/get`                        |     (empty)        | 200           | 400          | Get all invoices  |
| GET         | `/invoice/:invoiceId`                 |       {invoiceId}                       | 200            | 400          | Get a specific invoice details                  |
| POST        | `/invoice/generate`                 |  { name, products, price, quantity, discount, timbre, tva, observation }     | 200          | 400          | Generate a new invoice |
| GET         | `/product/get`                |            (empty)       |   200             | 400          | Display all products from the database        |
| POST        | `/product`                 |     {product}      |     200           |       400       | Add a new product to the database                     |




<br>


## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/achref95/artiplast-client-vite)

[Server repository Link](https://github.com/achref95/artiplast-server)

[Deployed App Link](https://artiplast-client-vite.vercel.app/)