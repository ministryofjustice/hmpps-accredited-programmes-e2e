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

## Running these tests on CI

The E2E test suite is currently run on the [Accredited Programmes UI
repository](https://github.com/ministryofjustice/hmpps-accredited-programmes-ui)
[as part of
CI](https://github.com/ministryofjustice/hmpps-accredited-programmes-ui/blob/4b70ab1045f12f127e03738ada18f0d68458443d/.circleci/config.yml#L204).

The user is currently set to use an email address of one of the team members.
This is something we should address as soon as possible, and replace with a
shared service account. When running the Playwright Tests workflow in the E2E
repo, the username and password are read from GitHub Actions secrets in this
repository. When running the `end_to_end` job on CI in the Accredited Programmes
UI repository, they're read from the CircleCI (our current CI tool) project
settings.

Because HMPPS Auth requires users' passwords to be reset after a certain period
of time, we have to update these from time to time. This is done by updating the
GitHub Actions secret in this repo, as well as in the UI's [Circle CI project
settings](https://app.circleci.com/settings/project/github/ministryofjustice/hmpps-accredited-programmes-ui/environment-variables)
when running on CI in the UI repo.
