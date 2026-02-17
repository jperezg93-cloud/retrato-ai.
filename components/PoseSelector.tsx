
import React from 'react';
import { POSES_DATA } from '../constants';
import { AbrazoDeOsoIcon } from './icons/poses/AbrazoDeOsoIcon';
import { RendicionApasionadaIcon } from './icons/poses/RendicionApasionadaIcon';
import { ExtasisSugerenteIcon } from './icons/poses/ExtasisSugerenteIcon';
import { FusionDePielIcon } from './icons/poses/FusionDePielIcon';
import { AbrazoProtectorIcon } from './icons/poses/AbrazoProtectorIcon';
import { OrangeImplicitoIcon } from './icons/poses/OrangeImplicitoIcon';

interface PoseSelectorProps {
    selectedPose: string;
    onPoseChange: (pose: string) => void;
}

const POSE_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'Abrazo Protector': AbrazoProtectorIcon,
    'Rendición Apasionada': RendicionApasionadaIcon,
    'Éxtasis Sugerente': ExtasisSugerenteIcon,
    'Fusión de Piel': FusionDePielIcon,
    'Abrazo de Oso': AbrazoDeOsoIcon,
    'Orange Implícito': OrangeImplicitoIcon,
};

export const PoseSelector: React.FC<PoseSelectorProps> = ({ selectedPose, onPoseChange }) => {
    return (
        <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 pl-1">
                Pose & Composición
            </label>
            <div className="grid grid-cols-2 gap-3 mb-2">
                {POSES_DATA.map(pose => {
                    const isSelected = selectedPose === pose.name;
                    const IconComponent = POSE_ICONS[pose.name];

                    return (
                        <button
                            key={pose.name}
                            onClick={() => onPoseChange(pose.name)}
                            className={`relative h-28 sm:h-32 rounded-xl transition-all duration-300 overflow-hidden group border backdrop-blur-md
                                ${isSelected 
                                    ? 'bg-purple-600/20 border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.25)] scale-[1.02]' 
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 hover:scale-[1.01]'
                                }`}
                        >
                            {/* Icono de fondo gigante difuminado */}
                            {IconComponent && (
                                <div className={`absolute -right-6 -bottom-6 opacity-[0.15] transform scale-[3] rotate-12 transition-all duration-500 ${isSelected ? 'text-purple-300 opacity-[0.25]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                    <IconComponent className="w-16 h-16" />
                                </div>
                            )}

                            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 z-10">
                                <div className={`mb-3 p-3 rounded-2xl transition-all duration-300 ${isSelected ? 'bg-purple-500 text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                                    {IconComponent ? (
                                        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                                    ) : (
                                        <span className="text-xs font-bold">{pose.name.substring(0, 2)}</span>
                                    )}
                                </div>
                                <span className={`text-xs sm:text-sm font-bold text-center leading-tight transition-colors ${isSelected ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                    {pose.name}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
