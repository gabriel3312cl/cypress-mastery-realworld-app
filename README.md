# ![RealWorld Example App](logo.png)
This is exemplary project of E2E tests written in Cypress + TypeScript, using Page Object pattern. Application under test is a Medium.com colne (called [Conduit](https://demo.realworld.io/#/)) 

Frontend and backend was done by [TonyMckes](https://github.com/TonyMckes/conduit-realworld-example-app) with my little modifications. 

- **Reporting**: cypress-mochawesome-reporter
- **Visual regression**: Percy
- **Continous integration**: ???


To see in more details what has been done go to [project board.](https://github.com/users/HubertArciszewski95/projects/2/views/1)

<br>

## **Test strategy**
Visual documentation of the application most important areas ([Conduit mind map](https://miro.com/app/board/uXjVPyTICs0=/?share_link_id=723710348292)).

![Condiut mind map](conduit-mind-map.png)

### Capability test charters
Before writing any E2E tests, I documented the various capabilities of the application that I plan to cover with tests.
- [Authentication](./test-charters/authentication.md)
- [Settings]
- [Article]

<br>

## **Set up development env**
### Prerequisites

- Make sure your have a Node.js (v14 or newer) installed.
- Make sure you have your database setup (postgreSQL).

<br>

## Installation

Install all the npm dependencies with the following command:

```bash
npm install
```

## Configuration

In the [`backend`](backend/) directory, duplicate and remane the`.env.example` file, name it `.env`, and modify it to set all the required private development environment variables.

> You can run the following command to populate your database with test data:

> ```bash
> npx -w backend sequelize-cli db:seed:all
> ```

> If you wish to clean DB from all data:

> ```bash
> npx -w backend sequelize-cli db:seed:undo:all
> ```

### Starting the development server

Start the development environment with the following command:

```bash
npm run dev
```

- The frontend website should be available at [http://localhost:3000/](http://localhost:3000).

- The backend API should be available at [http://localhost:3001/api](http://localhost:3001/api).

<br>

## Testing

To run the tests, run one of the following command:

> Headless mode
```bash
npm run cy:run
``` 
<br>

> Open cypress UI
```bash
npm run cy:open
```
<br>

> Specific test suite in headless mode
```bash
npm run cy:run --spec "cypress/e2e/path-to-file"
```
