"use client"

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366] text-white">
      <header className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">URExpert</div>
        <nav>
          <Button variant="link" className="text-white">Features</Button>
          <Button variant="link" className="text-white">Price</Button>
          <Button variant="link" className="text-white">FAQ</Button>
          <Button variant="ghost" className="text-white">🌙</Button>
        </nav>
      </header>

      <main>
        <section className="hero min-h-screen flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-yellow-400">Revolutionizing</span>{' '}
              <span className="text-green-400">Healthcare</span>
            </h1>
            <p className="text-xl mb-8">
              A cutting-edge, HIPAA-compliant platform for streamlining, analyzing, and
              optimizing medical decision-making with end-to-end encryption.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Input
                type="email"
                placeholder="name@yourcompany.com"
                className="max-w-sm bg-opacity-20 bg-white text-white placeholder-gray-300"
              />
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Get Started</Button>
            </div>
            <Button
              variant="ghost"
              className="text-green-400 hover:text-green-500"
              onClick={scrollToFeatures}
            >
              Learn more <ChevronDown className="ml-2" />
            </Button>
          </div>
        </section>

        <section ref={featuresRef} className="features py-20 px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">Our features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              features={[
                "Patient Review Generation",
                "Dark/Light Theme Option",
                "Secure Data Encryption",
                "User Dashboard",
                "AI Integration for Patient Summaries",
                "Performance Tracking and Reports",
                "Customizable Layouts"
              ]}
            />
            <FeatureCard
              features={[
                "Multi-User Account Management",
                "Advanced Analytics for Review Trends ⭐",
                "Theme Personalization",
                "Collaboration Tools for Teams ⭐",
                "Role-Based Access Control",
                "Easy Sign-In with Third-Party Services",
                "Progress Notifications for Users ⭐"
              ]}
            />
            <FeatureCard
              features={[
                "Secure File Attachments",
                "Subscription Management",
                "Real-Time Updates",
                "Voice Input for Reviews ⭐",
                "Announcement & Update Blog",
                "Customizable Alerts",
                "Multi-Platform Access (Web, Mobile)"
              ]}
            />
          </div>
        </section>

        <section className="pricing py-20 px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-400">Subscriptions/Prices</h2>
          <div className="flex justify-center items-center gap-4 mb-8">
            <Label htmlFor="pricing-toggle" className={isAnnual ? 'text-green-400' : 'text-white'}>Yearly</Label>
            <Switch
              id="pricing-toggle"
              checked={!isAnnual}
              onCheckedChange={(checked) => setIsAnnual(!checked)}
            />
            <Label htmlFor="pricing-toggle" className={!isAnnual ? 'text-green-400' : 'text-white'}>Monthly</Label>
          </div>
          <p className="text-center mb-12 text-yellow-400">Save up to 30% when you sign up for a yearly plan</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Free"
              price={0}
              features={[
                "Talk to Claude on the web, iOS, and Android",
                "Ask about images and documents"
              ]}
            />
            <PricingCard
              title="Pro"
              price={isAnnual ? 16 : 20}
              features={[
                "Everything in Free",
                "Use Claude 3 Opus and Haiku"
              ]}
            />
            <PricingCard
              title="Team"
              price={isAnnual ? 20 : 25}
              subtext="Per member, 5 minimum"
              features={[
                "Everything in Pro",
                "Higher usage limits versus Pro"
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="Contact Sales"
              features={[
                "Everything in Team",
                "More usage than Team",
                "Expanded context"
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ features }: { features: string[] }) {
  return (
    <Card className="bg-opacity-10 bg-white border-none">
      <CardContent className="p-6">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PricingCard({ title, price, subtext, features }: { title: string, price: number | string, subtext?: string, features: string[] }) {
  return (
    <Card className="bg-opacity-10 bg-white border-none">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-3xl font-bold mb-1">
          {typeof price === 'number' ? `$${price}` : price}
          {typeof price === 'number' && <span className="text-sm font-normal">/month</span>}
        </p>
        {subtext && <p className="text-sm mb-4 text-gray-400">{subtext}</p>}
        <ul className="space-y-2 mt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 text-green-400">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}