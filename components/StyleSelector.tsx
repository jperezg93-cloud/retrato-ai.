
import React from 'react';
import { STYLES } from '../constants';

interface StyleSelectorProps {
    selectedStyle: string;
    onStyleChange: (style: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
    return (
        <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">
                Estilo Visual
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STYLES.map(styleObj => {
                    const isSelected = selectedStyle === styleObj.name;
                    return (
                        <button
                            key={styleObj.name}
                            onClick={() => onStyleChange(styleObj.name)}
                            className={`p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden group border backdrop-blur-md
                                ${isSelected 
                                    ? 'bg-indigo-600/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.25)]' 
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                }`}
                        >
                            {/* Gradient Background for Selected */}
                            {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none"></div>}
                            
                            {/* Glowing orb for effect */}
                            {isSelected && <div className="absolute -top-10 -right-10 w-20 h-20 bg-indigo-500/20 blur-xl rounded-full"></div>}

                            <h4 className={`font-bold text-sm relative z-10 transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                {styleObj.name}
                            </h4>
                            <p className={`text-[10px] leading-tight mt-2 relative z-10 transition-colors ${isSelected ? 'text-indigo-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
                                {styleObj.description}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
