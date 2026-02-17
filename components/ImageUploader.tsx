
import React, { useState, useRef, useEffect } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { resizeImage } from '../utils/imageUtils';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ImageUploaderProps {
    label: string;
    onImageUpload: (base64: string) => void;
    image: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onImageUpload, image }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreview(image);
        setIsSuccess(!!image);
    }, [image]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setIsSuccess(false);
            setPreview(null);
            try {
                const resizedImageBase64 = await resizeImage(file, 1024);
                setPreview(resizedImageBase64);
                onImageUpload(resizedImageBase64);
                setIsSuccess(true);
            } catch (error) {
                console.error("Error resizing image:", error);
                setIsSuccess(false);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleBoxClick = () => {
        if (!isLoading) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="group relative">
            <h3 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isSuccess ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-600'}`}></span>
                {label}
            </h3>
            <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                disabled={isLoading}
            />
            <div
                onClick={handleBoxClick}
                className={`relative cursor-pointer overflow-hidden rounded-2xl h-48 sm:h-56 flex items-center justify-center transition-all duration-500 border backdrop-blur-sm
                ${preview 
                    ? 'border-indigo-500/50 bg-black/60 shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                } ${isLoading ? 'cursor-wait opacity-80' : ''}`}
            >
                {/* Glow Effect on Hover (Only when empty) */}
                {!preview && <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>}

                {preview && (
                     <>
                        <img src={preview} alt="Vista previa" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        
                        {isSuccess && (
                            <div className="absolute bottom-3 right-3 bg-green-500/90 text-white rounded-full p-1.5 shadow-lg shadow-green-900/50 backdrop-blur-md animate-scaleIn">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 font-medium text-xs tracking-wide transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                CAMBIAR FOTO
                             </div>
                        </div>
                    </>
                )}
                
                {!preview && isLoading && (
                     <div className="text-center text-indigo-300">
                        <SpinnerIcon className="w-10 h-10 mx-auto mb-2 animate-spin" />
                        <p className="text-xs font-medium animate-pulse tracking-wide">PROCESANDO...</p>
                    </div>
                )}
                
                {!preview && !isLoading && (
                    <div className="text-center text-gray-500 group-hover:text-indigo-200 transition-colors duration-300">
                        <div className="bg-white/5 p-4 rounded-full inline-block mb-3 border border-white/5 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-all duration-300">
                             <UploadIcon className="w-6 h-6" />
                        </div>
                        <p className="text-xs md:text-sm font-medium tracking-wide">SUBIR IMAGEN</p>
                    </div>
                )}
            </div>
        </div>
    );
};
