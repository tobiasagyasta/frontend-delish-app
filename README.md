# Delish App

![Delish App Logo Image](./public/assets/logo.png)

## Project Overview

Delish is a food discovery / reservation app that is currently looking to renew their reviewing system, hoping to increase more user interaction to their app this quarter, focusing on the user reviews of their reservations / experiences in the restaurants they've booked using the app.

This project is the realization of requirements outlined in the [Product Requirement Document (PRD)](https://drive.google.com/file/d/1fUyg8xxW97Wh3l376mGxs4IS3pnJgamp/view?usp=sharing) and [Delish's Figma design document](https://www.figma.com/design/JPKZiYRahoc44csia4GCiz/Delish?node-id=552-7999&t=xbFQa9dBW65lUkur-1). Our goal for the newly revamped review system is to provide a simpler and more streamlined experience in leaving a review for the food reservation / discovery app.

The implementation process was done through discussions and the splitting of user stories. In the front end, it is agreed upon that each member takes on a single page and the functionalities around it.

A positive on this "per-page" development approach is that it is easier for every team member to know what parts they needed to do. The negative of this approach is that there may be times where some pages may need to be dependent on other pages, so there would be some waiting to do to implement some functionalities that may be too dependent on multiple pages.

## Implemented Functionalities

The following user stories were identified and implemented to meet the requirements for the Review functionality:

1. Review Page - Overall Rating

   Allows users to give a general rating for their dining experience.

2. Review Page - Food Rating

   Users can rate the quality of the food specifically.

3. Review Page - Ambiance Rating

   Users can rate the ambiance of the dining venue.

4. Review Page - Service Rating

   Users can rate the level of service they received.

5. Review Page - General Comments

   Users can provide additional details or comments about their experience

6. Review Page - Media Upload

   Users can attach photos or videos of their dining experience to enhance their review.

7. Review Page - Reviewer Photos or Videos

   Allow reviewers to upload photos or videos, enhancing trust and providing more detailed insights into product quality and fit.

8. Review Page - Submission

   Users can submit their review to the restaurant

9. Review Page - Filter by pending and completed

   Users can view their pending reviews that they haven't filled in yet, and view all of their past completed reviews.

10. Login Page - Login by Email or Phone Number

    Users can login by either using email and password, or by using phone number and pin to provide more options in loggin in.

## Contributors

1. Tobias Halomoan
2. Lili Pertiwi
3. Imam Hari Maulana
4. Vito Yanufan
5. Aid Fawwaz

## Dependencies and Libraries

This project is currently set up with the following libraries and tools:

- [**ShadCN Component Library**](https://ui.shadcn.com/): A collection of customizable components built for rapid UI development.
- [**React Hook Form**](https://react-hook-form.com/): A lightweight library for managing form state and validation in React.
- [**Zod**](https://zod.dev/): A TypeScript-first schema validation library used for form validation and other data validation needs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Inter](https://vercel.com/font), a new font family used according to the Figma file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
