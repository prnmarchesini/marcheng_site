import { unstable_setRequestLocale } from "next-intl/server";
import About from "../../components/sections/About";
import Clients from "../../components/sections/Clients";
import Contact from "../../components/sections/Contact";
import Hero from "../../components/sections/Hero";
import Services from "../../components/sections/Services";
import Stats from "../../components/sections/Stats";

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Clients />
      <Contact />
    </>
  );
}
