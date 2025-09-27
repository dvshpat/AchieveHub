import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileBadge, Users, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
        >
          Welcome to AchieveHub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-lg md:text-xl max-w-2xl text-gray-600 mb-8"
        >
          Your AI-powered platform to manage certificates, hackathons, internships, and achievements — all in one verified portfolio.
        </motion.p>
        <div className="flex gap-4">
          <Button size="lg" className="rounded-2xl bg-purple-600 text-white hover:bg-purple-700">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl border-gray-400 text-gray-700 hover:bg-gray-200">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-20 py-20">
        {[
          {
            icon: <FileBadge className="w-12 h-12 text-purple-500" />,
            title: "Verified Certificates",
            desc: "Upload and auto-verify all your achievements with AI."
          },
          {
            icon: <Users className="w-12 h-12 text-blue-500" />,
            title: "Smart Profile",
            desc: "Create a professional portfolio trusted by recruiters."
          },
          {
            icon: <Rocket className="w-12 h-12 text-pink-500" />,
            title: "Career Boost",
            desc: "Showcase your journey with real impact and growth."
          },
        ].map((feature, i) => (
          <Card
            key={i}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-24 bg-gradient-to-r from-purple-100 to-blue-100">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Start Showcasing Your Achievements Today!
        </h2>
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl">
          Join Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 text-gray-600">
        © {new Date().getFullYear()} AchieveHub · Built with ❤️
      </footer>
    </div>
  );
}
