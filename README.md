# Async Race

## Overview

Async Race is a Single Page Application (SPA) that manages a collection of radio-controlled cars, operates their engines, and showcases race statistics. The project is developed using Next.js, Tailwind CSS, and TypeScript, adhering to strict coding standards and architecture.

## Deployment

The application is deployed on Vercel. You can access it [here](#).

## Checklist and Score

- [ ] **Deployment Platform:** Successfully deploy the UI on one of the following platforms: GitHub Pages, Netlify, Vercel, Cloudflare Pages, or a similar service.
- [ ] **Commit guidelines compliance:** Ensure that all commits follow the specified commit guidelines.
- [ ] **Checklist included in README.md:** Include the project's checklist in the README.md file. Mark all implemented features.
- [ ] **Score calculation:** Use this checklist to calculate your score and put it at the top of the README.md.
- [ ] **UI Deployment link in README.md**: Place the link to the deployed UI at the top of the README.md file, alongside the calculated score.

## Objectives

- **Create a Single Page Application (SPA)**: Manage a collection of cars, operate their engines, and showcase race statistics.
- **Revive the Project**: Drawing inspiration from a demo video and a server mock, reconstruct the UI and breathe life back into this ambitious project.
- **Outpace the Competition**: Implement the project with speed and efficiency, ensuring we launch before our rivals.

## Functional Requirements

### Basic Structure

- [ ] Two main views: "Garage" and "Winners", each with their name, page number, and a count of items in the database.
- [ ] Persistent view state between switches, maintaining user input and pagination.

### Garage View

- [ ] CRUD operations for cars with "name" and "color" attributes.
- [ ] Color selection from an RGB palette with a preview of the car in the chosen color.
- [ ] Pagination to display cars (7 per page) and a feature to generate 100 random cars at once.

### Car Animation

- [ ] Start/stop engine buttons with corresponding animations and handling of engine states.
- [ ] Adaptive animations that work on screens as small as 500px.

### Race Animation

- [ ] A button to start a race for all cars on the current page.
- [ ] A reset button to return all cars to their starting positions.
- [ ] Display the winner's name upon race completion.

### Winners View

- [ ] Display winning cars with their image, name, number of wins, and best time.
- [ ] Pagination and sorting capabilities by wins and best times.

## Non-functional Requirements

- [ ] Use Next.js 14+ for development.
- [ ] TypeScript with `strict` mode enabled and `noImplicitAny` set to `true`.
- [ ] Modular architecture with clear separation of concerns.
- [ ] Adherence to Airbnb's ESLint configuration.
- [ ] Design is up to you but should prioritize quality code and fulfillment of requirements.

## Technical Implementation

- [ ] Implement CRUD operations for cars using the provided server mock.
- [ ] Design UI elements for car management and race controls.
- [ ] Utilize fetch for server communication, and handle promises for asynchronous tasks.
- [ ] Create animations for car movements using TypeScript and CSS.
- [ ] Ensure responsiveness and compatibility across different devices and browsers.

## Commit Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) format.
- Use lowercase for commit types (`init`, `feat`, `fix`, `refactor`, `docs`, etc.).
- Write in present tense (e.g., "add feature") and imperative mood (e.g., "move cursor to...").

### Commit Examples

- `init: start async-race project`
- `feat: add car creation functionality`
- `fix: correct car deletion issue`
- `refactor: improve car component structure`
- `docs: update README with new instructions`

## Scoring

- **Basic Structure**: 85 points
- **Car Animation**: 50 points
- **Race Animation**: 35 points
- **Winners View**: 45 points
- **Application Architecture**: 40 points
- **Dynamic Content Generation**: 30 points
- **Single Page Application**: 25 points
- **Bundling and Tooling**: 20 points
- **Code Quality and Standards**: 15 points
- **Code Organization and Efficiency**: 15 points
- **Prettier and ESLint Configuration**: 10 points
- **Overall Code Quality**: 35 points
