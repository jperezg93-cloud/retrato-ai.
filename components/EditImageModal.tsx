import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SendIcon } from './icons/SendIcon';

interface EditImageModalProps {
    imageUrl: string;
    onClose: () => void;
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
}

interface EditOption {
    label: string;
    prompt: string;
}

const PREDEFINED_EDITS: EditOption[] = [
    { label: 'Más Brillante', prompt: 'Aumenta el brillo general de la imagen, que se vea más iluminada pero manteniendo un aspecto natural.' },
    { label: 'Más Contraste', prompt: 'Aumenta el contraste para que las luces sean más brillantes y las sombras más profundas, dándole más impacto.' },
    { label: 'Tonos Cálidos', prompt: 'Ajusta la temperatura de color para darle a la imagen una sensación general más cálida y acogedora.' },
    { label: 'Enfocar Detalles', prompt: 'Aplica un ligero enfoque (sharpening) para que los detalles finos como el cabello y la textura de la ropa sean más nítidos.' },
    { label: 'Desenfoque de Fondo', prompt: 'Aumenta el desenfoque del fondo (efecto bokeh) para que la pareja resalte aún más del entorno.' },
];

export const EditImageModal: React.FC<EditImageModalProps> = ({ imageUrl, onClose, onSubmit, isLoading }) => {
    const [customPrompt, setCustomPrompt] = useState('');

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customPrompt.trim()) {
            onSubmit(customPrompt.trim());
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-indigo-400">Edición de Imagen</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    <img src={imageUrl} alt="Imagen a editar" className="rounded-md w-full object-contain max-h-64 sm:max-h-80" />
                    
                    <div className="mt-6">
                        <label className="block text-lg font-semibold mb-4 text-gray-300 text-center">
                           Ajustes Rápidos
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {PREDEFINED_EDITS.map((edit) => (
                                <button
                                    key={edit.label}
                                    onClick={() => onSubmit(edit.prompt)}
                                    disabled={isLoading}
                                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-200 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-wait focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                                >
                                    {edit.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                         <label htmlFor="custom-edit" className="block text-lg font-semibold mb-4 text-gray-300 text-center">
                           O escribe tu propia instrucción
                        </label>
                        <form onSubmit={handleCustomSubmit} className="flex gap-2">
                             <input
                                id="custom-edit"
                                type="text"
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                placeholder="Ej: Cambia el color de la camisa a rojo"
                                disabled={isLoading}
                                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-300 placeholder-gray-500 disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !customPrompt.trim()}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
                            >
                                <SendIcon className="w-5 h-5"/>
                            </button>
                        </form>
                    </div>

                    {isLoading && (
                        <div className="text-center text-indigo-400 mt-4 flex items-center justify-center gap-2">
                            <SpinnerIcon className="w-5 h-5 animate-spin" />
                            <span>Aplicando edición, por favor espera...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};