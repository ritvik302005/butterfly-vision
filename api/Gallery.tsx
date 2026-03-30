import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Bug, Clock3, Search, ShieldCheck, Sparkles } from 'lucide-react';

interface FeaturedButterfly {
  name: string;
  scientific: string;
  family: string;
  classification: string;
  habitat: string;
  image: string;
  color: string;
}

interface RecentButterfly {
  commonName: string;
  scientificName: string;
  family: string;
  conservationStatus: string;
  confidence: number;
  uploadedImageUrl?: string;
}

const FEATURED_BUTTERFLIES: FeaturedButterfly[] = [
  {
    name: 'Adonis',
    scientific: 'Polyommatus bellargus',
    family: 'Lycaenidae',
    classification: 'Blue butterfly',
    habitat: 'Grasslands, meadows, and sunny open limestone areas',
    image: '/species/adonis.jpg',
    color: 'bg-stone-100'
  },
  {
    name: 'Monarch',
    scientific: 'Danaus plexippus',
    family: 'Nymphalidae',
    classification: 'Brush-footed butterfly',
    habitat: 'Open fields, gardens, grasslands, and migratory corridors',
    image: '/species/monarch.jpg',
    color: 'bg-sky-50'
  },
  {
    name: 'Brown Siproeta',
    scientific: 'Siproeta epaphus',
    family: 'Nymphalidae',
    classification: 'Brush-footed butterfly',
    habitat: 'Forest edges, tropical gardens, and warm open woodland',
    image: '/species/brown-siproeta.jpg',
    color: 'bg-orange-50'
  },
  {
    name: 'Cairns Birdwing',
    scientific: 'Ornithoptera euphorion',
    family: 'Papilionidae',
    classification: 'Swallowtail butterfly',
    habitat: 'Rainforest margins, subtropical woodland, and vine-rich habitats',
    image: '/species/cairns-birdwing.jpg',
    color: 'bg-emerald-50'
  }
];

