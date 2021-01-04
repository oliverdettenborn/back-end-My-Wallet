<p align="center">
  <img src="https://raw.githubusercontent.com/thaliadettenborn/front-end-my-wallet/main/public/load.gif" width="100" alt="RepoProvas" />
</p>

# My Wallet (BackEnd)

 ![license](https://img.shields.io/github/license/thaliadettenborn/back-end-My-Wallet?style=flat-square) ![total lines](https://img.shields.io/tokei/lines/github/thaliadettenborn/back-end-My-Wallet) ![last commit](https://img.shields.io/github/last-commit/thaliadettenborn/back-end-My-Wallet?style=flat-square) ![issues](https://img.shields.io/github/package-json/v/thaliadettenborn/back-end-My-Wallet?style=flat-square) ![forks](https://img.shields.io/github/forks/thaliadettenborn/back-end-My-Wallet?style=flat-square) 

<br><br>
## About
<p>
  API to provide data for the My Wallet app.<br><br>
  <a href="https://github.com/thaliadettenborn/front-end-my-wallet" target='_blank'>
    ✔️ Click here to view the front-end repository.
  </a>
</p>


<br><br><br>
<p align="center">
  <a style='color:inherit' href="#pré-requisites">Pre-requisites</a> •
  <a style='color:inherit' href="#running-the-web-applications">Running the web application</a> •
  <a style='color:inherit' href="#features">Features</a> •
  <a style='color:inherit' href="#rest">REST API</a> •
  <a style='color:inherit' href="#tech">Tech Stack</a> •
  <a style='color:inherit' href="#deploy">Deploy</a> •
  <a style='color:inherit' href="#contributors">Contributors</a> •
  <a style='color:inherit' href="#author">Author</a>
</p>

<br><br>
## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine: [Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/). In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

<br><br>
## Running the web application
```bash
# Clone this repository
$ git clone <https://github.com/thaliadettenborn/back-end-My-Wallet>

# Access the project folder cmd/terminal
$ cd back-end-My-Wallet

# Install the dependencies
$ npm install

# Create a file of environment variables at the root of the project
$ touch .env

# Set the database port and link as environment variable according to the ".env.example" file

# Run the app
$ npm start

# The server will automatically start

# Run the tests
$ npm test

```

<br><br>
## Features
- [x] Create a new user and user sign-in<br>
- [x] User sign-out<br>
- [x] Listing all a user's financial records<br>
- [x] Creating a new entry<br>
- [x] Creating a new exit<br>


<br><br>
## REST API
<br>
✔️ Documentation: https://documenter.getpostman.com/view/13440732/TVzLnKDV
<br><br>

### `POST /api/users/sign-up`

#### Request
    curl --location --request POST 'https://thaliadettenborn-my-wallet.herokuapp.com/api/users/sign-up' \
    --data-raw '{
        "name": "José Silva",
        "email": "josesilva@gmail.com",
        "password": "abcd12345",
        "confirmPassword": "abcd12345"
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 2,
      "name": "José Silva",
      "email": "josesilva@gmail.com"
    }


<br><br>

### `POST /api/users/sign-in`

#### Request
    curl --location --request POST 'https://thaliadettenborn-my-wallet.herokuapp.com/api/users/sign-in' \
    --data-raw '{
        "email": "josesilva@gmail.com",
        "password": "abcd12345"
    }'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "userId": 2,
      "name": "José Silva",
      "token": "11f70570-ee30-4d0f-8c1a-3e4731014371"
    }

<br><br>

### `POST /api/users/sign-out`

#### Request
    curl --location --request POST 'https://thaliadettenborn-my-wallet.herokuapp.com/api/users/sign-out' \
    --header 'Authorization: Bearer 11f70570-ee30-4d0f-8c1a-3e4731014371'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

<br><br>

### `GET /api/user/wallet`

