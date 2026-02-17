import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface PromptEditorProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onEnhance: () => void;
    isEnhancing: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt, onEnhance, isEnhancing }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
                <label htmlFor="prompt" className="block text-lg font-semibold text-gray-300">
                    Descripción de la Escena
                </label>
                <button
                    onClick={onEnhance}
                    disabled={isEnhancing}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                >
                    {isEnhancing ? (
                        <>
                            <SpinnerIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                            Mejorando...
                        </>
                    ) : (
                        <>
                            <MagicWandIcon className="w-5 h-5 mr-2" />
                            Mejorar con IA
                        </>
                    )}
                </button>
            </div>
            <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={12}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-300 placeholder-gray-500"
                placeholder="Describe la imagen que quieres generar..."
            />
             <p className="text-sm text-gray-500 mt-2">
                Puedes editar las instrucciones de la escena. La pose y el estilo se añadirán automáticamente.
            </p>
        </div>
    );
};
