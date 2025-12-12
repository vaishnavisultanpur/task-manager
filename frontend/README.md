# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# Create main project folder
mkdir task-manager
cd task-manager

# Create backend folder
mkdir backend
cd backend

# Initialize backend
npm init -y
npm install express cors

# Go back to root
cd ..

# Create frontend with Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install

2. Backend Setup
bashcd backend

# Create server.js file
touch server.js

3. Frontend Setup (Vite-specific)
bashcd frontend

# Start frontend dev server
npm run dev

4. Start Both Servers
Terminal 1 - Backend:
bashcd backend
node server.js

Terminal 2 - Frontend:
bashcd frontend
npm run dev
```

### Screenshots 

![frontend](/screenshots/frontend.png?raw=true "frontend")
![addTask](/screenshots/addTask.png?raw=true "addTask")
![backend](/screenshots/backend.png?raw=true "backend")
![deleteTask](/screenshots/deleteTask.png?raw=true "deleteTask")
