User Management Dashboard

This is a Next.js project bootstrapped with create-next-app.

Getting Started

First, clone the repository:

git clone <repository-url>
cd user-management-dashboard

Install dependencies:

npm install

Run the development server:

npm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying pages/index.js. The page auto-updates as you edit the file.

This project uses tailwindcss for styling, making it easy to create responsive and modern UI components.

Features

View Users: Fetch and display a list of users from the JSONPlaceholder API.

Add Users: Use a form to add new users.

Edit Users: Update user details via an edit form.

Delete Users: Remove users from the list.

Responsive Design: Optimized for mobile and desktop.

Error Handling: Gracefully handle API failures with user-friendly error messages.

API Endpoints

This project interacts with the following JSONPlaceholder API endpoints:

GET /users: Fetches the list of users.

POST /users: Adds a new user.

PUT /users/:id: Updates an existing user.

DELETE /users/:id: Deletes a user.

Learn More

To learn more about the tools used in this project, take a look at the following resources:

Next.js Documentation - Learn about Next.js features and API.

Tailwind CSS Documentation - Learn how to use Tailwind CSS for styling.

JSONPlaceholder API - Mock API for testing and demonstration purposes.

Deployment

The easiest way to deploy this Next.js app is to use the Vercel Platform:

Push your code to a Git repository.

Link the repository to your Vercel account.

Deploy directly from the Vercel dashboard.

For more details, check out Next.js deployment documentation.

Reflection and Future Improvements

Challenges Faced

API Constraints: Since JSONPlaceholder is a mock API, the changes made (like adding, editing, or deleting users) aren't persistent, which limited the ability to test real-world scenarios.

Error Handling: Handling potential API failures and ensuring smooth user experience required additional effort to design meaningful error messages and fallback mechanisms.

State Management: Managing application state for the user list and form data became increasingly complex as features were added.

Improvements with More Time

Real Backend Integration: Replace JSONPlaceholder with a custom backend to enable persistent data storage and retrieval.

Enhanced Validation: Add comprehensive client-side and server-side validation for form inputs.

Pagination: Implement server-side pagination to improve performance when handling a lmaarge user list.

Unit Testing: Add robust unit tests to ensure the reliability of individual components and features.

Improved Styling: Refine the UI further to include animations and better responsiveness for various screen sizes.

Accessibility: Ensure the application fully adheres to accessibility standards (WCAG), making it usable for all individuals, including those with disabilities.

Advanced Error Handling: Develop a centralized error boundary to handle unexpected crashes elegantly and log errors for debugging.

By addressing these challenges and implementing the mentioned improvements, the application can become more robust, user-friendly, and ready for production-grade use.
