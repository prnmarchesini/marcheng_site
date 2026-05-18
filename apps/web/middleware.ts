import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
