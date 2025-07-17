# EffectiV CRM Agent Guide

## Project Structure
- **NX Monorepo**: Angular (frontend) + NestJS (API) with Clean Architecture
- **Apps**: `frontend` (Angular 20), `api` (NestJS)
- **Libraries**: Clean Architecture layers - `domain`, `application`, `infrastructure`, `tests`
- **Module boundaries**: Strict dependency constraints enforced via ESLint (see eslint.config.mjs)

## Commands
- **Build all**: `npx nx build frontend` or `npx nx build api`
- **Serve frontend**: `npx nx serve frontend` (defaults to development)
- **Serve API**: `npx nx serve api`
- **Run tests**: `npx nx test frontend` or `npx nx test api`
- **Run single test**: `npx nx test <project> --testNamePattern="<test-name>"`
- **Lint**: `npx nx lint <project>`
- **E2E tests**: `npx nx e2e frontend-e2e`

## Code Style
- **TypeScript/Angular/NestJS**: Follow Angular/NestJS conventions (further Angular instructions in ANGULAR.md)
- **Imports**: Use path mapping from tsconfig.base.json (@effectiv-crm/*)
- **Architecture**: Clean Architecture with domain-driven design
- **Testing**: Jest for unit tests, Playwright for E2E
- **Styling**: SCSS + TailwindCSS for frontend

## Important Files
- Path mappings in tsconfig.base.json for library imports
- Module boundary rules in eslint.config.mjs enforce Clean Architecture

## Techniques
- This project uses NestJS's CQRS system, and uses Event Sourcing
- Use TDD at all times
  - For Angular apps, see ANGULAR.md for TDD instructions
  - For domain + application code:
    - Start by writing a single failing test against the application layer, generally a command, query, or event handler
    - Run the tests to ensure the new test is the only failing test
    - Implement the absolute minimum code required to make the test pass
    - Refactor the code to make it more readable, maintainable, and generic
    - Run the tests again to ensure they all pass
  - DO NOT USE MOCKS OR SPIES - use fakes and stubs instead, and only for external dependencies
  - Tests must be against behaviour, not implementation
