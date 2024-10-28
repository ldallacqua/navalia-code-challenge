# **Navalia Code Challenge**

## **Project Overview**
The **Navalia Code Challenge** is a web application built with Next.js, Prisma, and TypeScript, providing a modern interface with various interactive components using Shadcn/ui on top of Radix UI. The application integrates with PostgreSQL for database management and employs both frontend and backend tools to ensure a robust, responsive user experience.

## **Table of Contents**
1. [Getting Started](#getting-started)
2. [Running the Project](#running-the-project)
3. [Testing and Linting](#testing-and-linting)
4. [Architecture Overview](#architecture-overview)
5. [Design Decisions](#design-decisions)
6. [Database Schema and Relationships](#database-schema-and-relationships)
7. [Future Improvements](#future-improvements)
8. [Deployment and CI/CD](#deployment-and-cicd)

---

### **Getting Started**

#### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16+)
- **yarn**
- **PostgreSQL** (for database support)
- **Prisma** (used for ORM)

#### Installation
1. Clone this repository:
   ```bash
   git clone git@github.com:ldallacqua/navalia-code-challenge.git
   cd navalia-code-challenge
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure the PostgreSQL database. Set up your `.env` file based on `.env.example`:
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

4. Initialize Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

---

### **Running the Project**

#### Development Mode
To start the development server:
   ```bash
   yarn dev
   ```

This will run the project locally at `http://localhost:3000`.

#### Production Mode
For a production build, use:
   ```bash
   yarn build
   ```

---

### **Testing and Linting**

#### Run Tests
This project uses **Jest** for unit testing. To run all tests:
   ```bash
   yarn test
   ```

For watch mode:
   ```bash
   yarn test:watch
   ```

#### Code Linting
Ensure code quality with ESLint and Prettier:
   ```bash
   yarn lint
   yarn format
   ```

Type-checking with TypeScript:
   ```bash
   yarn type-check
   ```

---

### **Architecture Overview**

This application is structured with the following major components and technologies:

- **Next.js**: Provides a flexible framework for SSR (Server-Side Rendering) and SSG (Static Site Generation).
- **Prisma**: Acts as the ORM for interfacing with a PostgreSQL database, offering type-safe database queries.
- **Radix UI**: Utilized for accessible and customizable UI components.
- **React Query**: For efficient data fetching and caching in React.
- **Tailwind CSS**: A utility-first CSS framework for fast and responsive UI styling.
- **shadcn/ui**: Used for component styling, **shadcn/ui** provides accessible, customizable UI components built on top of Radix UI and styled with Tailwind CSS, ensuring that the interface is both consistent and highly customizable.

---

### **Project Structure**

The project is organized into modular directories to maintain clarity, reusability, and scalability:

- **`app/`**: Contains core application pages, API routes, and global styles. Within `app/api`, separate folders manage API routes for `cart`, `products`, and `users`, enabling modular backend functionality.

- **`components/`**: Houses reusable UI components built with **shadcn/ui** for consistent and accessible design. The `ui` subfolder includes components like `cart-item`, `login-form`, and `theme-provider`, all utilizing **shadcn/ui** for a cohesive style.

- **`containers/`**: Higher-level components that group multiple UI elements, handling larger application sections.

- **`helpers/`, `hooks/`, and `utils/`**: Include helper functions, custom React hooks, and general-purpose utilities shared across the application.

- **`mocks/`**: Contains mock data for testing and development, allowing simulation of API responses to streamline testing without real network calls.

- **`schemas/`**: Schema definitions used for data validation, such as API request validation or form handling.

- **`tests/`**: Contains **test utilities** and configurations (`test-utils`) for setting up and running tests. Individual component tests are colocated next to their components with a `.test.tsx` extension, following a pattern of keeping tests close to the code they verify.

This structure, combined with **shadcn/ui** for UI consistency and colocated tests for better maintainability, ensures a clean, organized, and scalable codebase.

---

### **Design Decisions**

- **Next.js and React for Client and Server Rendering**: This choice enables efficient rendering options, allowing for SSR where needed and client-side navigation.
- **Prisma ORM**: Prisma was chosen for its developer-friendly interface and strong TypeScript support, which ensures type safety and reduces runtime errors.
- **Radix UI Components**: Radix offers accessible, headless UI components that fit seamlessly into a React application, helping maintain a consistent UI.
- **Tailwind CSS**: Tailwind was chosen for its utility-first approach, making it easier to develop custom-styled components rapidly.
- **React Query**: To manage server state effectively, React Query was selected for data fetching and caching, improving performance and data handling within the app.
- **shadcn/ui for Consistent and Accessible UI Components**: This project uses **shadcn/ui** to build a cohesive and accessible design system. Leveraging **shadcn/ui** provides a set of pre-designed, Radix-based components styled with Tailwind CSS, ensuring consistency across UI elements and simplifying component customization.

---
### **Database Schema and Relationships**

This project utilizes **Prisma** with **PostgreSQL** to manage the database. The schema is designed to support users, products, and shopping cart items, and it aligns with the core functionality required for handling promotions and discounts in the shopping cart system.

![diagram](assets/diagram.png)

#### **Prisma Schema Overview**
The Prisma schema includes three primary models: **User**, **Product**, and **CartItem**. Here’s an explanation of each model and its relationships:

1. **User Model**
   - **Fields**:
     - `id`: The unique identifier for each user.
     - `email`: A unique email address for each user.
     - `name`: An optional name field.
     - `userType`: Specifies the type of user (`COMMON` or `VIP`). This field is critical in determining eligibility for discounts, as VIP users receive a special 15% discount.
     - `CartItem`: A relation to the `CartItem` model, linking each user to the items in their shopping cart.
     - `createdAt` and `updatedAt`: Timestamps for when the user was created and last updated.
   - **Purpose**: Identifies and categorizes users, distinguishing between **VIP** and **common** users to apply relevant promotional discounts.

2. **Product Model**
   - **Fields**:
     - `id`: Unique identifier for each product.
     - `name`: Name of the product.
     - `description`: A brief description of the product.
     - `imagePath`: Path to the product image.
     - `price`: The price of the product, stored as a `Decimal` with two decimal places.
     - `CartItem`: A relation to the `CartItem` model, linking each product to items in users' shopping carts.
     - `createdAt` and `updatedAt`: Timestamps for product creation and updates.
   - **Purpose**: Represents available items that users can add to their cart. The `price` field is crucial for calculating totals and applying promotions.

3. **CartItem Model**
   - **Fields**:
     - `id`: Unique identifier for each cart item.
     - `quantity`: Quantity of the product added to the cart.
     - `userId` and `productId`: Foreign keys linking `CartItem` entries to the respective `User` and `Product` entries.
     - `User`: A relation to the `User` model, indicating which user added the item to their cart.
     - `Product`: A relation to the `Product` model, indicating which product was added.
     - `createdAt` and `updatedAt`: Timestamps for tracking when the cart item was created and updated.
   - **Purpose**: Serves as the bridge between users and products in their cart. Each cart item entry captures the quantity of a product added by a user, facilitating calculations for promotions and discounts.

#### **Relation to Shopping Cart Functionality**

The schema design supports the following requirements in the shopping cart system:

- **User Type-Based Discounts**: The `userType` in the `User` model enables the system to differentiate between common and VIP users, essential for applying the **VIP 15% discount** when applicable.
- **Product-Based Promotions**: Using the `price` field in the `Product` model allows the calculation of the **"Get 3 for 2"** promotion. This promotion calculates the total based on the lowest-priced items, which is dynamically determined based on the `price` attribute.
- **Automatic Best Pricing Recommendation**: By cross-referencing user type and cart contents, the API can calculate both the **VIP discount** and **"Get 3 for 2" promotion** and suggest the best option. For instance, VIP customers get an exclusive discount but will still receive the "Get 3 for 2" recommendation if it's more advantageous.

This schema provides a flexible, scalable foundation for expanding the shopping cart's functionality, such as adding new user types, products, or complex promotions.

---
### **Deployment and CI/CD**

This project leverages **Next.js** as the primary framework, chosen not only for its SSR (Server-Side Rendering) and SSG (Static Site Generation) capabilities but also for its seamless integration with **Vercel**. Vercel, the creator of Next.js, provides robust CI/CD features and out-of-the-box support for deploying Next.js applications, making it an ideal platform for rapid deployment and scalability.

#### Why Vercel?
- **CI/CD Integration**: Vercel integrates directly with GitHub and GitLab repositories, triggering automatic deployments on each push to main branches or pull requests, simplifying the CI/CD pipeline.
- **Ease of Deployment**: With a single click, Vercel enables deploying Next.js applications, requiring minimal configuration. The platform is optimized for Next.js, handling performance optimizations like static caching and automatic routing, making it especially efficient for deploying this app.
- **Database Support**: Vercel provides seamless integration with PostgreSQL and other databases through partners like **Neon** and **PlanetScale**, enabling database deployments with secure, scalable connections without complex configurations.
- **Environment Management**: Vercel’s dashboard allows easy management of environment variables for different deployments, making it straightforward to switch between development, staging, and production configurations.

This integration with Vercel makes deploying, testing, and scaling the application more manageable and reliable, with minimal manual setup. The platform’s support for PostgreSQL as a backend database aligns well with Prisma ORM, used here for database operations, ensuring a robust and efficient stack.

---

### **Future Improvements**

- **Error Boundary Implementation**: Set up error boundaries for enhanced error handling on a per-page or per-component basis.
- **Performance Optimizations**: Investigate lazy-loading strategies for images and other heavy assets.
- **Testing Coverage Expansion**: Increase test coverage, particularly on critical functionalities and edge cases.
