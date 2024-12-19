# Flowdapt Dashboard

Flowdapt Dashboard

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development Guidelines](#development-guidelines)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Running with Docker

The easiest way to use the Flowdapt dashboard is by simply running the Docker image:

```bash
docker run --network=host ghcr.io/emergentmethods/flowdapt-dashboard:latest
```

It will run the dashboard on `http://localhost:3030` and it will look for a running Flowdapt server on `http://localhost:8070`. If you are running Flowdapt at a different location, you can specify that by controlling the environment variable `API_BASE_URL=http://localhost:8070`.

### Project Setup Guide

Follow these steps to set up and run the project:

#### Step 1: Node.js Verification and Installation

Check if Node.js is installed on your machine by opening a terminal (Command Prompt in Windows or Terminal in MacOS/Linux) and running the command `node -v`. This will display the version of Node.js installed. If successful, you should see output like `v18.15.0`.

If Node.js is not installed, download it from the [official Node.js website](https://nodejs.org/en/download/) and follow the prompts to install it.

#### Step 2: Clone the Repository

Clone the project repository from the provided link. Ensure you have Git installed to do this.

#### Step 3: Install Required Packages

Navigate to the root directory of the repository in the terminal and run `npm i` to install all the required packages.

#### Step 4: Verify API Address

By default, the `.env` file contains the default API address. If you need to modify the API address, create a `.env.local` file and define the environment-specific variables there.

#### Step 5: Start Flowdapt

Start Flowdapt to make the API endpoint available.

#### Step 6: Start the Dashboard

You have two options for starting the dashboard:

1. **Developer Mode:** Run `npm run dev` to start the server in developer mode. Changes made to the code will automatically reflect in your browser.

2. **Production Mode:** Run `npm run build` followed by `npm run start`. The `build` command creates the build for the project, and the `start` command serves the dashboard on a http port.

## Usage

Explain how to use your project.

## Development Guidelines

### 1. Project Structure

```
├── next.config.js              # Next.js configuration file
├── next-env.d.ts               # Next.js TypeScript declarations
├── package.json                # Package manifest for npm
├── package-lock.json           # Package lock file for npm
├── postcss.config.js           # PostCSS configuration file
├── public                      # Static files to be served by Next.js
├── README.md                   # Project documentation
├── src                         # Source code
│   ├── app                     # Application-level components and configuration (Next.JS 13 App Router)
│   │   ├── api                 # API-related code
│   │   ├── globals.css         # Global CSS styles
│   │   └── [lang]              # Folder to enable i18n => e.g.: lang = en-US
│   │       ├── components      # Folder for specific components (Colocation) https://beta.nextjs.org/docs/routing/fundamentals#colocation
│   │       ├── dictionaries.ts # File with functions to get specific language dictionaries
│   │       ├── layout.tsx      # Main layout file - https://beta.nextjs.org/docs/routing/pages-and-layouts
│   │       ├── page.tsx        # Main file for this route
│   │       ├── providers.tsx   # Providers file for theme
│   │       └── workflow        # Specific Route folder example - https://beta.nextjs.org/docs/routing/defining-routes
│   │       └── icon.png        # Application icon
│   ├── assets                  # Assets (images, fonts, etc.)
│   │   ├── fake                # Fake assets for testing or placeholders
│   │   └── img                 # Image assets
│   ├── components              # Common reusable components
│   ├── hooks                   # Custom React hooks
│   ├── i18n                    # Internationalization files
│   ├── lib                     # Library and utility functions
│   └── middleware.ts           # Middleware for Next.js
├── tailwind.config.js          # Tailwind CSS configuration file
└── tsconfig.json               # TypeScript configuration file
```

Pages: Store all page components within the app directory. This helps maintain a clear structure for all the pages in the project.

Components: Keep reusable components inside the components directory. For page-specific components, use colocation by placing them in a components folder alongside the corresponding page.tsx file. This approach enables better organization and easier navigation of components related to each page.

Public: Store static files, such as images, icons, and other assets, in the public directory. This central location makes it easy to manage and reference these files throughout the project.

### 2. Variable Naming Conventions

Use camelCase for variable and function names.
Use PascalCase for component names and class names.
Make variable and function names descriptive and concise.
Use UPPER_SNAKE_CASE for constants.

### ESLint Rules

| Rule                                | Value                                    | Explanation                                                                            |
| ----------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `no-unused-vars`                    | "off"                                    | Disable the rule for unused variables (handled by "@typescript-eslint/no-unused-vars") |
| `prefer-const`                      | "error"                                  | Require `const` declarations for variables that are never reassigned after declared    |
| `no-use-before-define`              | "error"                                  | Disallow the use of variables before they are defined                                  |
| `no-var`                            | "error"                                  | Require `let` or `const` instead of `var`                                              |
| `no-shadow`                         | "error"                                  | Disallow variable declarations from shadowing variables declared in the outer scope    |
| `no-undef`                          | "error"                                  | Disallow the use of undeclared variables                                               |
| `no-console`                        | ["warn", { "allow": ["warn", "error"] }] | Allow only "warn" and "error" console methods and warn for others                      |
| `no-debugger`                       | "error"                                  | Disallow the use of `debugger`                                                         |
| `eqeqeq`                            | "error"                                  | Require the use of `===` and `!==` instead of `==` and `!=`                            |
| `no-eval`                           | "error"                                  | Disallow the use of `eval()`                                                           |
| `curly`                             | "error"                                  | Require consistent brace style for all control statements                              |
| `no-implied-eval`                   | "error"                                  | Disallow the use of implied `eval()`                                                   |
| `no-template-curly-in-string`       | "error"                                  | Disallow template literal placeholder syntax in regular strings                        |
| `no-throw-literal`                  | "error"                                  | Disallow throwing literals as exceptions                                               |
| `react/jsx-key`                     | "error"                                  | Require a unique key for elements in an array or iterator                              |
| `react/jsx-no-duplicate-props`      | "error"                                  | Disallow duplicate properties in JSX                                                   |
| `react/jsx-no-target-blank`         | "error"                                  | Disallow the use of `target="_blank"` without `rel="noopener noreferrer"`              |
| `react/jsx-no-undef`                | "error"                                  | Disallow undeclared variables in JSX                                                   |
| `react/jsx-uses-react`              | "error"                                  | Prevent React to be incorrectly marked as unused                                       |
| `react/jsx-uses-vars`               | "error"                                  | Prevent variables used in JSX to be incorrectly marked as unused                       |
| `react/jsx-wrap-multilines`         | "error"                                  | Require parentheses around multiline JSX                                               |
| `react/no-danger`                   | "warn"                                   | Warn when using the `dangerouslySetInnerHTML` prop                                     |
| `react/no-direct-mutation-state`    | "error"                                  | Disallow direct mutation of `this.state`                                               |
| `react/no-typos`                    | "error"                                  | Disallow typos in component method names                                               |
| `react/no-unused-state`             | "error"                                  | Disallow unused state properties                                                       |
| `react/prop-types`                  | "off"                                    | Disable prop-types validation (handled by TypeScript)                                  |
| `react/react-in-jsx-scope`          | "off"                                    | Disable the rule for missing React import (handled by                                  |
| `react/react-in-jsx-scope`          | "off"                                    | Disable the rule for missing React import (handled by Next.js)                         |
| `react/self-closing-comp`           | "error"                                  | Require self-closing on elements with no children                                      |
| `@typescript-eslint/no-unused-vars` | ["error"]                                | Disallow unused variables within TypeScript files                                      |
| `@typescript-eslint/ban-ts-comment` | "off"                                    | Disable the rule for banning TypeScript `// @ts-ignore`, `// @ts-expect-error`, etc    |

### Prettier configuration

| Option               | Value   | Explanation                                                                                              |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `printWidth`         | 100     | Set the maximum line length to 100 characters.                                                           |
| `tabWidth`           | 2       | Use 2 spaces for indentation.                                                                            |
| `useTabs`            | false   | Use spaces instead of tabs for indentation.                                                              |
| `semi`               | true    | Add a semicolon at the end of every statement.                                                           |
| `singleQuote`        | false   | Use double quotes instead of single quotes.                                                              |
| `trailingComma`      | "es5"   | Add trailing commas where possible (in objects, arrays, and function parameters) according to ES5 rules. |
| `bracketSpacing`     | true    | Add spaces between object literal braces and their content.                                              |
| `jsxBracketSameLine` | false   | Place the closing `>` of a JSX element on a new line.                                                    |
| `arrowParens`        | "avoid" | Omit parentheses when the arrow function has only one argument.                                          |
| `endOfLine`          | "lf"    | Use line feed (LF) as the line ending across all files.                                                  |

## Contributing

### Documentation

We highly value clear and concise documentation in our codebase. We use TSDoc to generate and maintain documentation for our TypeScript code. Please follow these guidelines when contributing documentation to the project:

1. **Document all exported functions, classes, and components**: Make sure to add TSDoc comments to all exported functions, classes, and components, including descriptions of their purpose, usage, and any relevant examples.

2. **Describe function parameters and return types**: For each function, describe its parameters, including their types and purpose, as well as the return type and what it represents.

3. **Use appropriate TSDoc tags**: Utilize TSDoc tags such as `@param`, `@returns`, `@example`, and `@deprecated` where appropriate to provide a clear and structured documentation.

4. **Keep documentation up-to-date**: Ensure that the documentation stays up-to-date with the code. Update the TSDoc comments whenever you make changes to the code that affect its behavior or public API.

5. **Document complex logic**: For complex or non-obvious code, add inline comments to explain the logic and reasoning behind the implementation.

Here's an example of a well-documented function using TSDoc:

```typescript
/**
 * Calculate the sum of two numbers.
 *
 * @param a - The first number to add
 * @param b - The second number to add
 * @returns The sum of the two numbers
 * @example
 * ```
 * const result = add(1, 2);
 * console.log(result); // 3
 * ```
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

## Theme Modification Guide

This project utilizes [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com) for theming.

To modify the DaisyUI theme, follow these steps:

1. Visit the [DaisyUI theme documentation](https://daisyui.com/docs/themes/#-7) and follow the instructions provided for theme modification.

2. Apply the changes to the `tailwind.config.js` file in our project.

After following these steps, you should be able to customize the DaisyUI theme according to your project's requirements.
