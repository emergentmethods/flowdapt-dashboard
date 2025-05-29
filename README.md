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

It will run the dashboard on `http://localhost:3030` and it will look for a running Flowdapt server on `http://localhost:8080`. If you are running Flowdapt at a different location, you can specify that by controlling the environment variable `API_BASE_URL=http://localhost:8080`.

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
