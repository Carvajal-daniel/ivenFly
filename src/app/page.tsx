import Hero from "@/components/Hero/Hero";
import Services from "@/components/services/Services";
import Header from "@/components/header/Header";
import { SubscriptionPlans } from "@/components/Pricing/SubscriptionPlans";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="min-h-screen ">
        <section>
          <Hero />
        </section>

        <section>
          <Services />
        </section>

        <section>
          <SubscriptionPlans />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
