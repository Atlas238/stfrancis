This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## StFrancis Front End

This repository is the front end for the StFrancis Foundations database, utilized for Client checkin/checkout and general management.

Future developers should begin by following the above links to become familiarized with Next.js overall as this documentation will not go into detail regarding features specific to Next.

# Authentication

We are currently using Json Web Tokens to handle user authentication. The relevant files are "services/user.service.js" as well as "pages/api/users/authenticate.js" and "pages/api/users/index.js".
Additional files that implement JWT middelware can be found in the "helpers" folder. 


# Key Components

The most curical component in our current implementation is the "Client" component. It is rendered on many different pages of the application, morphing its html structure to fit the current context. Most of the database functionality is tied to this component, and the methods are contained within it rather than the pages where the component is rendered. 

Additionally the FullClient component is a helper component to facilitate the display of a full clients details on a given clients profile page. Rather than clutter up the Client component with data that is not visible anywhere other than the client profile page, we created this to hold literally everything associated with a given client.

## Deploy on Vercel

[Find our deployment here](stfrancis.vercel.app)
