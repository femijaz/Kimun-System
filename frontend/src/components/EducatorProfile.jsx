import React, { useState } from 'react';

// Íconos con imágenes
import perfilIcon from '../recursos/iconos/perfil.png';
import calendarioIcon from '../recursos/iconos/calendario.png';
import hogarIcon from '../recursos/iconos/hogar.png';
import checkIcon from '../recursos/iconos/cheque.png';
import atrasIcon from '../recursos/iconos/flecha.png';
import editIcon from '../recursos/iconos/editar.png';
import documentIcon from '../recursos/iconos/documentacion.png';
import medicalIcon from '../recursos/iconos/hospital.png';
import datosIcon from '../recursos/iconos/datos.png';
import cloudIcon from '../recursos/iconos/cloud.png';
import schoolIcon from '../recursos/iconos/school.png';

export default function EducatorProfile({ user, onBack, onNavigateHome, onNavigateEvents }) {
    const [scanning, setScanning] = useState(false);
    const [aiExtracted, setAiExtracted] = useState(false);

    const handleSimulatedUpload = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setAiExtracted(true);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            {/* Top App Bar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-[#fff8f5] flex justify-between items-center px-4 h-14 border-b border-[#c0c9b9]/30">
                <button 
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ffeada] active:scale-95 transition-transform"
                >
                    <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                </button>
                <div className="flex items-center absolute left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 bg-[#23661d] rounded-full flex items-center justify-center text-white font-bold text-lg leading-none">
                        Ü
                    </div>
                </div>
            </header>

            <main className="pt-20 px-4 md:px-8 max-w-3xl mx-auto space-y-6">
                {/* Critical Alert Banner */}
                <div className="p-4 bg-[#49ae39] text-white rounded-2xl flex items-center gap-3 shadow-sm">
                    <img src={checkIcon} alt="Check" className="w-6 h-6 object-contain filter brightness-0 invert" />
                    <p className="font-bold text-sm">✓ Documentación obligatoria de Dirigente al día</p>
                </div>

                {/* Personal Data Card */}
                <section className="bg-white border border-[#c0c9b9]/30 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8c52ff]"></div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                        <div className="w-24 h-24 rounded-xl bg-[#ffeada] flex-shrink-0 overflow-hidden border border-[#c0c9b9]/20 shadow-inner flex items-center justify-center text-[#8c52ff] font-bold text-3xl">
                            JR
                        </div>
                        <div className="flex-grow space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-xl font-bold text-[#2d1600]">Julián Rodríguez</h2>
                                <span className="bg-[#8c52ff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                                    ADULTO / DIRIGENTE
                                </span>
                            </div>
                            <p className="text-[#41493d] text-sm">DNI 28.452.910</p>
                            <p className="text-[#41493d] text-sm">Sección: Unidad Scout / Distrito 4</p>
                        </div>
                        <button className="absolute top-4 right-4 flex items-center gap-1.5 text-[#23661d] font-bold text-xs hover:bg-[#23661d]/5 px-3 py-1.5 rounded-full transition-colors active:scale-95">
                            <img src={editIcon} alt="Editar" className="w-4 h-4 object-contain" />
                            <span>Editar</span>
                        </button>
                    </div>
                </section>

                {/* Legajo Digital (Accordions) */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-[#41493d] px-1 uppercase tracking-widest">Legajo Digital</h3>
                    
                    {/* Accordion 1: Documentación Legal */}
                    <details className="group bg-[#fff1e7] rounded-2xl overflow-hidden border border-[#c0c9b9]/20 shadow-sm transition-all duration-300">
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-[#ffe3cc]/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#23661d]/10 flex items-center justify-center p-2">
                                    <img src={documentIcon} alt="Documentación" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#2d1600]">Documentación Legal</p>
                                    <p className="text-xs text-[#23661d]">✓ Certificado de Reincidencia / Antecedentes cargado</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-[#41493d]">expand_more</span>
                        </summary>
                        <div className="p-4 pt-0 border-t border-[#c0c9b9]/10 text-sm">
                            <div className="bg-white p-3 rounded-xl flex items-center justify-between border border-[#c0c9b9]/20 mt-3">
                                <span className="text-xs text-[#2d1600]">Certificado_Antecedentes_2026.pdf</span>
                                <button className="text-[#23661d] font-bold text-xs">Ver</button>
                            </div>
                        </div>
                    </details>

                    {/* Accordion 2: DDJJ Médica con IA */}
                    <details className="group bg-[#fff1e7] rounded-2xl overflow-hidden border border-[#c0c9b9]/20 shadow-sm transition-all duration-300" open>
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-[#ffe3cc]/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#23661d]/10 flex items-center justify-center p-2">
                                    <img src={medicalIcon} alt="Médico" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#2d1600]">DDJJ Médica</p>
                                    <p className="text-xs text-[#23661d]">✓ Ficha Médica de adultos vigente</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-[#41493d]">expand_more</span>
                        </summary>
                        <div className="p-4 pt-0 border-t border-[#c0c9b9]/10 space-y-4">
                            <div className="mt-4 bg-[#854912] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-3">
                                    <img src={datosIcon} alt="IA Datos" className="w-5 h-5 object-contain filter brightness-0 invert" />
                                    <h4 className="font-bold uppercase tracking-wider text-xs">Extracción Inteligente de Datos</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-[10px] opacity-70 uppercase font-bold">Obra Social / Prepaga</p>
                                        <p className="font-medium">OSDE 410</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] opacity-70 uppercase font-bold">Alergias</p>
                                        <p className="font-medium">Penicilina</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] opacity-70 uppercase font-bold">Patologías</p>
                                        <p className="font-medium">Ninguna detectada</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] opacity-70 uppercase font-bold">Medicación</p>
                                        <p className="font-medium">No declara</p>
                                    </div>
                                </div>
                            </div>

                            {scanning && (
                                <div className="bg-[#ffe3cc] border border-[#854912]/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                                    <p className="text-xs text-[#854912] font-medium italic animate-pulse">
                                        Subiendo y escaneando documento con IA...
                                    </p>
                                </div>
                            )}

                            <div className="bg-white p-4 rounded-xl space-y-3 border border-[#c0c9b9]/20">
                                <h4 className="font-bold text-sm text-[#2d1600]">Resumen DDJJ</h4>
                                <ul className="text-xs space-y-1 text-[#41493d]">
                                    <li>• Grupo sanguíneo: 0+</li>
                                    <li>• Alergias: Penicilina</li>
                                    <li>• Medicación crónica: No</li>
                                </ul>
                                <button 
                                    onClick={handleSimulatedUpload}
                                    className="w-full mt-2 py-2.5 flex items-center justify-center gap-2 bg-[#23661d] text-white font-bold text-xs rounded-xl hover:bg-[#3d8034] active:scale-95 transition-all shadow-sm"
                                >
                                    <img src={cloudIcon} alt="Cloud" className="w-4 h-4 object-contain filter brightness-0 invert" />
                                    Actualizar Documento con IA
                                </button>
                            </div>
                        </div>
                    </details>

                    {/* Accordion 3: Progresiones */}
                    <details className="group bg-[#fff1e7] rounded-2xl overflow-hidden border border-[#c0c9b9]/20 shadow-sm transition-all duration-300">
                        <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-[#ffe3cc]/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#23661d]/10 flex items-center justify-center p-2">
                                    <img src={schoolIcon} alt="School" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-[#2d1600]">Mis Progresiones</p>
                                    <p className="text-xs text-[#41493d]">Seguimiento de formación de adultos</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-[#41493d]">expand_more</span>
                        </summary>
                        <div className="p-4 pt-0 border-t border-[#c0c9b9]/10">
                            <div className="space-y-4 py-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#23661d]"></div>
                                    <div className="flex-grow">
                                        <p className="text-xs font-bold text-[#2d1600]">Nivel 1: Introducción al Movimiento</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#23661d]">COMPLETO</span>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </main>

            {/* Global Footer Navigation */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#ffeada] rounded-t-2xl shadow-lg border-t border-[#c0c9b9]/20 h-16">
                <button onClick={onNavigateHome} className="flex flex-col items-center justify-center text-[#41493d] px-6">
                    <img src={hogarIcon} alt="Home" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button onClick={onNavigateEvents} className="flex flex-col items-center justify-center text-[#41493d] px-6">
                    <img src={calendarioIcon} alt="Eventos" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-medium">Eventos</span>
                </button>
                <button className="flex flex-col items-center justify-center text-[#23661d] px-6 relative">
                    <img src={perfilIcon} alt="Perfil" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-bold">Mi perfil</span>
                </button>
            </nav>
        </div>
    );
}