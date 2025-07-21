# MotorVault  मोटरVault


**MotorVault is a professional, private inventory management system designed specifically for car dealerships. It provides a secure, modern dashboard to manage a complete vehicle inventory with ease.**

This application was built from the ground up as a robust B2B solution, allowing a dealership to track their stock, manage sales statuses, and edit vehicle details in real-time.

(https://motor-valut-x.vercel.app/)
---

## Features

* **Secure Authentication:** Private access to the dashboard using Firebase Authentication.
* **Dynamic Dashboard:** A clean, modern dashboard with a sidebar layout for easy navigation.
* **Add New Cars:** A comprehensive form to add new vehicles with detailed fields, including:
    * Brand, Model, Year, Price
    * Image URL (hosted externally)
    * **Condition** (Brand New, Tokunbo, Nigerian Used)
    * **Mileage**, **VIN**, **Color**, **Transmission**
* **Status Tagging:** Assign a status to each vehicle (`For Sale` or `Sold`) with colored badges for quick identification.
* **Real-time Inventory Table:** View the entire inventory in a clean, responsive table that updates instantly.
* **Edit Functionality:** Seamlessly edit any detail of an existing car through a pop-up modal.
* **Safe Deletion:** Delete records from the inventory with a confirmation dialog to prevent accidents.

---

## Tech Stack

* **Frontend:** [React.js](https://reactjs.org/) (with Vite)
* **UI Library:** [Material UI (MUI)](https://mui.com/)
* **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore for database, Firebase Auth for authentication)
* **Deployment:** [Vercel](https://vercel.com/)

---

## Setup & Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ShoElj/Motor-Valut-x
    cd motorvault
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Firebase project configuration keys. **Do not** commit this file to GitHub.
    ```
    VITE_API_KEY="YOUR_API_KEY"
    VITE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    VITE_APP_ID="YOUR_APP_ID"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## Contact

Your Name – Shodipo ELijah 

Project Link: [https://github.com/ShoElj/Motor-Valut-x/]
