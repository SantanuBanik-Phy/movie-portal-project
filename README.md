<div align="center">
  <img height="100" src="https://raw.githubusercontent.com/SantanuBanik-Phy/movie-portal-project/refs/heads/main/src/assets/movie-portal.png"  />
</div>

# Movie Portal

This is a user-friendly movie portal built with React that allows users to explore movies, view details, add movies, delete movies, and manage their favorite movies. It provides a seamless and engaging user experience with a focus on intuitive navigation, rich content, and personalized features.

## Live URL

*   [https://rambunctious-plantation.surge.sh/](https://rambunctious-plantation.surge.sh/)

## Alternative URL

*   [https://movie-portal-project.vercel.app/](https://movie-portal-project.vercel.app/)

## Key Features

*   **Homepage:**
    *   Interactive carousel showcasing popular and trending movies with dynamic background images.
    *   Featured movies section displaying curated selections and top-rated films.
    *   Upcoming movies section with trailers, release dates, and engaging descriptions.
    *   Movie news section featuring the latest updates and industry buzz.
    *   Dark/light theme toggle for a personalized and comfortable viewing experience.

*   **Authentication:**
    *   Secure user login and registration with email and password, ensuring data privacy.
    *   Seamless Google Sign-In integration for quick and effortless authentication.

*   **Movie Management:**
    *   Add new movies to the database with comprehensive details, including title, poster, genre, duration, release year, rating, and synopsis.
    *   Update existing movie information to keep the database current and accurate.
    *   Delete movies from the database to maintain a curated collection.

*   **Favorites:**
    *   Users can curate their own list of favorite movies for quick and easy access.
    *   View and manage their favorite movies with options to add or remove films.

*   **Search:**
    *   Powerful search functionality allows users to quickly find movies by title.

*   **Responsive Design:**
    *   Adapts seamlessly to various screen sizes, providing an optimal viewing experience across desktops, tablets, and mobile devices.

## Technologies Used

*   **Frontend:**
    *   React: JavaScript library for building user interfaces.
    *   Tailwind CSS: Utility-first CSS framework for rapid UI development.
    *   DaisyUI: Component library built on top of Tailwind CSS for pre-designed UI elements.
    *   Swiper.js: Powerful JavaScript library for creating interactive carousels and sliders.
    *   React Hook Form:  Library for efficient and streamlined form management.
    *   React Simple Star Rating: Component for implementing user-friendly star ratings.
    *   Firebase Authentication: Secure authentication service provided by Google.
*   **Backend:**
    *   Node.js: JavaScript runtime environment for server-side development.
    *   Express.js: Minimalist web framework for Node.js.
    *   MongoDB: NoSQL database for flexible and scalable data storage.
    *   CORS: Middleware for enabling Cross-Origin Resource Sharing.

## NPM Packages Used

*   `axios`: For making HTTP requests.
*   `cors`: For enabling Cross-Origin Resource Sharing.
*   `daisyui`: For UI components.
*   `dotenv`: For loading environment variables.
*   `express`: For building the web server.
*   `firebase`: For authentication.
*   `framer-motion`: For animations.
*   `jsonwebtoken`: For generating JWTs.
*   `mongodb`: For interacting with MongoDB.
*   `react-countup`: For animated counters.
*   `react-helmet`: For managing document head.
*   `react-hook-form`: For form management.
*   `react-photo-view`: For image zoom.
*   `react-rating`: For star ratings.
*   `react-router-dom`: For routing and navigation.
*   `swal2`: For SweetAlert2 modals and notifications.
*   `toastify`: For toast notifications.
*   `tailwindcss`: For styling.

## Installation and Setup

1.  Clone the repository: `git clone https://github.com/your-username/movie-portal.git`
2.  Install dependencies:
    *  Client-side: `cd movie-portal-client && npm install`
    *  Server-side: `cd movie-portal-server && npm install`
3.  Set up environment variables:
    *  Create `.env` files in both client and server directories.
    *  Add your Firebase config, MongoDB URI, and other sensitive information.
    *  **Client-side (.env)**
    ```bash
    REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
    REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
    REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
    REACT_APP_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
    REACT_APP_FIREBASE_APP_ID=<Your Firebase App ID>
    ```
4.  Run the application:
    *  Start the development server (client-side): `npm start`
    *  This will start the application in development mode at `http://localhost:3000`.
5.  Backend setup:
    *  Ensure you have MongoDB running locally or use a cloud-based MongoDB service like MongoDB Atlas.
    *  Set up your backend by following the backend-specific instructions in the repository (if applicable).
    *  Start the server (server-side): `node index.js`

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.



## Acknowledgments

*   **React:** React is an open-source JavaScript library maintained by Facebook and the community.
*   **Firebase:** Firebase is a platform developed by Google for creating mobile and web applications.
*   **MongoDB:** MongoDB is a NoSQL database that provides high availability and scalability.