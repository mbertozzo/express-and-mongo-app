# Express.js App

This is a demo app to test Express routes and the integration with MongoDB.
It shows a list of fake users retrieved from the DB, providing a detailed view for each entry and allowing to edit the data for each user and saving it back to the DB

## Installation

Clone this repo to your local machine, and install the dependencies:

```sh
yarn install
```

Please note that you need to have MongoDB installed in your machine. Launch it with the command **mongod**.
To import some dummy data to the DB use the following command:

```sh
mongoimport --db test --collection users --drop --file user_list.json
```

## Usage

To launch the project just type

```sh
yarn dev
```

to use the nodemon with hot-realoading on file saving, or

```sh
yarn start
````

to launch standard node.