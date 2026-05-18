import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { locales, type Locale } from "../../i18n";
import "../globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcheng.com.br";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  const localePath = params.locale === "pt" ? "" : `/${params.locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | MarchEng`,
    },
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}${localePath}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}${l === "pt" ? "" : `/${l}`}`]),
      ),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${localePath}`,
      title: t("title"),
      description: t("description"),
      siteName: "MarchEng",
      locale: params.locale,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const typekitId = process.env.NEXT_PUBLIC_TYPEKIT_ID;

  return (
    <html lang={locale} className="dark">
      <head>
        {typekitId && (
          <link
            rel="stylesheet"
            href={`https://use.typekit.net/${typekitId}.css`}
          />
        )}
      </head>
      <body className="bg-background text-text-primary antialiased selection:bg-secondary selection:text-bg-deep">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Nav />
          <main className="pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
