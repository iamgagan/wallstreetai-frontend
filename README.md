This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started


# Installation
First, Install the dependencies

```bash
npm install
```
# Prisma Setup
Then genrate the prisma entities types for your schema
```bash
npx prisma generate
```


# Environment Variables
Create a .env file in the root directory and add the following variables with the appropriate values :

```bash
DATABASE_URL=DATABASE_URL
GOOGLE_ID=GOOGLE_ID
GOOGLE_SECRET=GOOGLE_SECRET
LINKEDIN_ID=LINKEDIN_ID
LINKEDIN_SECRET=LINKEDIN_SECRET
APPLE_ID=APPLE_ID
APPLE_SECRET=APPLE_SECRET
```

# Development
Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

