# Backend project hosted in GitHub with README.md setup
  ##  Backend Intern Project (MERN Stack)

    ##  Project Overview
    This is a backend project built using **Node.js, Express.js, and MongoDB**.  
    It includes authentication (JWT + bcrypt), role-based access (Admin/User), and CRUD operations

    ##  Tech Stack
    - Node.js
    - Express.js
    - MongoDB
    - Mongoose
    - JWT (Authentication)
    - bcryptjs (Password hashing)
    - CORS
    
    ##  Folder Structure
    backend/
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── server.js

    ##  How to Run Backend

    ### 1️ Install dependencies
    open bash
    npm install 
    ### 2 Start MongoDB (local)
    mongodb://localhost:27017/task-manager
    ### Run Server 
    npm start  run on -- http://localhost:5000 
    ### 4 authentication apis 
    register user -- POST /api/auth/register
    login user -- POST /api/auth/login 

    Roles
      user
      admin

    Admin has access to:
       View all users
       Access admin dashboard
    
    ### CRUD APIs
    Example Routes
      GET    /api/tasks
      POST   /api/tasks
      PUT    /api/tasks/:id
      DELETE /api/tasks/:id 

    API Testing
      You can test APIs using:
        Postman
        Hoppscotch
## Author
Taniya(me)

   

    
