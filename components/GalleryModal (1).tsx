import React from 'react';
import { Session } from '../App';
import { CloseIcon } from './icons/CloseIcon';
import { RestoreIcon } from './icons/RestoreIcon';
import { TrashIcon } from './icons/TrashIcon';

interface GalleryModalProps {
    sessions: Session[];
    onClose: () => void;
    onLoadSession: (session: Session) => void;
    onDeleteSession: (sessionId: string) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ sessions, onClose, onLoadSession, onDeleteSession }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 bg-gray-800">
                    <h2 className="text-xl font-bold text-indigo-400">Mis Sesiones Guardadas</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {sessions.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No tienes ninguna sesión guardada.</p>
                            <p className="text-sm text-gray-500">¡Genera algunas imágenes y aparecerán aquí!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sessions.map(session => (
                                <div key={session.id} className="bg-gray-900/70 rounded-lg overflow-hidden shadow-md group">
                                    <div className="relative aspect-[9/16] w-full">
                                        <img src={session.generatedImages[0].url} alt="Vista previa de la sesión" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center gap-4">
                                            <button onClick={() => onLoadSession(session)} title="Cargar Sesión" className="p-3 bg-indigo-600 rounded-full text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-200 hover:bg-indigo-500">
                                                <RestoreIcon className="w-6 h-6" />
                                            </button>
                                            <button onClick={() => onDeleteSession(session.id)} title="Eliminar Sesión" className="p-3 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-200 delay-100 hover:bg-red-500">
                                                <TrashIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 text-xs">
                                        <p className="font-semibold text-gray-300 truncate">{session.selectedStyle} - {session.selectedPose}</p>
                                        <p className="text-gray-500">{new Date(session.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};