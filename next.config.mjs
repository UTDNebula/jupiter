/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.discordapp.com',
      'jupiter.nlmc.workers.dev',
    ],
  },
};

export default config;
