# User Management Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository:
```bash
git clone <repository-url>
cd user-management-dashboard
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

This project uses [`tailwindcss`](https://tailwindcss.com/) for styling, making it easy to create responsive and modern UI components.

## Features

- **View Users**: Fetch and display a list of users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).
- **Add Users**: Use a form to add new users.
- **Edit Users**: Update user details via an edit form.
- **Delete Users**: Remove users from the list.
- **Responsive Design**: Optimized for mobile and desktop.
- **Error Handling**: Gracefully handle API failures with user-friendly error messages.

## API Endpoints
This project interacts with the following JSONPlaceholder API endpoints:
- `GET /users`: Fetches the list of users.
- `POST /users`: Adds a new user.
- `PUT /users/:id`: Updates an existing user.
- `DELETE /users/:id`: Deletes a user.

## Learn More

To learn more about the tools used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to use Tailwind CSS for styling.
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) - Mock API for testing and demonstration purposes.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/):

1. Push your code to a Git repository.
2. Link the repository to your Vercel account.
3. Deploy directly from the Vercel dashboard.

For more details, check out [Next.js deployment documentation](https://nextjs.org/docs/deployment).

