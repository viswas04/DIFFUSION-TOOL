import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { OptionsPanel } from './components/OptionsPanel';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateImage } from './services/geminiService';
import { AspectRatio, ImageMetadata, ImageQuality } from './types';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<ImageQuality>('1080p');
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);

  const aspectRatio = useMemo<AspectRatio>(() => {
    if (quality === '480p') return '4:3';
    // All other qualities are 16:9
    return '16:9';
  }, [quality]);

  const getImageMetadata = useCallback((dataUrl: string, ratio: AspectRatio): Promise<ImageMetadata> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const base64 = dataUrl.split(',')[1];
        if (!base64) {
          return reject(new Error("Invalid image data URL"));
        }
        
        const sizeInBytes = atob(base64).length;
        const sizeKB = (sizeInBytes / 1024).toFixed(1);

        resolve({
          resolution: `${img.naturalWidth} x ${img.naturalHeight}`,
          size: `${sizeKB} KB`,
          ratio: ratio,
        });
      };
      img.onerror = (err) => {
        console.error("Error loading image for metadata:", err);
        reject(new Error("Could not load image to retrieve metadata."));
      };
      img.src = dataUrl;
    });
  }, []);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setImageMetadata(null);

    try {
      const generatedImageUrl = await generateImage(prompt, aspectRatio);
      setImageUrl(generatedImageUrl);
      const metadata = await getImageMetadata(generatedImageUrl, aspectRatio);
      setImageMetadata(metadata);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, getImageMetadata]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 xl:w-1/5">
          <OptionsPanel 
            selectedQuality={quality}
            onQualityChange={setQuality}
            isDisabled={isLoading}
          />
        </div>
        <div className="flex-grow flex flex-col gap-4">
          <ImageDisplay imageUrl={imageUrl} isLoading={isLoading} aspectRatio={aspectRatio} metadata={imageMetadata} />
          <div className="mt-auto">
            {error && <ErrorDisplay message={error} />}
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              onGenerate={handleGenerateImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Built for creativity.</p>
      </footer>
    </div>
  );
}

export default App;