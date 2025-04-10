# Premier League Fan Forum

## Overview
The Premier League Fan Forum is a web-based application designed for football enthusiasts to engage in discussions about English Premier League teams. Users can create posts, comment on posts and manage their profiles. The application is built using React.js for the frontend, with Node.js and Express.js for the backend, and MongoDB for data storage.

## Technologies Used
- **Frontend:** React.js, React Router, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Package Manager:** npm

## Features
### Guest Users
- Access the Home Page and browse posts without logging in.
- Can view posts, but cannot interact with them (comment or create).
- Can register and log in to the application.

### Registered Users
- Create new posts and interact with existing posts by commenting.
- Edit and delete their own posts.
- Edit their profile information, including updating username, email, and password.

### Post Management
- Create posts related to specific teams (English Premier League).
- Edit and delete posts that the user owns.
- Comment on posts and edit or delete their own comments.

### Account and Form Validation
- All forms (registration, login, post creation, comment creation) are validated to ensure data integrity.
- **Username and email uniqueness:** The application enforces uniqueness for both the username and email during registration. Users cannot register with an existing username or email.
- **Changing username or email:**  If a logged-in user attempts to change their username or email to one that already exists in the database, the change will not be allowed, and the user will receive an appropriate error message.

## Application Pages
- **Login/Register:** Accessible to guest users only.
- **Home Page:** Accessible by everyone (both guest and logged-in users).
- **Posts Page:** Displays all forum posts. Accessible by everyone (both guest and logged-in users).
- **Posts by Team:** Displays posts related to a specific Premier League team. Accessible by everyone (both guest and logged-in users).
- **Post Details:** Displays details of a specific post. Logged-in users can edit/delete their post, comment or edit their own comments. Accessible by everyone (both guest and logged-in users).
- **Profile Page:** Displays and allows editing of the user’s profile. Accessible by the logged-in user only.
- **Create Post:** Allows registered users to create new posts. Accessible by logged-in users only.
- **Edit Post:** Allows the user to modify their own post. Accessible by the post owner only.
- **Edit Profile:** Allows users to edit their profile information. Accessible by the logged-in user only.
- **Edit Comment:** Allows users to edit their own comments. Accessible by the comment owner only.
- **Not Found Page:** Displays a 404 error for invalid URLs.

## Guards
- **AuthGuard:** Restricts access to specific pages (e.g., Create Post, Edit Post, Profile) for guest users.
- **GuestGuard:** Prevents logged-in users from accessing Login and Register pages.

## Project Structure
- api/: Contains the API service logic for interacting with the backend.
- components/: Contains reusable UI components.
- context/: Manages the user’s authentication state.
- guards/: Guards used to protect routes and prevent unauthorized access.
- hooks/: Custom hooks that simplify repetitive logic and abstract functionality used across components.
- utils/: Utility functions.


## How to Run the Application
### Prerequisites
- Node.js and npm installed.
- MongoDB server running locally or in the cloud.

### Steps
1. Clone the repository from GitHub and extract it.
2. Open the project in your code editor (e.g., Visual Studio Code).
3. In the terminal, navigate to the project root and install dependencies:
   ```bash
   npm i
   ```
4. Start the backend server to ensure MongoDBCompass is running:
   ```bash
   npm start
   ```
5. After the server has started, stop it (press Ctrl + C in the terminal).
6. Seed the teams in MongoDB:
   ```bash
   npm run seed
   ```
7. Restart the backend server:
   ```bash
   npm start
   ```
8. Open another terminal and start the React frontend:
   ```bash
   cd client
   npm run dev
   ```
9. Ensure that the MongoDB instance is running, as the application will use it to store user and post data.