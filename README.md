# Javeat - Frontend

Welcome to the frontend repository of **Javeat**, a modern food delivery platform designed to bring your favorite dishes straight to your door with ease and efficiency. Developed with React, this part of the project focuses on providing a seamless and intuitive user experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed on your system:
- Node.js (version 12.x or later)
- npm (version 6.x or later)

You can check your current versions with the following commands:
```bash
node -v
npm -v
```


## Installation
To get the frontend running locally:

1. Be sure to have the javeat back-end running, you can find it here:
```bash
https://github.com/MapleLeaf93/javeat
```

2. Populate the the MySql db if you didn't, you can find a complete database here:
[Complete mock-db javeat](https://github.com/MapleLeaf93/javeat/blob/main/Complete_db_javeat.sql)

3. Clone this repository
```bash
git clone https://github.com/MapleLeaf93/javeat-front
```

4. Navigate to the project directory
```bash
cd javeat-frontend
```

5. Navigate to the project directory
```bash
cd javeat-frontend
```

6. Install dependencies
```bash
npm install
```

7. Add proxy to comunicate with the back-end, add this line in package.json right after line 4.
```bash
  "proxy": "http://localhost:8080/",
  ```

8. Start the development server
```bash
npm start
```
The app should now be running on http://localhost:8080.

## Features
Customizable Orders: Add dishes and ingredients to your cart, tailored exactly how you like them.
Dynamic Delivery System: Choose your delivery time based on distance calculations, ensuring your food arrives when you want it.
User Profiles: Manage your orders and view your order history for quick reordering.
Payment Integration: Securely pay for your orders with your preferred payment method.
Technologies
React: For building a dynamic and interactive user interface.
SASS CSS & Bootstrap: For styling and responsive design.
React Router: For navigation within the application.
Contributing
We welcome contributions to Javeat! If you have suggestions for improvements or bug fixes, please feel free to make a pull request or open an issue.

## Credits

This project was developed by a dedicated team of developers:

- **Luca Del Gatto** - [MapleLeaf93](https://github.com/MapleLeaf93)
- **Chiara Belfiore** - [LaFantoma](https://github.com/LaFantoma)
- **Cristina Conigli** - [CristinaConigli](https://github.com/CristinaConigli)

Special thanks to each team member for their hard work, commitment, and collaboration throughout this project.

## License
This project is licensed under the MIT License.

## Acknowledgments
A special thanks to the Javeat team and mentors at Generation Italy for their guidance and support throughout this project.
To all the open-source projects and libraries that made this application possible.

Happy ordering with **Javeat**!
