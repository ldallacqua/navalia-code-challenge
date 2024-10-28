https://github.com/user-attachments/assets/f84c9555-8dfa-4638-a84b-7a4552597a0e

# **Navalia Code Challenge**

## **Live Demo**

Try out the live version of the project here: [Navalia Code Challenge - Live Demo](https://navalia-code-challenge.vercel.app)

## **Project Overview**

The **Navalia Code Challenge** is a web application that implements a shopping cart system with promotional pricing based on user type. The main requirements include:

- **Cart Management**: Support for adding and removing items from the cart.
- **User Type Identification**: Distinguishing between VIP and common users to apply different pricing rules.
- **Promotional Pricing**:
  - **"Get 3 for 2"** for common users.
  - **15% VIP Discount** for VIP users, with a recommendation of the most advantageous pricing option.

This project uses **Next.js** for API routes, **Prisma** with PostgreSQL for database management, and **shadcn/ui** for consistent UI components. Deployed on **Vercel**, it leverages CI/CD and easy database connectivity.

## ⚠️ **Note on Sample Scenarios**

> **Important:** During implementation, some discrepancies were identified in the provided sample scenarios, where the initial expected totals did not align with the correct promotional calculations. Corrections for these scenarios are listed below to ensure accuracy:

- **Scenario 2**: Common customer with 2 T-shirts and 2 jeans — Corrected expected total: USD **166.99**.
- **Scenario 4**: VIP customer with 2 jeans and 2 dresses — Corrected expected total for "Get 3 for 2" promotion: USD **226.75**.

For further details on these corrections, please refer to the [Correction of Calculation Errors in Sample Scenarios](#correction-of-calculation-errors-in-sample-scenarios) section.

## **Table of Contents**

1. [Getting Started](#getting-started)
2. [Running the Project](#running-the-project)
3. [Adding Products to the Database](#adding-products-to-the-database)
4. [Testing and Linting](#testing-and-linting)
5. [Architecture Overview](#architecture-overview)
6. [Design Decisions](#design-decisions)
7. [Database Schema and Relationships](#database-schema-and-relationships)
8. [Deployment and CI/CD](#deployment-and-cicd)
9. [Future Improvements](#future-improvements)
10. [Correction of Calculation Errors in Sample Scenarios](#correction-of-calculation-errors-in-sample-scenarios)

---

### **Getting Started**

#### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v20+)
- **Yarn**
- **PostgreSQL** (for database support)
- **Prisma** (used for ORM)

#### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/ldallacqua/navalia-code-challenge.git
   cd navalia-code-challenge
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Configure the PostgreSQL database. Set up your `.env` file based on `.env.example`:

   ```bash
   POSTGRES_PRISMA_URL="postgresql://username:password@localhost:5432/database_name"
   POSTGRES_URL_NON_POOLING="postgresql://username:password@localhost:5432/database_name?pgbouncer=false"
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

### **Adding Products to the Database**

**Note:** This project include predefined products in the database by default, but if you wish to add more you can do by using either **Postman** or **Prisma Studio**:

1. **Using Postman**:

   - A Postman collection is included in the project repository to help with adding products and testing other API endpoints. [Download the Postman Collection](./assets/Navalia.postman_collection.json) and import it into Postman. You can then use the `Create Product` request in the collection to create new products in the database.

2. **Using Prisma Studio**:
   - Run `npx prisma studio` in your terminal to open Prisma Studio.
   - In the **Product** model, manually enter product details in the fields provided.

This setup ensures the database has necessary data for testing shopping cart functionalities and promotions.

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

---

### **Correction of Calculation Errors in Sample Scenarios**

During testing, a few discrepancies were identified in the sample scenarios originally provided. Here’s a summary of the scenarios with incorrect calculations, along with the corrected totals:

#### **Scenario 2**: Common Customer with 2 T-Shirts and 2 Jeans

- **Original Expected Total**: USD 137.49
- **Correct Calculation**:

  - Since the promotion applies to the lowest-priced item, one T-shirt is free.
  - Paid items: 2 Jeans and 1 T-shirt.
  - **2 Jeans**: \( 2 \times 65.50 = 131.00 \)
  - **1 T-Shirt**: 35.99
  - **Correct Total**: \( 131.00 + 35.99 = 166.99 \)

  **Corrected Expected Total**: USD **166.99**

#### **Scenario 4**: VIP Customer with 2 Jeans and 2 Dresses

- **Original Expected Total for "Get 3 for 2"**: USD 211.25
- **Correct Calculation**:

  - The "Get 3 for 2" promotion applies to the cheapest item, so one jeans is free.
  - Paid items: 1 jeans and 2 dresses.
  - **1 Jeans**: 65.50
  - **2 Dresses**: \( 2 \times 80.75 = 161.50 \)
  - **Correct Total**: \( 65.50 + 161.50 = 226.75 \)

  **Corrected Expected Total for "Get 3 for 2"**: USD **226.75**

The other scenarios were calculated correctly and remain unchanged. This correction ensures that the pricing logic accurately reflects the expected promotional calculations.
