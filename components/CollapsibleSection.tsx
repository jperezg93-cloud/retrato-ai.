import React, { useState } from 'react';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left"
                aria-expanded={isOpen}
            >
                <h2 className="text-lg font-semibold text-indigo-400">{title}</h2>
                <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="p-6 border-t border-gray-700">
                    {children}
                </div>
            </div>
        </section>
    );
};