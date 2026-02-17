import React from 'react';

interface VariationStrengthSelectorProps {
    strength: number;
    setStrength: (strength: number) => void;
}

export const VariationStrengthSelector: React.FC<VariationStrengthSelectorProps> = ({ strength, setStrength }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStrength(parseFloat(e.target.value));
    };

    const getLabel = (value: number) => {
        if (value <= 0.1) return 'Sutil';
        if (value <= 0.2) return 'Equilibrado';
        return 'Creativo';
    };

    return (
        <div className="w-full">
            <label htmlFor="variation-strength" className="block text-lg font-semibold mb-2 text-gray-300 text-center">
                Nivel de Variación
            </label>
            <input
                id="variation-strength"
                type="range"
                min="0.05"
                max="0.3"
                step="0.05"
                value={strength}
                onChange={handleChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Sutil</span>
                <span className="font-bold text-indigo-400">{getLabel(strength)}</span>
                <span>Creativo</span>
            </div>
             <p className="text-sm text-gray-500 mt-2 text-center">
                Controla qué tan diferentes son las imágenes entre sí.
            </p>
        </div>
    );
};
