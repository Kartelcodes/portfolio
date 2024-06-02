# Regina Chileshe's Web Portfolio

Welcome to Regina Chileshe's web portfolio! This project showcases Regina's skills, projects, and experiences. The portfolio is built using plain HTML, CSS, and JavaScript for the frontend, with a Node.js backend that handles reviews and integrates with the GitHub API to display Regina's public repositories.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Personal Information**: Displays Regina's biography, skills, and contact information.
- **Projects**: Showcases Regina's projects, including descriptions and links.
- **GitHub Repositories**: Fetches and displays Regina's public repositories using the GitHub API.
- **Reviews**: Allows visitors to leave reviews and displays them on the site.
- **Responsive Design**: Ensures a good user experience on both desktop and mobile devices.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/regina-chileshe-portfolio.git
   cd regina-chileshe-portfolio
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the backend directory and add your GitHub API token:

   ```plaintext
   GITHUB_API_TOKEN=your_github_api_token
   ```

4. **Run the backend server:**

   ```bash
   node index.js
   ```

5. **Open the frontend:**

   Open `index.html` in your browser.

## Usage

### Backend

- **Start the server:**

  ```bash
  node index.js
  ```

  The server will run on `http://127.0.0.1:5000`.

### Frontend

- Open the `index.html` file in your browser to view the portfolio.

## File Structure

```
regina-chileshe-portfolio/
├── api/
│   ├── index.js
│   ├── db.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── css/
│   ├── style.css
├── js/
│   ├── main.js
├── index.html
└── README.md
```

## Technologies Used

- **Frontend**:

  - HTML
  - CSS
  - JavaScript

- **Backend**:

  - Node.js
  - Express.js
  - SQLite3

- **APIs**:
  - GitHub API

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for visiting Regina Chileshe's web portfolio! If you have any questions or feedback, please feel free to contact us.
