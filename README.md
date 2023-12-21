<H1 align ="center" >Afilia Backend (API)</h1>
<h5  align ="center"> 
This repository contains a backend implementation for the Afiliya application, namely an application for trying products before making a purchase and as an affiliate of the product for income from affiliates.</h5>
<br/>

## Project Description
The Afiliya backend is built using the JavaScript programming language and the Express JS framework. It provides API endpoints for user authentication and user-related operations. The backend utilizes JWT for authentication, MySQL for data storage, and includes database migration capabilities.

  * [Configuration and Setup](#configuration-and-setup)
  * [Technologies used](#technologies-used)
  * [Project Structure](#project-structure)
  * [Cloud Architecture](#cloud-architecture)
  * [Database Sturucture](#database-structure)
  * [Author](#author)
  * [License](#license)

## Configuration and Setup
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)

In the first terminal

```
$ cd Afiliya-Backend
$ yarn install
$ yarn run dev
```

In the second terminal

- Create your MySQL database, which you will use as your database
- Supply the following credentials

```
#  --- .env  ---

# Database Configuration
DATABASE_URL="<YOUR_DATABASE_URL>"
DATABASE_NAME="<YOUR_DATABASE_NAME>"
DATABASE_PORT="<YOUR_DATABASE_PORT>"
DATABASE_USERNAME="<YOUR_DATABASE_USERNAME>"
DATABASE_PASSWORD="<YOUR_DATABASE_PASSWORD>"

# Token Configuration
TOKEN_KEY="<YOUR_TOKEN_KEY>"
TOKEN_EXPIRY="<YOUR_TOKEN_EXPIRY>"

# Email Configuration
AUTH_EMAIL="<YOUR_AUTH_EMAIL>"
AUTH_PASS="<YOUR_AUTH_PASS>"

# GOOGLE CLOUD ENVIRONMENT
PROJECT_ID="<YOUR_PROJECT_ID>"
KEY_SECRET_FILE="<YOUR_KEY_SECRET_FILE>"

# Cloud Storage Configuration
BUCKET_PRODUCT_NAME="<YOUR_BUCKET_NAME>"
BUCKET_USER_NAME="<YOUR_BUCKET_NAME>"
BUCKET_SHOP_NAME="<YOUR_BUCKET_NAME>"

# Machine Learning URL
MACHINE_LEARNING_URL="<YOUR_MACHINE_LEARNING_URL>"

# Set running port
PORT=""

```

## Technologies used

This project was created using the following technologies.

- [Node JS](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express JS](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [MySql12](https://www.npmjs.com/package/mysql2) - For authentication
- [Cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware
- [Bcrypt JS](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [Nodemon](https://www.npmjs.com/package/nodemon) - To monitor changes to the program code that is being developed
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser) - A middleware for web frameworks
- [Sequelize](https://www.npmjs.com/package/sequelize) - An Object-Relational Mapping (ORM) for Node.js that makes it easy to access relational databases such as MySQL, PostgreSQL, and SQLite using the JavaScript programming language.
- [Crypto](https://www.npmjs.com/package/argon2) - A password-hashing function that summarizes the state of the art in the design of memory-hard functions and can be used to hash passwords for credential storage, key derivation, or other applications.
- [Google-cloud/storage](https://www.npmjs.com/package/@google-cloud/storage) - To interact with the Google Cloud Storage object storage service.
- [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize) - Implement authentication for users with site applications.
- [Nodemailer](https://www.npmjs.com/package/nodemailer) - To send an email from a Node.js application.
- [Qrcode terminal](https://www.npmjs.com/package/qrcode-terminal) - To create and display QR codes in the terminal or console using Node.js.
- [Sqlite](https://www.npmjs.com/package/sqlite) - To relational databases that are serverless, self-contained, and file-based.
- [Whatsapp-web.js](https://wwebjs.dev/) - For bots or automated scripts to send messages OTP.

## Project Structure
```bash
├── eslintrc.json
├── package.json
├── README.md
├── SECURITY.md
├── src
│   ├── config
│       └── Database.js
│   ├── controllers
│       ├── auth
│           └── GenerateOTPTelephoneControllers.js
│       ├── AddressControllers.js
│       ├── OrderControllers.js
│       ├── ProductControllers.js
│       ├── ShopControllers.js
│       ├── UserControllers.js
│       ├── others file ...
│   ├── db
│       └── db_afiliya.sql
│   ├── middlewares
│       └── AuthMiddleware.js
│   ├── models
│       ├── AddressesModel.js
│       ├── GenerateOTPTelephoneModel.js
│       ├── OrdersModel.js
│       ├── ProductsModel.js
│       ├── ShopsModel.js
│       ├── UsersModel.js
│       ├── others file ...
│   ├── routes
│       ├── AddressRoute.js
│       ├── OrderRoute.js
│       ├── ProductRoute.js
│       ├── ProductsModel.js
│       ├── ShopRoute.js
│       ├── UserRoute.js
│       ├── others file ...
│   ├── utils
│       ├── CreateToken.js
│       ├── GenerateOTP.js
│       ├── HashData.js
│       ├── MachineLearning.js
│       ├── SendMessageEmail.js
│       ├── SendMessageTelephone.js
│       ├── others file ...
│   └── server.js
```

##  Cloud Architecture

![img-cloud-structure](https://github.com/Capstone-Project-CH2-PS070/Afiliya-Backend/assets/111676859/6061fb6f-776e-4ef2-9e7c-4146f64cfbe6)

##  Database Structure

![img-database-structure](https://github.com/Capstone-Project-CH2-PS070/Afiliya-Backend/assets/111676859/ee51a1ef-8a71-47c0-b3d1-591606d6e3e6)

## Author
- [Gilbert Hutapea](https://berthutapea.vercel.app/)
- [Aldi Ramdani](https://github.com/AldiRamdani0401)

## License

MIT License

Copyright (c) 2023 Afiliya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
