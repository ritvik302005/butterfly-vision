/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import ButterflyClassifier from './components/ButterflyClassifier';
import Gallery from './components/Gallery';
import { Leaf, Heart, Github, Mail } from 'lucide-react';
import BrandMark from './components/BrandMark';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-olive/20 selection:text-brand-olive">
      <Hero />
      
      <main>
        <ButterflyClassifier />
        <Gallery />
        
        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-brand-olive text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Leaf className="w-12 h-12 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Preserving the Delicate Balance</h2>
            <p className="text-xl text-white/70 leading-relaxed mb-12">
              ButterflyID was born from a passion for lepidopterology and a commitment to conservation. 
              By leveraging advanced transfer learning and CNNs, we provide researchers and enthusiasts 
              with the tools they need to monitor and protect these vital pollinators.
            </p>
            <div className="flex justify-center gap-12 border-t border-white/10 pt-12">
              <div className="text-center">
                <p className="text-sm uppercase tracking-widest opacity-50 mb-2">Species Focus</p>
                <p className="text-2xl font-serif">75 Classes</p>
              </div>
              <div className="text-center">
                <p className="text-sm uppercase tracking-widest opacity-50 mb-2">Dataset Size</p>
                <p className="text-2xl font-serif">6,499 Images</p>
              </div>
              <div className="text-center">
                <p className="text-sm uppercase tracking-widest opacity-50 mb-2">Technology</p>
                <p className="text-2xl font-serif">CNN Transfer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-brand-ink/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <BrandMark className="scale-90 origin-left" />
          
          <div className="flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-brand-ink/40">
            <a href="#" className="hover:text-brand-olive transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-olive transition-colors">Terms</a>
            <a href="mailto:talwarritvik2840@gmail.com" className="hover:text-brand-olive transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ritvik302005"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded-full hover:bg-brand-olive/10 transition-colors text-brand-ink/60 hover:text-brand-olive"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:talwarritvik2840@gmail.com"
              aria-label="Email Ritvik Talwar"
              className="p-2 rounded-full hover:bg-brand-olive/10 transition-colors text-brand-ink/60 hover:text-brand-olive"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-brand-ink/5 text-center text-xs text-brand-ink/30 uppercase tracking-widest font-bold">
          Developed by Ritvik Talwar • Made with <Heart className="w-3 h-3 inline-block mx-1 text-red-400" /> for Biodiversity &copy; 2026
        </div>
      </footer>
    </div>
  );
}
