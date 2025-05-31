import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Camera, Users, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InfoCard from "./InfoCard";
import Bot from "./Bot";

const Hero = () => {
  const infoCards = useMemo(
    () => [
      {
        title: "Report Cases",
        description:
          "Found an animal in distress? Report it immediately and our rescue team will respond.",
        icon: <Camera size={24} />,
        linkText: "Report Now",
        linkUrl: "/report-case",
        color: "orange",
      },
      {
        title: "Volunteer With Us",
        description:
          "Join our network of volunteers and help rescue and rehabilitate animals in need.",
        icon: <Users size={24} />,
        linkText: "Join Us",
        linkUrl: "/volunteer",
        color: "blue",
      },
      {
        title: "Support Our Mission",
        description:
          "Your donations help us save more animals and provide them with necessary care.",
        icon: <Award size={24} />,
        linkText: "Donate",
        linkUrl: "/donate",
        color: "teal",
      },
    ],
    []
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-800 text-white flex items-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
            style={{
              backgroundImage: `url('https://unsplash.com/photos/brown-tabby-kitten-lying-on-white-textile-uhnZZUaTIOs')`,
              backgroundColor: "rgba(17, 24, 39, 0.5)", // Fallback
            }}
          />
          <div
            className="absolute inset-0 opacity-30 w-full h-full"
            style={{
              backgroundImage: `url('https://www.transparenttextures.com/patterns/paws.png')`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-2/3 lg:w-1/2"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join Our Mission to Rescue & Protect Animals
            </h1>
            <p className="text-lg md:text-xl mb-8 text-teal-100">
              PETRAKSHAK connects rescuers, volunteers, and animal lovers to create a safer world for animals in distress.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-colors shadow-lg"
                  aria-label="Report a case"
                >
                  Report a Case
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/volunteer"
                  className="inline-block bg-white hover:bg-gray-100 text-teal-900 px-6 py-3 rounded-md font-semibold transition-colors shadow-lg dark:bg-gray-700 dark:text-teal-100 dark:hover:bg-gray-600"
                  aria-label="Become a volunteer"
                >
                  Become a Volunteer
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rescued Animals Gallery Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet some of the beautiful animals we've rescued and rehabilitated. Each one has a story of hope and recovery.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop",
                name: "Buddy",
                story: "Rescued from the streets, now healthy and loved"
              },
              {
                id: 2,
                image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop",
                name: "Whiskers",
                story: "Found injured, now living happily with a family"
              },
              {
                id: 3,
                image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=400&auto=format&fit=crop",
                name: "Max",
                story: "Abandoned puppy, now a therapy dog"
              },
              {
                id: 4,
                image: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=400&auto=format&fit=crop",
                name: "Luna",
                story: "Sick kitten nursed back to health"
              },
              {
                id: 5,
                image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400&auto=format&fit=crop",
                name: "Charlie",
                story: "Rescued from accident, fully recovered"
              },
              {
                id: 6,
                image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=400&auto=format&fit=crop",
                name: "Bella",
                story: "Stray cat now has a loving home"
              },
              {
                id: 7,
                image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=400&auto=format&fit=crop",
                name: "Rocky",
                story: "Injured dog, now running and playing"
              },
              {
                id: 8,
                image: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=400&auto=format&fit=crop",
                name: "Mittens",
                story: "Orphaned kitten, now thriving"
              }
            ].map((animal, index) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={animal.image}
                      alt={`Rescued animal ${animal.name}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {animal.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {animal.story}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Every rescue matters. Help us save more animals in need.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/report-case"
                className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Report an Animal in Need
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100"
        >
          How You Can Help
        </motion.h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <InfoCard
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  linkText={card.linkText}
                  linkUrl={card.linkUrl}
                  color={card.color}
                  className="my-4"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bot Component (Fixed Position) */}
      <Bot />
    </div>
  );
};

export default Hero;