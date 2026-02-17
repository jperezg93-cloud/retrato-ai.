
import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    styleName: string;
    poseName: string;
    poseDescription?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, styleName, poseName, poseDescription }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg border border-gray-700 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">¿Confirmar Generación?</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto text-gray-300 space-y-4">
                    <p>Estás a punto de enviar la siguiente orden al sistema:</p>
                    
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600 space-y-3">
                        <div>
                            <span className="text-indigo-400 text-xs font-bold uppercase">Estilo Visual</span>
                            <p className="text-white font-medium">{styleName}</p>
                        </div>
                        <div>
                            <span className="text-indigo-400 text-xs font-bold uppercase">Pose Seleccionada</span>
                            <p className="text-white font-medium">{poseName}</p>
                        </div>
                        {poseDescription && (
                            <div>
                                <span className="text-indigo-400 text-xs font-bold uppercase">Instrucción de Pose</span>
                                <p className="text-gray-400 text-sm italic mt-1">"{poseDescription}"</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-amber-900/20 border border-amber-700/50 p-3 rounded text-sm text-amber-200/80">
                        ⚠️ <strong>Aviso:</strong> El contenido generado seguirá las instrucciones explícitas de la pose seleccionada sin censura.
                    </div>
                </div>

                <div className="p-6 border-t border-gray-700 flex gap-4 justify-end bg-gray-800 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-md text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-900/30 transition-all transform hover:scale-105"
                    >
                        SÍ, GENERAR IMAGEN
                    </button>
                </div>
            </div>
        </div>
    );
};
