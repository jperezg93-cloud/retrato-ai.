import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface SurpriseMeButtonProps {
    onClick: () => void;
}

export const SurpriseMeButton: React.FC<SurpriseMeButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center justify-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-full shadow-sm text-indigo-300 bg-indigo-900/50 hover:bg-indigo-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all transform hover:scale-105"
            title="Seleccionar estilo y pose al azar"
        >
            <SparklesIcon className="w-5 h-5 mr-2" />
            Sorpréndeme
        </button>
    );
};
