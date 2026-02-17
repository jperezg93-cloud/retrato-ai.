
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { EditIcon } from './icons/EditIcon';

interface GeneratedResult {
    url: string;
    label: string;
    style: string;
}

interface GeneratedImageDisplayProps {
    generatedImages: GeneratedResult[];
    isLoading: boolean;
    onEdit: (index: number, url: string) => void;
    loadingMessage?: string;
}

const SkeletonLoader: React.FC<{ count: number }> = ({ count }) => (
    <>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer transform -skew-x-12"></div>
                <div className="aspect-[9/16] bg-black/20 rounded-xl mb-4"></div>
                <div className="h-6 bg-white/5 rounded-full w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-white/5 rounded-full w-1/2 mx-auto"></div>
            </div>
        ))}
    </>
);

export const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ generatedImages, isLoading, onEdit, loadingMessage }) => {
    
    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center gap-6">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                    <SkeletonLoader count={2} />
                </div>
                {loadingMessage && (
                    <div className="bg-indigo-500/10 border border-indigo-500/20 px-6 py-2 rounded-full backdrop-blur-md">
                         <p className="text-indigo-300 text-sm font-medium animate-pulse">{loadingMessage}</p>
                    </div>
                )}
            </div>
        );
    }
    
    if (generatedImages.length === 0) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center text-center p-8 bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl border-dashed">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </div>
                <p className="text-gray-400 font-medium">Tus retratos aparecerán aquí</p>
                <p className="text-gray-600 text-sm mt-1">Sube las fotos y selecciona un estilo para empezar.</p>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center animate-fadeIn">
            {generatedImages.map((image, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl w-full max-w-md group hover:border-indigo-500/30 transition-all duration-300">
                    <div className="relative overflow-hidden rounded-2xl">
                        <img src={image.url} alt={image.label} className="w-full aspect-[9/16] object-cover transition-transform duration-700 group-hover:scale-105" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8 gap-4">
                            <a 
                                href={image.url} 
                                download={`${image.label.replace(/\s+/g, '_')}-${image.style}.png`}
                                title="Descargar"
                                className="p-4 bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-600/40 hover:bg-indigo-500 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            >
                                <DownloadIcon className="w-6 h-6" />
                            </a>
                            <button 
                                onClick={() => onEdit(index, image.url)} 
                                title="Editar (Próximamente)"
                                disabled={true} 
                                className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 cursor-not-allowed transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                            >
                                <EditIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="font-bold text-white text-lg">{image.label}</p>
                        <p className="text-indigo-300/70 text-sm font-medium tracking-wide uppercase">{image.style}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
