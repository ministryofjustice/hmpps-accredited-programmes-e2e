# Accredited Programmes End to End tests

A suite of end to end tests for the [Accredited Programmes project](https://github.com/ministryofjustice/hmpps-accredited-programmes-ui) using [Playwright](https://playwright.dev/).

## Getting started

### Prerequisites

- Node.JS
- NPM

### Setup

Install the dependencies with:

```bash
npm install
```

Add a `.env` file to the root of the project with the following variables:

```text
HMPPS_AUTH_USERNAME= # A valid HMPPS Auth Username
HMPPS_AUTH_PASSWORD= # A valid HMPPS Auth Password
```

## Running the tests

To run the tests locally, run the following command:

```bash
npx playwright test
```

You can also run the tests and watch in a browser with:

```bash
npx playwright test --ui
```
