# Jupiter

_A tool to find ways to get involved on campus._

![Vercel](https://vercelbadge.vercel.app/api/UTDNebula/jupiter])

## Getting Started

This project requires a working [Node.js](https://nodejs.org/en/) installation
(at least v14) with NPM, which comes bundled with Node.js (at least v8). (If you
use Yarn, that's fine, too. Just beware of the commands.)

First, clone the repository.

```bash
git checkout https://github.com/UTDNebula/jupiter.git
```

Make sure to install the dependencies:

```bash
npm install
```

## Firebase
- Need to get the service account key from the Firebase console
- Insert location of the certificate in the .env file
  - GOOGLE_APPLICATION_CREDENTIALS = /path/to/serviceAccountKey.json


Now you can run the development server:

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

## Deployment

The `develop` branch for this repository is automatically deployed to Vercel at [dev.jupiter.utdnebula.com][site].

The live, production version of the site is accessible at [jupiter.utdnebula.com][deployment]

[dev deployment][dev.jupiter.utdnebula.com]
[deployment][jupiter.utdnebula.com]
