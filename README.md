# TodoApp Client

This is **front-end** application for **Todo App**, built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a clean and responsive user interface for managing tasks.

## Features

- **Home View**:
  - Displays a list of tasks with:
    - Title.
    - Checkbox to mark tasks as completed/not completed.
    - Delete button with confirmation.
  - Task summary: "Tasks: X" and "Completed: Y of X".
  - Create Task button for adding new tasks.
- **Task Form**:
  - Create new tasks or edit existing ones.
  - Select task color.
  - Save and navigate back to the home view.
- **Responsive Design**:
  - Fully responsive UI for seamless use across devices.
- **Dynamic API Integration**:
  - Uses environment variables to connect with the back-end API.

## Setup Instructions

### Prerequisites

- **Node.js** installed (>= 14.x recommended).
- A running instance of the back-end API. You can find the API repository [here](https://github.com/kshashikumar/todoapp-backend).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/kshashikumar/todoapp-client.git
    cd todoapp-client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:

    - Create a `.env.local` file in the project root.
    - Add the following variable (update the URL if needed):

      ```bash
      NEXT_PUBLIC_API_URL=http://localhost:4000/api
      ```

4.  Run the development server:

        ```bash
        npm run dev
        ```

5.  Open the app in your browser:

    - Navigate to [http://localhost:3000](http://localhost:3000).

### Scripts

Available scripts for development and production:

    - `npm run dev`: Starts the development server.
    - `npm run build`: Builds the application for production.
    - `npm start`: Starts the production server (requires a production build).
