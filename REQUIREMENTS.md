# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# API Endpoints :

# Products :

Index : 'localhost:3000/products/index' [GET]
Show : 'localhost:3000/products/show/:id' [GET]
Create [token required] : 'localhost:3000/products/create' [POST]

# Users

Index [token required] : 'localhost:3000/api/users/index' [GET]
Show (args: userId) [token required] : 'localhost:3000/api/users/show/:id' [GET]
Create [token required] : 'localhost:3000/api/users/create' [POST]
Login [token required] : 'localhost:3000/api/users/login' [POST]

# Orders

Create (args: userId) [token required] : 'localhost:3000/api/orders/create' [POST]
Index [token required] : 'localhost:3000/api/orders/index' [POST]
Show (args: orderId) [token required] : 'localhost:3000/api/orders/show/:id' [POST]
Active Order by user (args: userId) [token required] : 'localhost:3000/api/orders/users/:id/active' [GET]
Completed Orders by user (args: userId) [token required] 'localhost:3000/api/orders/users/:id/completed' [GET]
Show User In Orders(args: userId) [token required] : 'localhost:3000/api/orders/users/:id/orders' [GET]
AddProductToOrder(args :userId,productId,quantity)[token required]:'localhost:3000/api/orders/:id/products' [POST]

# Data Shapes

# Product

id
name
price
category

- Columns Types :

id (SERIAL PRIMARY KEY)
name (VARCHAR)
price (INTEGER)
category (VARCHAR)

# User

id
user_name
first_name
last_name
password

- Column Type :

id (SERIAL PRIMARY KEY)
user_name (VARCHAR UNIQUE)
first_name (VARCHAR)
last_name (VARCHAR)
password (VARCHAR)

# Orders

id
user_id
status

- Column Type :

id( SERIAL PRIMARY KEY)
userId(FOREIGN KEY to USERS) FOREIGN KEY to USERS
currentStatus(VARCHAR)

# Since an order has many products and a product can be in many orders, we need a join table to represent this (N:N) relationship.

# Order_products

id
id of product
quantity of product
id of order to which the product has been added

- Column Type :
  id (SERIAL PRIMARY KEY)
  productId( FOREIGN KEY to PRODUCTS) FOREIGN KEY to PRODUCTS
  quantity (INTEGER)
  orderId (FOREIGN KEY to ORDERS)
