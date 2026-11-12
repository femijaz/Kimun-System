import React from 'react';

// Íconos con imágenes
import hogarIcon from '../recursos/iconos/hogar.png';
import calendarioIcon from '../recursos/iconos/calendario.png';
import perfilIcon from '../recursos/iconos/perfil.png';
import atrasIcon from '../recursos/iconos/flecha.png';
import ubicacionIcon from '../recursos/iconos/ubicacion.png';

export default function Events({ onNavigateHome, onNavigateProfile, onBack }) {
    const eventosLista = [
        {
            id: 1,
            dia: "15",
            mes: "SAB",
            titulo: "Campamento de invierno 2026",
            lugar: "Capilla de Buffo, Unquillo",
            rama: "Todas las ramas",
            colorRama: "bg-[#23661d] text-white"
        },
        {
            id: 2,
            dia: "22",
            mes: "SAB",
            titulo: "Promesa Scout Distrital",
            lugar: "Parque San Martín",
            rama: "Unidad y Caminantes",
            colorRama: "bg-[#7ed957] text-[#2d1600]"
        },
        {
            id: 3,
            dia: "05",
            mes: "DOM",
            titulo: "Jornada de Servicio Comunitario",
            lugar: "Plaza Central",
            rama: "Rovers y Adultos",
            colorRama: "bg-[#8c52ff] text-white"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            {/* Top Bar */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#fff8f5]/80 shadow-sm flex justify-between items-center h-14 px-4 md:px-8">
                {onBack ? (
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ffeada]">
                        <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                    </button>
                ) : <div className="w-10"></div>}
                
                <div className="w-11 h-11 rounded-full border-2 border-[#23661d] flex items-center justify-center text-[#23661d] font-bold text-lg bg-[#e6ffdb] mx-auto">
                    <span className="mt-[-2px]">ü</span>
                </div>
                <div className="w-10"></div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 px-4 md:px-8 max-w-[1280px] mx-auto">
                <header className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-8 bg-[#3d8034] rounded-full"></div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#2d1600] tracking-tight">Próximos Eventos</h1>
                    </div>
                    <p className="text-sm text-[#41493d]">Agenda oficial de actividades del Grupo Scout Perito Moreno</p>
                </header>

                <div className="space-y-4">
                    {eventosLista.map((evento) => (
                        <div 
                            key={evento.id}
                            className="bg-[#fff1e7] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-[#c0c9b9]/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-white rounded-xl w-14 h-14 flex flex-col items-center justify-center border border-[#c0c9b9]/30 shadow-sm flex-shrink-0">
                                    <span className="text-[10px] font-bold text-[#23661d] uppercase">{evento.mes}</span>
                                    <span className="text-xl font-bold text-[#2d1600] leading-none">{evento.dia}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base text-[#854912]">{evento.titulo}</h3>
                                    <p className="text-xs text-[#41493d] mt-0.5 flex items-center gap-1.5">
                                        <img src={ubicacionIcon} alt="Ubicación" className="w-4 h-4 object-contain" />
                                        {evento.lugar}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block ${evento.colorRama}`}>
                                    {evento.rama}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl backdrop-blur-md bg-[#ffeada]/90 shadow-[0px_-4px_12px_rgba(133,73,18,0.05)] flex justify-around items-center h-16 border-t border-[#c0c9b9]/20">
                <button 
                    onClick={onNavigateHome}
                    className="flex flex-col items-center justify-center text-[#41493d] active:scale-95 transition-transform px-6"
                >
                    <img src={hogarIcon} alt="Inicio" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Home</span>
                </button>
                <button className="flex flex-col items-center justify-center text-[#3d8034] active:scale-95 transition-transform px-6">
                    <img src={calendarioIcon} alt="Eventos" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-bold mt-0.5">Eventos</span>
                </button>
                <button 
                    onClick={onNavigateProfile}
                    className="flex flex-col items-center justify-center text-[#41493d] active:scale-95 transition-transform px-6"
                >
                    <img src={perfilIcon} alt="Mi Perfil" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Mi perfil</span>
                </button>
            </nav>
        </div>
    );
}