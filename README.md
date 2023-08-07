# Roman Numeral Converter

A service that converts arabic number input to its roman numeral equivalent.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) v16+

## Setup

1. Clone the repository with `git clone https://github.com/avardaan/roman-numeral-service` then navigate to the project directory with `cd roman-numeral-service`
2. Install dependencies with `npm install`

## Usage

For local development, start the server with `npm run dev`.

NOTE: The server will run on port 8080 by default if no `PORT` environment variable is set. The server will automatically restart when changes are made to the source code. This project uses [nodemon](https://www.npmjs.com/package/nodemon) which can be configured via `nodemon.json` in the project root.

## Testing

Run unit tests with `npm run test`. This project uses [Jest](https://jestjs.io/) for testing.

## Deployment

1. This project is deployed to [Render](https://render.com/) at [https://roman-numeral-service.onrender.com](https://roman-numeral-service.onrender.com).
2. It is deployed as a Docker container using the `Dockerfile` in the project root.
3. The deployment is driven by the `render.yaml` file in the project root, which is a Render-specific IaC (Infrastructure as Code) file. It is configured to trigger on every push to the `main` branch of this repository on GitHub.

## API

### `GET /romannumeral?query={integer}`

Converts the integer in the query string to its roman numeral equivalent. Only accepts strict integers between 1 and 3999 inclusive.

### Example

Request:

```
GET /romannumeral?query=123
```

Response:

```
HTTP 200 OK
Content-Type: application/json

{
  "input": "123",
  "output": "CXXIII"
}
```

### `*`

### Example

Request:

```
Any request
```

Response:

```
HTTP 404 Not Found
Content-Type: application/json

{
  "error": "Not found."
}
```

## Dependencies

This is a Node.js project that uses the following core dependencies:

- [TypeScript](https://www.typescriptlang.org/) - Language
- [Express](https://expressjs.com/) - Web framework
- [Jest](https://jestjs.io/) - Testing framework
- [Winston](https://www.npmjs.com/package/winston) - Logging
- [Nodemon](https://www.npmjs.com/package/nodemon) - Development server

All dependencies and their versions are listed in `package.json`.

## Engineering Decisions and Notes

1. Language and Runtime

   - I chose TypeScript (Node.js) because it is a superset of JavaScript that provides static typing and other features that make it easier to write and maintain code. It enables better code quality by catching errors at compile time instead of runtime.
   - The project is set up with `dev` and `build` scripts which transpile the TypeScript code to JavaScript as needed.

2. Separation of Concerns

   - The project is structured in a way that is reasonable to navigate for a team of developers and frictionless for an individual developer to work on an isolated area.
   - Creation and initial configuration of the express server is handled separately from the internal API routing. And the internal API routing is loosely coupled with the implementation for each route. This makes the code modular and reduces the effort required to make changes.
   - The core functionality of performing the conversion from an integer to a roman numeral is encapsulated in a function in `src/lib/index.ts`. The route handler for `GET /romannumeral?query={integer}` imports and calls the function based on its requirement. Separation like this enables multiple developers to not only work on the route handler and conversion function logic in isolation, but also enables more purposeful testing of each concern.
   - The route handler and core function are separated enough where they have their own MIN and MAX values that are allowed. For this project those values happen to be the same, but for extensibility purposed, the `GET /romannumeral` route may not be the only route which consumes the core function. If in the future, the core conversion function is used by another route, it should be able to define its own range of allowed input values.
   - When writing unit tests, I attempt to test only the appropriate unit of functionality. The core function responsible for accepting an integer and returning a roman numeral does just that, and is tested for just that. The route handler which handles the query parameter input in the HTTP request validates the input and calls the core function, so it is tested on just that - validating user input and calling the appropriate function with the appropriate arguments.

3. Deployment and Containerization

   - As part of Extension 3, I containerized the application using a Dockerfile, and deployed it to Render. When a change is pushed to the repository on GitHub, it triggers a new deployment on Render, which via the `render.yaml` file, pulls the appropriate source code from GitHub, builds the Docker image using the Dockerfile, stores it in an internal container registry, then runs the container and makes it accessible via the public internet.
   - For this version, the Dockerfile is multistaged, where testing + building the application is stage 1, and creating a production image with only the built JavaScript files is stage 2, which depends on stage 1. The reasoning behind this structure is so the Docker image does not get built if there are any failing tests.

4. API and Usage
   - When a request is made to the `GET /romannumeral` endpoint, the `query` parameter is received as a string, and needs to be parsed and validated. The strictness of what qualifies as an integer is subjective. Initially, I was using the JavaScript function `parseInt` to validate the request parameter, it ended up being too lenient. It would parse inputs like `22.00` and `22xyz` as integers, which is by design, but not the behavior we desire for this application. I wrote a `parseStrictInteger` function to enable stricter validation of integer input using regex, which means inputs like `22.00` and `22xyz` are no longer processed as valid.

## Roadmap

1. Branching - Currently, `main` branch is the only branch and is committed to directly without any checks. In a team, this is not scalable at all. It is better to use a methodology like git flow to enable multiple developers to work on the same project without stepping on each others toes and ensure there is alignment on artifacts to be released.
2. Containerize local development - Ideally, the local development environment should replicate production as closely as possible, to catch misconfiguration and discrepancies early in the development process. Since the application is containerized in production, so should the local development be containerized. This can be done with a Dockerfile for development, along with a docker-compose file enables setting up hot reloading and other development requirements.
3. Add integration tests - to simulate user behavior end to end with various types of inputs and load, the application should be tested end to end "from the outside" as a user.
4. Create environment variables for MIN and MAX integer input - Currently, the integer input range is defined in the code, so any modifications made to it require code changes. These "tuning knobs" should be configurable without changing application code and having to redeploy.
5. Add Build filters - it may not be ideal to build and redeploy the application when any file changes. Build filters would help avoid unnecessary deployments by ignoring changes to files that are immaterial to application deployment.
6. Logging - Currently, the project uses the logging library `winston`, which is set up to only log to the console. The logs to stdout are also stored on the Render platform. Eventually, logging should be structured and flush to a centralized platform (e.g. AWS CloudWatch) to increase observability of the system and enable purposeful monitoring.
