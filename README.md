# ![RealWorld Example App](logo.png)

## Getting Started

### Prerequisites

Before you run the project, make sure that you have the following tools and software installed on your computer:

- Text editor/IDE (e.g., VS Code, Sublime Text, Atom)
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) `v18.11.0+`
- [NPM](https://www.npmjs.com/) (usually included with Node.js)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation

To install the project on your computer, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/HubertArciszewski95/cypress-mastery-realworld-app.git
   ```

2. Navigate to the project directory.

   ```bash
   cd cypress-mastery-realworld-app
   ```

3. Install project dependencies by running the command:

   ```bash
   npm install
   ```

### Configuration

In the [`backend`](backend/) directory, duplicate and remane the`.env.example` file, name it `.env`, and modify it to set all the required private development environment variables.

> You can run the following command to populate your database with test data:

> ```bash
> npx -w backend sequelize-cli db:seed:all
> ```

<br>

> If you wish to clean DB from all data:

> ```bash
> npx -w backend sequelize-cli db:seed:undo:all
> ```

### Usage

#### Development Server

To run the project, follow these steps:

1. Start the development server by executing the command:

   ```bash
   npm run dev
   ```

2. Open a web browser and navigate to:
   - Home page should be available at [`http://localhost:3000/`](http://localhost:3000).
   - API endpoints should be available at [`http://localhost:3001/api`](http://localhost:3001/api).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [RealWorld (GitHub)](https://github.com/gothinkster/realworld)
- [TonyMckes (Github)](https://github.com/TonyMckes/conduit-realworld-example-app/tree/main)
