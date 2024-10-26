import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import("next").NextConfig} */
const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
const nextConfig = {
  // reactStrictMode: true,
  // i18n: {
  //   locales: ["en", "fr"],  // Supported locales
  //   defaultLocale: "en",     // Fallback to English
  // },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
      disable: phase === PHASE_DEVELOPMENT_SERVER,  // Disable PWA in dev mode
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default withNextIntl(nextConfig);
