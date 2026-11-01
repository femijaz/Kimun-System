import React, { useState } from 'react';

// Íconos con imágenes
import perfilIcon from '../recursos/iconos/perfil.png';
import calendarioIcon from '../recursos/iconos/calendario.png';
import hogarIcon from '../recursos/iconos/hogar.png';
import atrasIcon from '../recursos/iconos/flecha.png';
import camaraIcon from '../recursos/iconos/camara.png';
import peligroIcon from '../recursos/iconos/peligro.png';
import documentIcon from '../recursos/iconos/documentacion.png';
import medicalIcon from '../recursos/iconos/hospital.png';
import datosIcon from '../recursos/iconos/datos.png';

export default function BeneficiarioDetail({ beneficiario, onBack, onNavigateHome, onNavigateEvents, onNavigateProfile }) {
    const [openAccordion, setOpenAccordion] = useState('ddjj');
    const [scanning, setScanning] = useState(false);
    const [aiExtracted, setAiExtracted] = useState(false);

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    const handleSimulatedUpload = () => {
        setScanning(true);
        setTimeout(() => {
            setScanning(false);
            setAiExtracted(true);
        }, 2500);
    };

    const persona = beneficiario?.persona || {
        nombre: 'Mateo',
        apellido: 'Jiménez',
        documento: '45.321.908'
    };

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-14 bg-[#fff8f5] border-b border-[#c0c9b9]/30">
                <button 
                    onClick={onBack}
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#ffeada] active:scale-95 transition-transform"
                >
                    <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                </button>
                <div className="w-9 h-9 bg-[#23661d] text-white rounded-full flex items-center justify-center font-bold absolute left-1/2 -translate-x-1/2">
                    <span className="mt-[-2px]">Ü</span>
                </div>
            </header>

            <main className="pt-16 max-w-2xl mx-auto px-4">
                {/* Medical Alert Banner */}
                <section className="mt-2 -mx-4">
                    <div className="bg-[#ba1a1a] text-white px-4 py-3 flex items-center gap-3 animate-pulse">
                        <img src={peligroIcon} alt="Alerta" className="w-5 h-5 object-contain filter brightness-0 invert" />
                        <p className="text-xs font-bold uppercase tracking-wide">
                            ALERTA MÉDICA: Alergia severa a la Penicilina
                        </p>
                    </div>
                </section>

                {/* Personal Data Card */}
                <section className="mt-6">
                    <div className="bg-[#fff1e7] border border-[#c0c9b9]/20 rounded-2xl p-4 shadow-sm relative overflow-hidden border-l-4 border-l-[#ffde59]">
                        <div className="flex items-start gap-4">
                            <div className="w-20 h-20 rounded-xl bg-[#ffdcbe] flex-shrink-0 border-2 border-white overflow-hidden flex items-center justify-center text-[#874a13] font-bold text-2xl shadow-sm">
                                {persona.nombre[0]}{persona.apellido ? persona.apellido[0] : ''}
                            </div>
                            <div className="flex-grow space-y-1">
                                <h2 className="text-2xl font-bold text-[#2d1600]">
                                    {persona.nombre} {persona.apellido}
                                </h2>
                                <p className="text-sm text-[#41493d]">
                                    DNI: {persona.documento}
                                </p>
                                <div className="mt-2">
                                    <span className="bg-[#ffde59] text-[#2d1600] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                                        {beneficiario?.rama || 'Manada'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legajo Digital Section */}
                <section className="mt-8">
                    <h3 className="text-lg font-bold text-[#23661d] mb-4 px-1">Legajo Digital</h3>
                    <div className="space-y-3">
                        
                        {/* Accordion 1: Documentación Legal */}
                        <div className="bg-white border border-[#c0c9b9]/30 rounded-2xl overflow-hidden shadow-sm">
                            <button 
                                onClick={() => toggleAccordion('legal')}
                                className="w-full px-4 py-4 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#ffdad6]/50 flex items-center justify-center p-2">
                                        <img src={documentIcon} alt="Legal" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#2d1600]">Documentación Legal</h4>
                                        <p className="text-xs text-[#ba1a1a]">Faltante: Autorización de Viaje</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                            {openAccordion === 'legal' && (
                                <div className="px-4 pb-4 border-t border-[#c0c9b9]/20 pt-3 text-xs text-[#41493d]">
                                    Falta cargar la autorización de viaje firmada.
                                </div>
                            )}
                        </div>

                        {/* Accordion 2: DDJJ Médica */}
                        <div className="bg-white border border-[#c0c9b9]/30 rounded-2xl overflow-hidden shadow-sm">
                            <button 
                                onClick={() => toggleAccordion('ddjj')}
                                className="w-full px-4 py-4 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#ffb781]/30 flex items-center justify-center p-2">
                                        <img src={medicalIcon} alt="Médico" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#2d1600]">DDJJ Médica</h4>
                                        <p className="text-xs text-[#874a13]">Vence en 12 días</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">expand_more</span>
                            </button>
                            
                            {openAccordion === 'ddjj' && (
                                <div className="px-4 pb-4 border-t border-[#c0c9b9]/20 pt-4 space-y-4">
                                    <div className="bg-[#854912] text-white rounded-2xl p-4 shadow-md">
                                        <div className="flex items-center gap-2 mb-3">
                                            <img src={datosIcon} alt="IA" className="w-5 h-5 object-contain filter brightness-0 invert" />
                                            <h5 className="text-xs font-bold uppercase tracking-wider">Extracción de datos con IA</h5>
                                        </div>
                                        <div className="grid grid-cols-1 gap-y-2 text-sm">
                                            <div>
                                                <p className="text-[10px] opacity-70 uppercase font-bold">Obra Social</p>
                                                <p className="font-medium">OSDE 210</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] opacity-70 uppercase font-bold">Alergias</p>
                                                <p className="font-medium">Penicilina (Severa)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {scanning ? (
                                        <p className="text-xs text-[#854912] font-medium text-center animate-pulse">Escaneando con IA...</p>
                                    ) : (
                                        <button 
                                            onClick={handleSimulatedUpload}
                                            className="w-full py-3 bg-[#ffeada] border border-dashed border-[#874a13] text-[#874a13] font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                                        >
                                            <img src={camaraIcon} alt="Cámara" className="w-5 h-5 object-contain" />
                                            {aiExtracted ? "Re-escanear Ficha con IA" : "Escanear Ficha Física con IA"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </section>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#ffeada] rounded-t-2xl shadow-lg border-t border-[#c0c9b9]/20 h-16">
                <button onClick={onBack} className="flex flex-col items-center justify-center text-[#3d8034] px-6">
                    <img src={hogarIcon} alt="Home" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button onClick={onNavigateEvents} className="flex flex-col items-center justify-center text-[#41493d] px-6">
                    <img src={calendarioIcon} alt="Eventos" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-medium">Eventos</span>
                </button>
                <button onClick={onNavigateProfile} className="flex flex-col items-center justify-center text-[#41493d] px-6">
                    <img src={perfilIcon} alt="Perfil" className="w-6 h-6 object-contain" />
                    <span className="text-[10px] font-medium">Mi perfil</span>
                </button>
            </nav>
        </div>
    );
}