# Task Manager Application

This project is a responsive and interactive Task Manager built using React.js and Vite. It allows users to manage tasks across multiple stages with a clean and user-friendly interface.

## How to Run the App Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/haroonfayyaz/task-manager
   cd task-manager
   ```

2. **Switch to the Appropriate Node Version:**

   Ensure you have `nvm` (Node Version Manager) installed. Then, run:

   ```bash
   nvm use
   ```

   This will switch to the Node.js version specified in the `.nvmrc` file.

3. **Install Dependencies:**

   Make sure you have `yarn` installed. Then, run:

   ```bash
   yarn install
   ```

4. **Start the Development Server:**

   ```bash
   yarn dev
   ```

   This will start the app in development mode

## Brief Explanation of the Implementation

- **State Management:** The application uses Redux Toolkit for state management, ensuring a scalable and maintainable architecture.
- **Task Management:** Users can add, edit, delete, and move tasks between different stages (Pending, In Progress, Complete).
- **Drag and Drop:** Implemented using `react-dnd` to allow users to reorder tasks and move them between stages seamlessly.
- **Persistence:** Tasks are persisted using `localStorage`, ensuring data is not lost on page refresh.
- **Sync Across Tabs:** The application listens for `storage` events to sync tasks across multiple tabs, reflecting changes instantly.
- **Responsive Design:** Utilizes Tailwind CSS for a responsive and modern UI that works well on both desktop and mobile devices.

## Bonus Points Covered

- **Drag and Drop Functionality:** Allows reordering of tasks and moving tasks between stages.
- **Persistence with LocalStorage:** Ensures tasks are saved and restored on page refresh.
- **Sync Across Multiple Tabs:** Changes in one tab are instantly reflected in other open tabs.

## Resources

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast development build tool for modern web projects.
- **Redux Toolkit:** A toolset for efficient Redux development.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **SweetAlert2:** A library for beautiful and responsive alert dialogs.