#### Request
    curl --location --request GET 'https://thaliadettenborn-my-wallet.herokuapp.com/api/user/wallet' \
    --header 'Authorization: Bearer e2d7f771-7c93-4215-8f00-c10b4ff65ca8'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "records": [
        {
            "id": 4,
            "description": "salary",
            "amount": "R$ 1.200,00",
            "kind": "entry",
            "userId": 2,
            "insertionDate": "04/01"
        }
      ],
      "total": "R$ 1.200,00"
    }

<br><br>

### `POST /api/user/wallet/entry`

#### Request
    curl --location --request POST 'https://thaliadettenborn-my-wallet.herokuapp.com/api/user/wallet/entry' \
    --header 'Authorization: Bearer e2d7f771-7c93-4215-8f00-c10b4ff65ca8' \
    --data-raw '{
        "description": "salary",
        "amount": "1200,00",
        "kind": "entry"
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 4,
      "description": "salary",
      "amount": "R$ 1.200,00",
      "kind": "entry",
      "userId": 2,
      "insertionDate": "04/01"
    }

<br><br>

### `POST /api/user/wallet/outgoing`

#### Request
    curl --location --request POST 'https://thaliadettenborn-my-wallet.herokuapp.com/api/user/wallet/outgoing' \
    --header 'Authorization: Bearer e2d7f771-7c93-4215-8f00-c10b4ff65ca8' \
    --data-raw '{
        "description": "lunch",
        "amount": "50,00",
        "kind": "outgoing"
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 5,
      "description": "lunch",
      "amount": "-R$ 50,00",
      "kind": "outgoing",
      "userId": 2,
      "insertionDate": "04/01"
    }




<br><br>
## Tech Stack
Languages:<br>
<p align="center">
  <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img src="https://img.shields.io/badge/markdown-%23000000.svg?&style=for-the-badge&logo=markdown&logoColor=white"/>
</p>
<br>


The following tools and frameworks were used in the construction of the project:<br>
<p align="center" style='display: flex; justify-content: center; flex-wrap:wrap; align-items: center; margin: 0 50px;'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/cors%20-%2314354C.svg?&style=for-the-badge&logo=cors&logoColor=white"'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/dotenv-%2300ADD8.svg?&style=for-the-badge&logo=dotenv&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/jest%20-%235B2F33.svg?&style=for-the-badge&logo=jest&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/joi-%23276DC3.svg?&style=for-the-badge&logo=joi&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/nodemon%20-%23239120.svg?&style=for-the-badge&logo=nodemon&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/pg%20%20-%232E7EEA.svg?&style=for-the-badge&logo=pg&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/string-strip%20html%20%20-%232E7EEA.svg?&style=for-the-badge&logo=string_strip_html&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/supertest%20-%23000.svg?&style=for-the-badge&logo=supertest&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/dayjs%20-%23276DC3.svg?&style=for-the-badge&logo=dayjs&logoColor=4F4D3F'>

</p>

<br>
  Database:
  <img style='margin-left: 10px;' src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>

<br>
Version Control:
<img style='margin-left: 10px;' src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/>
<img style='margin-left: 5px;'  src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>

<br><br>
## Deploy

The application layout is available on Heroku:
<a style='margin-left: 10px;' href='https://thaliadettenborn-my-wallet.herokuapp.com'><img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/></a>

<br><br>
## Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/responde-ai"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/40724166?s=200&v=4" width="100px;" alt=""/><br /><sub><b>Responde Aí</b></sub></a><br />
  </tr>
</table>

<br><br>
## Author
---
<br>
<p align='center'>
  <img src="https://avatars0.githubusercontent.com/u/70967247?s=460&u=0684339f0717ae41ce18689351f0215fdf270590&v=4" width="100px;" style="border-radius: 50%;"/>
  <br><br>
  Made by Thalia Roberta Dettenborn 👋🏽 Get in Touch!<br>
  <a href="https://www.linkedin.com/in/thaliarobertadettenborn/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>
  <a href="mailto:thalia.born@gmail.com"><img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
  <a href="https://github.com/thaliadettenborn"><img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" /></a>
</p>
