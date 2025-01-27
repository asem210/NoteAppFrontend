# Frontend Setup

## Requirements to Run the Application

### Operating System
- **Microsoft Windows** [Version 10.0.26100.2894]  
  (c) Microsoft Corporation. All rights reserved.

### Tool Versions

- **Node.js**: v20.16.0
  - To check the Node.js version, run the following command:
    ```bash
    node -v
    ```

- **npm**: 10.8.1
  - To check the npm version, run the following command:
    ```bash
    npm -v
    ```

- **Vite**: v6.0.5
  - To check the Vite version, run the following command:
    ```bash
    npx vite --version
    ```

- **TailwindCSS**: v4.0.0
  - To check the TailwindCSS version, run the following command:
    ```bash
    npx tailwindcss --version
    ```

- **React**: v18.3.1
  - To check the React version, run the following command:
    ```bash
    npm list react
    ```

### Dependencies and Libraries

The frontend project relies on the following key dependencies:

- **React**: `react`, `react-dom`, `react-router-dom`
- **TailwindCSS**: `tailwindcss`, `@tailwindcss/vite`
- **Axios**: `axios`
- **JWT Handling**: `jwt-decode`
- **Development Tools**: `eslint`, `@vitejs/plugin-react`, `typescript`

To install all the necessary dependencies, run:

```bash
npm install

## Available NPM Scripts

- **`npm install`**: Installs all the necessary dependencies for the frontend project.

- **`npm run dev`**: Starts the frontend development server using Vite. The server will automatically reload when code changes are detected. To run this, use the following command:

  ```bash
  npm run dev
