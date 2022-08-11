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

# Methodology

The current User experience revolves around logging in, searching for a client, clicking the checkin button, creating a printout, and finally reconciling the clients' printed "shopping list" with what they actually recieved. Login is handled by the login.jsx page as well as the authentication middleware further detailed below. Once logged in, a user is then directed to the index.jsx page where they can search for a client with a First Name, Last Name and Birthdate. A list is then returned and rendered below, at which point the user will identify the correct client and check them in via the checkin button on their card. The user will then be taken to the checkin page which will generate the printout or "shopping list". After the client has finished shopping, they will return to the user at which point the User will navigate to the Checkedin Clients page or checkedin.jsx (from the top navigation bar) where they can select the correct client and begin the reconcilliation process on the checkout.jsx page. Once filled out and submitted a new Visit record will be added to the database for the Client.

We currently are handling much of the "checkin" logic exclusively on the front end, storing client details for checkedin clients in local storage. We use dyanmic next.js routes for Client profile pages where all of a clients visits are listed, as well as updating an existing client, which can be done from the same profile page. 

Reporting tools and other statistics can be found in the stats.jsx page which utilizes daisyui and D3.js to provide some simple visualizations of longer form data from the database. Any additional datasets required should first have a SQL query supporting them before any visualization changes are made. 

# Authentication

We are currently using Json Web Tokens to handle user authentication. The relevant files are "services/user.service.js" as well as "pages/api/users/authenticate.js" and "pages/api/users/index.js".
Additional files that implement JWT middelware can be found in the "helpers" folder. 


# Key Components

The most curical component in our current implementation is the "Client" component. It is rendered on many different pages of the application, morphing its html structure to fit the current context. Most of the database functionality is tied to this component, and the methods are contained within it rather than the pages where the component is rendered. 

Additionally the FullClient component is a helper component to facilitate the display of a full clients details on a given clients profile page. Rather than clutter up the Client component with data that is not visible anywhere other than the client profile page, we created this to hold literally everything associated with a given client.

Part of the user methodolgy necesitates a printed form or shopping list, which can be found within the Printout component.
This will substitute for the current webpage and be printed out instead. Edit the component itself to change the printout design, contents or any other aspects.

## Deploy on Vercel

[Find our deployment here](stfrancis.vercel.app)
