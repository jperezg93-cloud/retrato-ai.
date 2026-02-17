
import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface GenerateButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`
                group relative w-full py-5 rounded-2xl font-bold text-lg tracking-wide overflow-hidden transition-all duration-300
                ${disabled 
                    ? 'bg-gray-800/50 backdrop-blur-sm border border-white/5 text-gray-500 cursor-not-allowed' 
                    : 'text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_50px_rgba(79,70,229,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                }
            `}
        >
            {/* Background Gradient & Animation */}
            {!disabled && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x bg-[length:200%_auto]"></div>
            )}
            
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none"></div>

            <div className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                    <>
                        <SpinnerIcon className="animate-spin h-6 w-6 text-white drop-shadow-md" />
                        <span className="animate-pulse drop-shadow-md">Renderizando...</span>
                    </>
                ) : (
                    <>
                        <MagicWandIcon className={`w-6 h-6 ${disabled ? 'text-gray-500' : 'text-white drop-shadow-md'}`} />
                        <span className={disabled ? '' : 'drop-shadow-md'}>
                            {disabled ? 'Faltan Datos' : 'CREAR RETRATO'}
                        </span>
                    </>
                )}
            </div>
        </button>
    );
};
