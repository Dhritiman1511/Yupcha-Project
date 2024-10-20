
# Food Recipe Viewer

A simple and responsive full-stack application that allows users to view, add, and manage food recipes. The application is built using React for the frontend and Node.js with PostgreSQL for the backend.

## Features

- **Recipe Listing**: Display a list of recipes with titles, ingredients, instructions, and optional images.
- **Search Functionality**: Search recipes by title or ingredients.
- **CRUD Operations**:
  - Create a new recipe.
  - Update existing recipes.
  - View detailed information about a recipe.
  - Bookmark recipes for easy access.
- **Dark and Light Mode**: Toggle between dark and light modes for improved user experience.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.

### Backend
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Installation

### Prerequisites
- Node.js and npm installed on your machine.
- PostgreSQL database.

### Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dhritiman1511/Yupcha-Project.git
   cd food-recipe-viewer
   ```

2. **Frontend Setup**:
   Navigate to the frontend directory:
   ```bash
   cd food-recipe-viewer-frontend
   ```
   Install dependencies:
   ```bash
   npm install
   ```

3. **Backend Setup**:
   Navigate to the backend directory:
   ```bash
   cd ../food-recipe-viewer
   ```
   Install dependencies:
   ```bash
   npm install
   ```

4. **Environment Variables**:
   Create a `.env` file in the backend directory and add your PostgreSQL connection string and any other necessary environment variables.

5. **Run the Application**:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../food-recipe-viewer-frontend
     npm start
     ```

## Video Demonstration 🎥
[Click here](https://drive.google.com/file/d/1nKykO5ch22sksH1fxuXTEV0lut4NHHcb/view?usp=drive_link) to watch the video.

### Video Summary
In the video, you will learn:
- How to add a new recipe.
- How to search for recipes.
- How to bookmark/unbookmark recipes.
- How to edit and delete recipes.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
