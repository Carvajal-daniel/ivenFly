import Hero from "@/components/Hero/Hero"
import Services from "@/components/services/Services"
import Header from "@/components/header/Header"
import { SubscriptionPlans } from "@/components/Pricing/SubscriptionPlans"
import GradientBg from "@/lib/gradient"

export default function Home() {
  return (
    <div className="min-h-screen ">
      <Header />
      <Hero />
      <Services />
      <SubscriptionPlans/>
    </div>
  )
}
