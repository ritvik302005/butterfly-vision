import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, Loader2, Bug, Info, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';

interface TopPrediction {
  label: string;
  commonName: string;
  confidence: number;
}

interface DistributionPoint {
  name: string;
  lat: number;
  lng: number;
}

interface ButterflyInfo {
  commonName: string;
  scientificName: string;
  family: string;
  description: string;
  habitat: string;
  conservationStatus: string;
  funFact: string;
  distributionSummary?: string;
  distributionPoints?: DistributionPoint[];
  confidence: number;
  topPredictions: TopPrediction[];
  message?: string;
  uploadedImageUrl?: string;
  gradcamImageUrl?: string | null;
  error?: string | null;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const HISTORY_STORAGE_KEY = 'butterfly:history';

function DistributionMap({ points = [] }: { points?: DistributionPoint[] }) {
  const mapPoints = points.map((point) => {
    const left = `${((point.lng + 180) / 360) * 100}%`;
    const top = `${((90 - point.lat) / 180) * 100}%`;
    return { ...point, left, top };
  });

  return (
    <div className="rounded-3xl border border-brand-ink/5 overflow-hidden bg-[#eef2e6]">
      <div className="relative aspect-[16/9] bg-[radial-gradient(circle_at_top_left,_rgba(90,90,64,0.12),_transparent_35%),linear-gradient(180deg,#eff4ea_0%,#dbe8d6_100%)]">
        <div className="absolute inset-4 rounded-[1.5rem] border border-white/60 bg-[linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
        <div className="absolute left-[7%] top-[18%] h-[28%] w-[18%] rounded-[45%] bg-brand-olive/14 blur-[2px]" />
        <div className="absolute left-[18%] top-[52%] h-[26%] w-[12%] rounded-[45%] bg-brand-olive/12 blur-[2px]" />
        <div className="absolute left-[42%] top-[18%] h-[26%] w-[12%] rounded-[45%] bg-brand-olive/12 blur-[2px]" />
        <div className="absolute left-[41%] top-[47%] h-[28%] w-[14%] rounded-[45%] bg-brand-olive/10 blur-[2px]" />
        <div className="absolute left-[56%] top-[20%] h-[22%] w-[24%] rounded-[45%] bg-brand-olive/12 blur-[2px]" />
        <div className="absolute left-[67%] top-[54%] h-[14%] w-[12%] rounded-[45%] bg-brand-olive/10 blur-[2px]" />
        <div className="absolute left-[80%] top-[66%] h-[12%] w-[8%] rounded-[45%] bg-brand-olive/12 blur-[2px]" />

        <span className="absolute left-[10%] top-[14%] text-[10px] uppercase tracking-[0.25em] font-bold text-brand-ink/45">North America</span>
        <span className="absolute left-[18%] top-[78%] text-[10px] uppercase tracking-[0.25em] font-bold text-brand-ink/45">South America</span>
        <span className="absolute left-[45%] top-[14%] text-[10px] uppercase tracking-[0.25em] font-bold text-brand-ink/45">Europe</span>
        <span className="absolute left-[44%] top-[77%] text-[10px] uppercase tracking-[0.25em] font-bold text-brand-ink/45">Africa</span>
        <span className="absolute left-[67%] top-[16%] text-[10px] uppercase tracking-[0.25em] font-bold text-brand-ink/45">Asia</span>
        <span className="absolute left-[79%] top-[82%] text-[10px] uppercase tracking-[0.25em] font-bold text-brand-ink/45">Australia</span>

        {mapPoints.map((point) => (
          <div
            key={`${point.name}-${point.lat}-${point.lng}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: point.left, top: point.top }}
          >
            <div className="w-4 h-4 rounded-full bg-brand-olive border-2 border-white shadow-lg shadow-brand-olive/30" />
            <div className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-brand-ink opacity-0 group-hover:opacity-100 transition-opacity shadow">
              {point.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ButterflyClassifier() {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ButterflyInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setSelectedFile(file);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false
  });

  const analyzeButterfly = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image.');
      }

      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        localStorage.setItem('butterfly:lastResult', JSON.stringify(data));
        const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || '[]');
        history.unshift({
          id: `${Date.now()}-${data.commonName}`,
          species: data.commonName,
          confidence: data.confidence,
          family: data.family,
          date: new Date().toISOString(),
          thumbnail: data.uploadedImageUrl,
          distributionSummary: data.distributionSummary
        });
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, 40)));
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#5A5A40', '#A5A58D', '#6B705C']
        });
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to analyze image. Please try again.');
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const topPredictions = useMemo(() => result?.topPredictions || [], [result]);

  return (
    <section id="classifier" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-serif mb-4">Identify a Butterfly</h2>
        <p className="text-brand-ink/60 max-w-2xl mx-auto text-lg">
          Upload a photo from the field and let the trained transfer-learning model classify the species.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={cn(
              'relative aspect-square rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group',
              isDragActive ? 'border-brand-olive bg-brand-olive/5' : 'border-brand-ink/20 hover:border-brand-olive hover:bg-brand-olive/5',
              image ? 'border-none' : ''
            )}
          >
            <input {...getInputProps()} />

            {image ? (
              <>
                <img src={image} alt="Butterfly preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-medium flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Change Image
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-brand-olive" />
                </div>
                <p className="text-xl font-serif mb-2">Drop your image here</p>
                <p className="text-sm text-brand-ink/40">or click to browse files</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={analyzeButterfly}
              disabled={!selectedFile || isAnalyzing}
              className={cn(
                'flex-1 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2',
                !selectedFile || isAnalyzing
                  ? 'bg-brand-ink/10 text-brand-ink/30 cursor-not-allowed'
                  : 'bg-brand-olive text-white hover:bg-brand-olive/90 shadow-lg shadow-brand-olive/20'
              )}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bug className="w-5 h-5" />
                  Identify Species
                </>
              )}
            </button>
            <button
              className="p-4 rounded-full border border-brand-ink/10 bg-white/70 text-brand-ink/40 cursor-not-allowed"
              title="Camera capture can be added later"
              disabled
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-red-50 text-red-600 text-sm border border-red-100"
            >
              {error}
            </motion.div>
          )}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-brand-ink/5 space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-olive mb-2 block">Species Identified</span>
                    <h3 className="text-4xl font-serif leading-tight">{result.commonName}</h3>
                    <p className="text-brand-ink/60 italic font-serif text-xl">{result.scientificName}</p>
                  </div>
                  <div className="bg-brand-olive/10 p-3 rounded-2xl">
                    <CheckCircle2 className="w-8 h-8 text-brand-olive" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-brand-cream rounded-2xl">
                    <p className="text-[10px] uppercase tracking-wider text-brand-ink/40 font-bold mb-1">Family</p>
                    <p className="font-medium">{result.family}</p>
                  </div>
                  <div className="p-4 bg-brand-cream rounded-2xl">
                    <p className="text-[10px] uppercase tracking-wider text-brand-ink/40 font-bold mb-1">Status</p>
                    <p className="font-medium">{result.conservationStatus}</p>
                  </div>
                  <div className="p-4 bg-brand-cream rounded-2xl col-span-2 md:col-span-1">
                    <p className="text-[10px] uppercase tracking-wider text-brand-ink/40 font-bold mb-1">Confidence</p>
                    <p className="font-medium">{result.confidence.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-2">
                      <Info className="w-4 h-4 text-brand-olive" /> Description
                    </h4>
                    <p className="text-brand-ink/70 leading-relaxed">{result.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Habitat</h4>
                    <p className="text-brand-ink/70 leading-relaxed">{result.habitat}</p>
                  </div>
                  <div className="p-6 bg-brand-olive/5 rounded-2xl border border-brand-olive/10">
                    <h4 className="font-serif italic text-xl mb-2 text-brand-olive">Did you know?</h4>
                    <p className="text-brand-ink/80 italic">{result.funFact}</p>
                  </div>
                </div>

                {topPredictions.length > 0 && (
                  <div className="pt-2 space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider mb-3">
                      <Sparkles className="w-4 h-4 text-brand-olive" /> Top Predictions
                    </h4>
                    <div className="space-y-3">
                      {topPredictions.map((item) => (
                        <div key={item.label} className="rounded-2xl bg-brand-cream px-4 py-4">
                          <div className="flex items-center justify-between gap-4 mb-3">
                            <div>
                              <p className="font-medium">{item.commonName}</p>
                              <p className="text-xs uppercase tracking-wider text-brand-ink/40">{item.label}</p>
                            </div>
                            <p className="font-semibold text-brand-olive">{item.confidence.toFixed(2)}%</p>
                          </div>
                          <div className="h-2.5 rounded-full bg-white/80 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-olive transition-all duration-700"
                              style={{ width: `${Math.max(6, item.confidence)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(result.uploadedImageUrl || result.gradcamImageUrl) && (
                  <div className="pt-2 space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-brand-olive" /> Model Explainability
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.uploadedImageUrl && (
                        <div className="rounded-3xl overflow-hidden border border-brand-ink/5 bg-brand-cream">
                          <img
                            src={result.uploadedImageUrl}
                            alt="Uploaded butterfly"
                            className="w-full aspect-square object-cover"
                          />
                          <div className="px-4 py-3">
                            <p className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Original Upload</p>
                          </div>
                        </div>
                      )}
                      {result.gradcamImageUrl && (
                        <div className="rounded-3xl overflow-hidden border border-brand-ink/5 bg-brand-cream">
                          <img
                            src={result.gradcamImageUrl}
                            alt="Grad-CAM heatmap"
                            className="w-full aspect-square object-cover"
                          />
                          <div className="px-4 py-3">
                            <p className="text-xs uppercase tracking-widest font-bold text-brand-ink/40">Grad-CAM Focus Map</p>
                            <p className="text-sm text-brand-ink/60 mt-1">
                              Highlights the wing regions and image features the model relied on most.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {(result.distributionSummary || (result.distributionPoints && result.distributionPoints.length > 0)) && (
                  <div className="pt-2 space-y-4">
                    <h4 className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-brand-olive" /> Species Distribution Map
                    </h4>
                    <DistributionMap points={result.distributionPoints} />
                    {result.distributionSummary && (
                      <p className="text-sm leading-relaxed text-brand-ink/60">
                        {result.distributionSummary}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-brand-ink/5 rounded-3xl"
              >
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mb-6">
                  <Bug className="w-10 h-10 text-brand-ink/20" />
                </div>
                <h3 className="text-2xl font-serif mb-2">Ready for Identification</h3>
                <p className="text-brand-ink/40 max-w-xs">
                  Upload an image to see species details, habitat information, conservation status, and top model predictions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
