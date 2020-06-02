# Simulation of Handshake Using GraphQL

Simulation of Handshake is the replica of the website named Handshake. All the services offered by the Handshake for student and company is achieved in this project using GraphQL(Data query and manipulation language).

## Architecture Diagram
![image](https://user-images.githubusercontent.com/46435796/83484849-b510a400-a45a-11ea-858c-c80cb3708c00.png)

## Getting Started

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node index.js
```
"index.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
It will start our frontend server which is in React.
Everything is set and you are good to go.

## Running the tests

To run test for this system.
Traverse to test folder in Backend and enter
```
npm test
```
This will run the tests defined in the file.
You can add new Tests by adding test cases in this file.

## Deployment

To deploy this on live system go to aws.amazon.com and follow the steps to instantiate EC2 instance.

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [GraphQL](https://graphql.org/learn/) - An open-source data query and manipulation language
* [NodeJS](https://nodejs.org/en/docs/) - run time open source development platform
* [MongoDB](https://dev.mysql.com/doc/) - Database used

## Author

* **Aayush Sukhadia**
