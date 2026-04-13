import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="pt-24 pb-24">
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Contactez <span className="text-orange-500">Nous</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Vous avez un projet ? Nous sommes là pour vous accompagner.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-gray-50 p-8 rounded-[2rem]">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Nos coordonnées</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Téléphone / WhatsApp</p>
                      <p className="text-lg font-bold text-gray-900">+221 77 251 56 90</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email</p>
                      <p className="text-lg font-bold text-gray-900">contact@gueye-freres.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Localisation</p>
                      <p className="text-lg font-bold text-gray-900">Dakar, Sénégal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Horaires</p>
                      <p className="text-lg font-bold text-gray-900">Lun - Sam : 08h - 18h</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/221772515690"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-500 hover:bg-green-600 text-white p-8 rounded-[2rem] text-center transition-all shadow-xl shadow-green-500/20 group"
              >
                <MessageCircle size={48} className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-xl font-bold">Discuter sur WhatsApp</p>
                <p className="text-sm opacity-80">Réponse rapide garantie</p>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[3rem] shadow-sm">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Nom complet</label>
                      <input
                        {...register('name', { required: true })}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Téléphone</label>
                      <input
                        {...register('phone', { required: true })}
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all"
                        placeholder="Votre numéro"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Service demandé</label>
                    <select
                      {...register('service')}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="Menuiserie Métallique">Menuiserie Métallique</option>
                      <option value="Aluminium">Aluminium</option>
                      <option value="Inox">Inox</option>
                      <option value="Soudure">Soudure</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea
                      {...register('message', { required: true })}
                      rows={6}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Envoi en cours...' : (
                      <>
                        Envoyer le message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                  {success && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 font-bold text-center"
                    >
                      Votre message a été envoyé avec succès ! Nous vous recontacterons bientôt.
                    </motion.p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.747834789544!2d-17.514757624194!3d14.726880073954336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec112638848606f%3A0x959929559e6616a!2sAlmadies%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1712395723456!5m2!1sfr!2ssn"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Guèye et Frères"
        ></iframe>
      </section>
    </div>
  );
}
