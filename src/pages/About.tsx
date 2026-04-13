import { motion } from 'framer-motion';
import { CheckCircle2, Users, Target, Heart } from 'lucide-react';

const values = [
  {
    title: 'Qualité du travail',
    description: 'Nous ne faisons aucun compromis sur la solidité et la finition de nos ouvrages.',
    icon: <CheckCircle2 className="text-orange-500" size={24} />
  },
  {
    title: 'Respect des délais',
    description: 'Votre temps est précieux. Nous nous engageons à livrer nos projets à temps.',
    icon: <Target className="text-orange-500" size={24} />
  },
  {
    title: 'Satisfaction client',
    description: 'Notre plus grande réussite est la confiance que nous témoignent nos clients.',
    icon: <Heart className="text-orange-500" size={24} />
  },
  {
    title: 'Design moderne',
    description: 'Nous allions la robustesse du métal à l\'esthétique contemporaine.',
    icon: <Users className="text-orange-500" size={24} />
  }
];

export default function About() {
  return (
    <div className="pt-24 pb-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070"
            alt="Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            À propos de <span className="text-orange-500">Guèye & Frères</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Une entreprise familiale passionnée par l'art du fer forge et de la menuiserie métallique.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
                Notre histoire et notre engagement
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Guèye et Frères Fer Forge est une entreprise spécialisée dans la menuiserie métallique, 
                  l'aluminium et l'inox. Grâce à notre expérience et à notre savoir-faire, 
                  nous réalisons des ouvrages solides, durables et esthétiques.
                </p>
                <p>
                  Nous accompagnons nos clients depuis la conception jusqu'à l'installation, 
                  en garantissant un travail propre et professionnel. Notre atelier est équipé 
                  des meilleures technologies pour assurer une précision millimétrée.
                </p>
                <p>
                  Que vous soyez un particulier souhaitant sécuriser sa maison ou une entreprise 
                  ayant besoin de structures industrielles, nous avons la solution adaptée.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/images/img1.jpg"
                // src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2069"
                alt="Atelier"
                className="rounded-2xl shadow-lg h-64 w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070"
                alt="Soudure"
                className="rounded-2xl shadow-lg h-64 w-full object-cover mt-8"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-4">Nos Valeurs</h2>
            <h3 className="text-3xl font-bold text-gray-900">Ce qui nous définit</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="mb-6">{value.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
