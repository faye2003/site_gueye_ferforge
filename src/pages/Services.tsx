import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hammer, Shield, Ruler, Zap, Wrench, Package, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'menuiserie-metallique',
    title: 'Menuiserie Métallique',
    description: 'Nous réalisons tous types d’ouvrages en métal pour les maisons, immeubles et entreprises.',
    icon: <Hammer size={32} />,
    prestations: [
      'Portails métalliques',
      'Portes métalliques',
      'Grilles de protection',
      'Balcons & Clôtures',
      'Structures métalliques',
      'Hangars & Charpentes'
    ]
  },
  {
    id: 'aluminium',
    title: 'Menuiserie Aluminium',
    description: 'Installations modernes, légères et résistantes à la corrosion.',
    icon: <Shield size={32} />,
    prestations: [
      'Fenêtres en aluminium',
      'Portes en aluminium',
      'Vitrines & Baies vitrées',
      'Vérandas',
      'Cloisons aluminium',
      'Devantures de magasins'
    ]
  },
  {
    id: 'inox',
    title: 'Menuiserie Inox',
    description: 'Ouvrages en inox pour un design moderne et une grande résistance.',
    icon: <Ruler size={32} />,
    prestations: [
      'Rampes en inox',
      'Garde-corps',
      'Escaliers en inox',
      'Portes en inox',
      'Structures décoratives'
    ]
  },
  {
    id: 'soudure',
    title: 'Soudure',
    description: 'Tous types de travaux de soudure pour la fabrication et la réparation.',
    icon: <Zap size={32} />,
    prestations: [
      'Soudure métallique',
      'Réparation de structures',
      'Renforcement de portails',
      'Assemblage de pièces'
    ]
  },
  {
    id: 'installation',
    title: 'Installation',
    description: 'Installation complète de vos équipements métalliques par nos experts.',
    icon: <Package size={32} />,
    prestations: [
      'Installation de portails',
      'Pose de fenêtres & portes',
      'Installation de grilles',
      'Installation de structures'
    ]
  },
  {
    id: 'reparation',
    title: 'Réparation et entretien',
    description: 'Intervention rapide pour réparer ou entretenir vos installations.',
    icon: <Wrench size={32} />,
    prestations: [
      'Réparation de portails',
      'Réparation de portes',
      'Remplacement de pièces',
      'Entretien des structures'
    ]
  }
];

export default function Services() {
  return (
    <div className="pt-24 pb-24 bg-gray-50">
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Nos <span className="text-orange-500">Services</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Une gamme complète de solutions en menuiserie métallique, aluminium et inox.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.prestations.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all"
                >
                  En savoir plus
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
