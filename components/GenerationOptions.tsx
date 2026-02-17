import React from 'react';

interface GenerationOptionsProps {
    numImages: number;
    setNumImages: (num: number) => void;
}

export const GenerationOptions: React.FC<GenerationOptionsProps> = ({ numImages, setNumImages }) => {
    
    const handleNumImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) {
            value = 2;
        }
        if (value < 2) {
            value = 2;
        }
        if (value > 4) {
            value = 4;
        }
        setNumImages(value);
    };

    return (
        <div className="w-full">
            <label htmlFor="num-images" className="block text-lg font-semibold mb-2 text-gray-300 text-center">
                Número de Variaciones
            </label>
            <input
                id="num-images"
                type="number"
                value={numImages}
                onChange={handleNumImagesChange}
                min="2"
                max="4"
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-gray-300 text-center"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
                Genera entre 2 y 4 imágenes a la vez, cada una con un estilo único.
            </p>
        </div>
    );
};
