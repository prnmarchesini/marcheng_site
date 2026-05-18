import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["pt", "en", "es", "it"] as const;
export const defaultLocale = "pt" as const;
export const localePrefix = "as-needed" as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  if (!requested || !locales.includes(requested as Locale)) notFound();
  const locale = requested as Locale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
