import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Clock, Ruler, Hammer, MessageCircle } from 'lucide-react';

const services = [
  {
    title: 'Menuiserie Métallique',
    description: 'Portails, portes, grilles et structures sur mesure.',
    icon: <Hammer className="text-orange-500" size={32} />,
    href: '/services/menuiserie-metallique'
  },
  {
    title: 'Aluminium',
    description: 'Fenêtres, vitrines et cloisons modernes et légères.',
    icon: <Shield className="text-orange-500" size={32} />,
    href: '/services/aluminium'
  },
  {
    title: 'Inox',
    description: 'Rampes, garde-corps et escaliers haut de gamme.',
    icon: <Ruler className="text-orange-500" size={32} />,
    href: '/services/inox'
  }
];

const stats = [
  { label: 'Projets Terminés', value: '500+' },
  { label: 'Années d\'Expérience', value: '15+' },
  { label: 'Clients Satisfaits', value: '100%' },
  { label: 'Collaborateurs', value: '20+' },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            // src="/images/home_bg.jpg"
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070"
            alt="Atelier de menuiserie métallique"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-orange-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              Expertise & Savoir-faire
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Guèye et Frères <span className="text-orange-500">Fer Forge</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              La qualité et le Joli Design. Nous réalisons vos ouvrages métalliques, 
              aluminium et inox sur mesure avec une précision artisanale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Demander un devis
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/realisations"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95"
              >
                Voir nos réalisations
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Presentation Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/home_bg.jpg"
                // src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070"
                alt="Travail du métal"
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-orange-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold">15+</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Ans d'expérience</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-4">Votre expert local</h2>
              <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                L'excellence en menuiserie métallique à votre service
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Guèye et Frères Fer Forge met son expertise au service des particuliers, 
                entreprises et chantiers. Nous réalisons tous types de travaux en métal, 
                aluminium et inox, avec des finitions propres et durables.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Travail professionnel',
                  'Respect des délais',
                  'Matériaux de qualité',
                  'Fabrication sur mesure',
                  'Service fiable',
                  'Design moderne'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-orange-500" size={20} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all"
              >
                En savoir plus sur nous
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-4">Nos Services</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Des solutions adaptées à vos besoins</h3>
            <p className="text-lg text-gray-600">
              Nous couvrons l'ensemble des besoins en menuiserie métallique, de la conception à l'installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 group-hover:gap-3 transition-all"
                >
                  En savoir plus
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/20 blur-[100px] -ml-32 -mb-32" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Besoin d’un devis rapide pour votre projet ?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Contactez-nous directement sur WhatsApp pour discuter de votre projet. 
              Nous répondons rapidement et vous proposons une solution adaptée.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="https://wa.me/221772515690"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-green-500/20"
              >
                <MessageCircle size={24} />
                WhatsApp : +221 77 251 56 90
              </a>
              <Link
                to="/contact"
                className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 rounded-2xl font-bold flex items-center justify-center transition-all active:scale-95"
              >
                Formulaire de contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
