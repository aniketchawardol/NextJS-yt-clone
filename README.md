# 🎬 NextJS YouTube Clone

A feature-rich YouTube clone built with the latest web technologies, providing a seamless video sharing and viewing experience.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)]() [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]() [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]() [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)]()

---

## ✨ Key Features

* **🎥 Video Upload:** Seamlessly upload and share your videos with the world.
* **🌐 Video Feed:** Discover new content with a dynamic and engaging video feed.
* **🔐 Authentication:** Secure user registration and login functionality.
* **🎨 Modern UI:** A sleek and responsive user interface built with Tailwind CSS.
* **💾 Database Integration:** Utilizes MongoDB for efficient data storage and retrieval.
* **🚀 API Routes:** Leverages Next.js API routes for handling backend logic.

---

## 🛠️ Tech Stack

| Technology | Description |
| :--- | :--- |
| **Next.js** | A React framework for building full-stack web applications. |
| **TypeScript** | A typed superset of JavaScript that compiles to plain JavaScript. |
| **Tailwind CSS**| A utility-first CSS framework for rapid UI development. |
| **MongoDB** | A NoSQL database for storing user and video data. |
| **NextAuth.js**| An authentication library for Next.js applications. |
| **ImageKit** | A cloud-based image and video management platform. |

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

* Node.js (v18 or higher)
* npm, yarn, pnpm, or bun
* MongoDB instance (local or cloud)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/aniketchawardol/NextJS-yt-clone.git](https://github.com/aniketchawardol/NextJS-yt-clone.git)
    cd NextJS-yt-clone
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Configure environment variables:**

    Create a `.env.local` file in the root of your project and add the following variables:

    ```
    MONGODB_URI=<your_mongodb_connection_string>
    NEXTAUTH_SECRET=<a_secure_random_string>
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_URL_ENDPOINT=<your_imagekit_url_endpoint>
    IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
    NEXT_PUBLIC_PUBLIC_KEY=<your_imagekit_public_key>
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

5.  **Open the application:**

    Navigate to `http://localhost:3000` in your browser.

---

## 📜 Available Scripts

* `dev`: Starts the development server.
* `build`: Builds the application for production.
* `start`: Starts a production server.
* `lint`: Lints the codebase for errors.

---

## 🔌 API Endpoints

* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: Log in an existing user.
* `GET /api/video`: Fetch all videos.
* `POST /api/video`: Upload a new video (authentication required).
* `GET /api/auth/imagekit-auth`: Get ImageKit authentication parameters.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a pull request.

---

## 📄 License

This project has no specified license. All rights reserved.

---

## 🙏 Acknowledgments

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [MongoDB](https://www.mongodb.com/)
* [NextAuth.js](https://next-auth.js.org/)
* [ImageKit](https://imagekit.io/)