export default function Gallery() {
  const [recentButterfly, setRecentButterfly] = useState<RecentButterfly | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('All Families');
  const [selectedHabitat, setSelectedHabitat] = useState('All Habitats');

  useEffect(() => {
    const saved = localStorage.getItem('butterfly:lastResult');
    if (saved) {
      try {
        setRecentButterfly(JSON.parse(saved));
      } catch {
        setRecentButterfly(null);
      }
    }
  }, []);

  const familyOptions = ['All Families', ...Array.from(new Set(FEATURED_BUTTERFLIES.map((item) => item.family)))];
  const habitatOptions = [
    'All Habitats',
    ...Array.from(
      new Set(
        FEATURED_BUTTERFLIES.map((item) =>
          item.habitat.split(',')[0].trim()
        )
      )
    )
  ];

  const filteredButterflies = useMemo(() => {
    return FEATURED_BUTTERFLIES.filter((butterfly) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        [butterfly.name, butterfly.scientific, butterfly.family, butterfly.classification, butterfly.habitat]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFamily =
        selectedFamily === 'All Families' || butterfly.family === selectedFamily;

      const habitatTag = butterfly.habitat.split(',')[0].trim();
      const matchesHabitat =
        selectedHabitat === 'All Habitats' || habitatTag === selectedHabitat;

      return matchesSearch && matchesFamily && matchesHabitat;
    });
  }, [searchQuery, selectedFamily, selectedHabitat]);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-olive mb-4 block">Species Database</span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Explore the <br /> <span className="italic">Diversity</span>
            </h2>
          </div>
          <p className="text-brand-ink/60 max-w-sm text-lg italic">
            Browse sample butterfly species, their scientific classification, and the latest species identified by your model.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr_0.7fr] gap-4 mb-10">
          <label className="flex items-center gap-3 rounded-[1.6rem] border border-brand-ink/10 px-5 py-4 bg-brand-cream/50">
            <Search className="w-5 h-5 text-brand-olive" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              type="text"
              placeholder="Search by species, family, classification, or habitat"
              className="w-full bg-transparent outline-none text-sm"
            />
          </label>

          <select
            value={selectedFamily}
            onChange={(event) => setSelectedFamily(event.target.value)}
            className="rounded-[1.6rem] border border-brand-ink/10 px-5 py-4 bg-brand-cream/50 text-sm outline-none"
          >
            {familyOptions.map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>

          <select
            value={selectedHabitat}
            onChange={(event) => setSelectedHabitat(event.target.value)}
            className="rounded-[1.6rem] border border-brand-ink/10 px-5 py-4 bg-brand-cream/50 text-sm outline-none"
          >
            {habitatOptions.map((habitat) => (
              <option key={habitat} value={habitat}>
                {habitat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredButterflies.map((butterfly, idx) => (
            <motion.article
              key={butterfly.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 ${butterfly.color} relative`}>
                <img
                  src={butterfly.image}
                  alt={butterfly.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-olive/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="bg-white/90 text-brand-ink px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {butterfly.classification}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-1">{butterfly.name}</h3>
              <p className="text-brand-ink/40 italic text-sm mb-3">{butterfly.scientific}</p>
              <div className="space-y-1 text-sm text-brand-ink/60">
                <p><span className="font-semibold text-brand-ink">Family:</span> {butterfly.family}</p>
                <p><span className="font-semibold text-brand-ink">Habitat:</span> {butterfly.habitat}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredButterflies.length === 0 && (
          <div className="mt-8 rounded-[2rem] border border-dashed border-brand-ink/10 bg-brand-cream/50 px-8 py-10 text-center">
            <h3 className="text-2xl font-serif mb-2">No butterflies matched your filters</h3>
            <p className="text-brand-ink/50">
              Try a different family, habitat, or search phrase to explore the species database.
            </p>
          </div>
        )}

        <div className="mt-20 grid lg:grid-cols-[1.25fr_0.75fr] gap-8">
          <div className="p-10 bg-brand-cream rounded-[3rem]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-olive/10 flex items-center justify-center">
                <Clock3 className="w-6 h-6 text-brand-olive" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-brand-olive">Recent Butterfly Search</p>
                <h3 className="text-3xl font-serif">Latest Model Identification</h3>
              </div>
            </div>

            {recentButterfly ? (
              <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
                <div className="aspect-square rounded-[2rem] overflow-hidden bg-white">
                  {recentButterfly.uploadedImageUrl ? (
                    <img
                      src={recentButterfly.uploadedImageUrl}
                      alt={recentButterfly.commonName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-olive/10">
                      <Bug className="w-16 h-16 text-brand-olive/50" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-brand-olive mb-2">Most Recent Result</p>
                    <h4 className="text-4xl font-serif">{recentButterfly.commonName}</h4>
                    <p className="italic text-brand-ink/50">{recentButterfly.scientificName}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white px-4 py-4">
                      <p className="text-[10px] uppercase tracking-wider text-brand-ink/40 font-bold mb-1">Family</p>
                      <p className="font-medium">{recentButterfly.family}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-4">
                      <p className="text-[10px] uppercase tracking-wider text-brand-ink/40 font-bold mb-1">Confidence</p>
                      <p className="font-medium">{recentButterfly.confidence.toFixed(2)}%</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-4 sm:col-span-2">
                      <p className="text-[10px] uppercase tracking-wider text-brand-ink/40 font-bold mb-1">Conservation Status</p>
                      <p className="font-medium">{recentButterfly.conservationStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-brand-ink/10 border-dashed p-10 text-center bg-white/60">
                <Sparkles className="w-10 h-10 text-brand-olive/50 mx-auto mb-4" />
                <h4 className="text-2xl font-serif mb-2">No recent butterfly searched yet</h4>
                <p className="text-brand-ink/50 max-w-xl mx-auto">
                  Classify a butterfly from the upload section above and the latest result will appear here with its species information and confidence.
                </p>
              </div>
            )}
          </div>

          <div className="p-10 bg-brand-olive text-white rounded-[3rem]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-white/60">Project Snapshot</p>
                <h3 className="text-3xl font-serif">Classification Overview</h3>
              </div>
            </div>

            <div className="space-y-6 text-white/80">
              <p>
                This gallery is now focused on butterfly species knowledge: sample species cards, taxonomy details, and the most recent prediction made by your classifier.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-serif">6,499</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/50">Training Images</p>
                </div>
                <div>
                  <p className="text-3xl font-serif">75</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/50">Classes</p>
                </div>
                <div>
                  <p className="text-3xl font-serif">VGG16</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-white/50">Classifier</p>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Use this section during your presentation to show both the curated species database view and the latest live result from your trained transfer-learning model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
