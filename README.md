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

#### Example

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

## Engineering Decisions and Notes


