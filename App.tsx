
import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { PoseSelector } from './components/PoseSelector';
import { GenerateButton } from './components/GenerateButton';
import { GeneratedImageDisplay } from './components/GeneratedImageDisplay';
import { ApiKeyModal } from './components/ApiKeyModal';
import { STYLES, POSES_DATA, MASTER_DIRECTIVE } from './constants';
import * as geminiService from './services/geminiService';

export interface GeneratedResult {
    url: string;
    label: string;
    style: string;
}

export interface Session {
    id: string;
    timestamp: number;
    generatedImages: GeneratedResult[];
    selectedStyle: string;
    selectedPose: string;
}

const App: React.FC = () => {
    // Estado para la API Key del usuario
    const [apiKey, setApiKey] = useState<string>('');
    const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);

    const [manImage, setManImage] = useState<string | null>(null);
    const [womanImage, setWomanImage] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0].name);
    const [selectedPose, setSelectedPose] = useState<string>(POSES_DATA[0].name);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedResult[]>([]);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    
    // Cargar API Key al inicio
    useEffect(() => {
        const storedKey = localStorage.getItem('GEMINI_API_KEY');
        if (storedKey) {
            setApiKey(storedKey);
        } else {
            setShowApiKeyModal(true);
        }
    }, []);

    const handleSaveApiKey = (key: string) => {
        localStorage.setItem('GEMINI_API_KEY', key);
        setApiKey(key);
        setShowApiKeyModal(false);
    };

    const isGenerateDisabled = !manImage || !womanImage || !apiKey;

    const executeGeneration = async () => {
        if (isGenerateDisabled) {
            if (!apiKey) setShowApiKeyModal(true);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setGeneratedImages([]);
        
        const poseData = POSES_DATA.find(p => p.name === selectedPose);
        if (!poseData) {
            setError("Error interno: Pose seleccionada no encontrada.");
            setIsLoading(false);
            return;
        }

        const newImages: GeneratedResult[] = [];
        const errors: string[] = [];

        try {
            const promptTemplate = (styleDesc: string) => `${MASTER_DIRECTIVE}\n\n--- ESTILO VISUAL ---\n${styleDesc}\n\n--- POSE ESPECÍFICA ---\n${poseData.description}`;

            const getVariationStyle = (styleName: string): { name: string, description: string } => {
                let variationName = '';
                switch (styleName) {
                    case 'Natural': variationName = 'Ultra Natural'; break;
                    case 'Ultrarealista': variationName = 'Hiperrealista'; break;
                    case 'FLUX': variationName = 'Flux 2.0 Natural'; break;
                    case 'Profesional': variationName = 'Clave Baja'; break;
                    default: variationName = 'Ultra Natural'; 
                }
                const originalStyle = STYLES.find(s => s.name === styleName);
                return { name: variationName, description: originalStyle?.description || STYLES[0].description };
            };

            const mainStyle = STYLES.find(s => s.name === selectedStyle);
            if (!mainStyle) throw new Error("Estilo principal no encontrado.");

            const variationStyle = getVariationStyle(mainStyle.name);
            
            const mainPrompt = promptTemplate(mainStyle.description);
            const variationPrompt = promptTemplate(variationStyle.description);

            // Generar Imagen Principal usando la apiKey del estado
            try {
                setLoadingMessage(`1/2: Generando imagen principal (${mainStyle.name})...`);
                const mainResult = await geminiService.generateImage(mainPrompt, manImage!, womanImage!, apiKey);
                newImages.push({ url: mainResult, label: `Resultado Principal`, style: mainStyle.name });
            } catch (err: any) {
                console.error("Error generando imagen principal:", err);
                errors.push(`- Imagen Principal: ${err.message}`);
            }

            // Generar Variación
            if (womanImage && manImage) {
                try {
                    setLoadingMessage(`2/2: Creando variación (${variationStyle.name})...`);
                    const variationResult = await geminiService.generateImage(variationPrompt, manImage, womanImage, apiKey);
                    newImages.push({ url: variationResult, label: `Variación`, style: variationStyle.name });
                } catch (err: any) {
                    console.error("Error generando variacion:", err);
                    // No bloqueamos si falla la segunda
                }
            }
            
            setGeneratedImages(newImages);

            if (errors.length > 0) {
                let finalError = `Errores:\n${errors.join('\n')}`;
                if (finalError.toLowerCase().includes('safety')) {
                    finalError += `\n\nIntenta con otra pose o estilo menos complejo.`;
                }
                setError(finalError);
            }
            if (newImages.length === 0 && errors.length > 0) {
                 setError(`No se pudo generar ninguna imagen.\n${errors.join('\n')}`);
            }

        } catch (err: any) {
            console.error("Error general:", err);
            setError(`Error inesperado: ${err.message}`);
        } finally {
            setIsLoading(false);
            setLoadingMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-black text-gray-200 font-sans selection:bg-indigo-500 selection:text-white pb-20 lg:pb-0">
            
            {showApiKeyModal && <ApiKeyModal onSave={handleSaveApiKey} />}

            <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
                
                {/* Header Glassmorphism */}
                <header className="text-center mb-8 pb-6 border-b border-white/10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-indigo-500/20 blur-[90px] rounded-full pointer-events-none"></div>
                    <h1 className="relative text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        RETRATO<span className="text-white/80">.AI</span>
                    </h1>
                    <p className="mt-2 text-indigo-200/60 font-light tracking-widest uppercase text-xs md:text-sm">Estudio Fotográfico Virtual</p>
                    
                    <button 
                        onClick={() => setShowApiKeyModal(true)}
                        className="mt-4 md:absolute md:top-0 md:right-0 md:mt-0 text-[10px] md:text-xs text-indigo-400/50 hover:text-indigo-300 transition-colors uppercase tracking-wider border border-white/5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10"
                    >
                        {apiKey ? 'Configuración' : 'Configurar Key'}
                    </button>
                </header>
                
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Columna Izquierda: Controles (Glassmorphism) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        {/* Panel de Subida */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                           <ImageUploader label="Hombre" onImageUpload={setManImage} image={manImage} />
                           <ImageUploader label="Mujer" onImageUpload={setWomanImage} image={womanImage} />
                        </div>

                         {/* Panel de Configuración */}
                         <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ring-1 ring-white/5">
                            <div className="space-y-6 md:space-y-8">
                                <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                <PoseSelector selectedPose={selectedPose} onPoseChange={setSelectedPose} />
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Generación y Resultados */}
                    <div className="lg:col-span-7 flex flex-col items-center gap-6 lg:mt-0">
                         
                         {/* Área de Botón Flotante en Móvil (Sticky) / Fijo en Desktop */}
                         <div className="w-full sticky top-4 z-30 flex justify-center">
                             <div className="w-full max-w-md shadow-2xl rounded-2xl">
                                <GenerateButton onClick={executeGeneration} isLoading={isLoading} disabled={isGenerateDisabled} />
                             </div>
                         </div>

                          {error && (
                            <div className="w-full bg-red-500/10 backdrop-blur-md border border-red-500/50 text-red-200 px-6 py-4 rounded-xl text-center shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-fadeIn">
                                <p className="font-bold mb-1">⚠️ Error de Generación</p>
                                <p className="text-sm opacity-80 whitespace-pre-line">{error}</p>
                            </div>
                        )}

                        <GeneratedImageDisplay 
                            generatedImages={generatedImages} 
                            isLoading={isLoading}
                            onEdit={() => {}} 
                            loadingMessage={loadingMessage}
                        />
                    </div>
                </main>

                 <footer className="text-center mt-12 pt-8 border-t border-white/5 text-gray-500/50 text-xs md:text-sm pb-8">
                     <p>Powered by Google Gemini 2.5 • PWA Ready</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
