# Contributing to Vyntrix

Thank you for your interest in contributing to **Vyntrix**.

Contributions of all kinds are welcome — bug fixes, improvements, documentation updates, and feature suggestions.



## Getting Started

1. Fork the repository
2. Clone your fork locally
```
git clone https://github.com/<your-username>/Vyntrix.git
cd Vyntrix
```
3. Install dependencies
```
npm install
```
4. Create a .env.development.local file using .env.example as reference

5. Start the development server
```
npm run dev
```
## Branching Strategy

`main` → stable production-ready code

Create a new branch for every change:
```
git checkout -b feature/short-description
```
Examples:

* `feature/subscription-validation`

* `fix/auth-middleware`

* `docs/update-api-docs`

## Commit Message Guidelines
Please follow clear and descriptive commit messages.

### Format:
```
type: short description
```
### Examples:
    feat: add subscription expiration check
    fix: handle missing user in auth middleware
    docs: update API documentation

## Pull Request Guidelines

Before opening a pull request, make sure that:

* The code runs without errors
* Existing functionality is not broken
* Commits are clean and well-described
* Related documentation is updated (if applicable)

When opening a PR:

* Clearly describe what you changed
* Mention why the change was needed
* Link related issues if any

## Code Style

* Follow existing project structure and patterns
* Use meaningful variable and function names
* Keep controllers thin and move logic to services when possible
* Handle errors consistently using middleware

## Reporting Issues

If you find a bug or have a feature suggestion:

1. Check existing issues to avoid duplicates
2. Open a new issue with:

    * Clear title
    * Steps to reproduce (if applicable)
    * Expected vs actual behavior

## Questions or Discussions

* For questions, ideas, or general discussions:

    * Open an issue with the appropriate label
    * Or start a discussion in the repository

Thank you for contributing!
