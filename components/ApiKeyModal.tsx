
import React, { useState } from 'react';

interface ApiKeyModalProps {
    onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSave = () => {
        if (apiKey.trim()) {
            onSave(apiKey.trim());
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Fondo borroso oscuro */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

            <div className="relative bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.3)] w-full max-w-md overflow-hidden ring-1 ring-white/10 transform transition-all">
                {/* Header Decorativo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3">Configuración Inicial</h2>
                    <p className="text-indigo-200/70 mb-8 text-sm leading-relaxed">
                        Tu llave personal para acceder al estudio. Se almacena localmente en tu dispositivo.
                    </p>
                    
                    <div className="mb-6">
                        <label htmlFor="api-key-input" className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2 ml-1">
                            Tu API Key de Google Gemini
                        </label>
                        <div className="relative group">
                            <input
                                id="api-key-input"
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full p-4 bg-black/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white placeholder-gray-600 outline-none text-sm font-mono shadow-inner group-hover:border-white/20"
                                placeholder="Ej: AIzaSy..."
                            />
                            <div className="absolute inset-0 rounded-xl ring-1 ring-white/5 pointer-events-none"></div>
                        </div>
                    </div>

                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/10"
                    >
                        <span>Obtener clave gratuita</span>
                        <svg className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>

                    <button
                        onClick={handleSave}
                        disabled={!apiKey.trim()}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Guardar y Continuar
                    </button>
                </div>
            </div>
        </div>
    );
};
