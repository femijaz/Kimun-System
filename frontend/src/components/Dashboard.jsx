import React, { useState, useEffect } from 'react';
import { getBeneficiarios } from '../services/api';

// Íconos
import notificacionIcon from '../recursos/iconos/notificacion.png';
import calendarioIcon from '../recursos/iconos/calendario.png';
import perfilIcon from '../recursos/iconos/perfil.png';
import menuIcon from '../recursos/iconos/menu.png';
import hogarIcon from '../recursos/iconos/hogar.png';
import arbolesIcon from '../recursos/iconos/arboles.png';
import huellaIcon from '../recursos/iconos/huella.png';
import prismaticosIcon from '../recursos/iconos/prismaticos.png';
import direccionIcon from '../recursos/iconos/direccion.png';
import personasIcon from '../recursos/iconos/personas.png';
import lupaIcon from '../recursos/iconos/lupa.png';
import documentIcon from '../recursos/iconos/documentacion.png';
import medicalIcon from '../recursos/iconos/hospital.png';
import configIcon from '../recursos/iconos/configuracion.png';
import hometIcon from '../recursos/iconos/home.png';

export default function Dashboard({ user, onSelectBeneficiario, onNavigateProfile }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchScouts = async () => {
            setLoading(true);
            try {
                const data = await getBeneficiarios('', searchQuery);
                setBeneficiarios(data);
            } catch (err) {
                console.error("Error al buscar scouts:", err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchScouts();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">

            {/* Overlay para el Menú Desplegable */}
            {isDrawerOpen && (
                <div 
                    onClick={() => setIsDrawerOpen(false)}
                    className="fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300"
                />
            )}

            {/* Menú Lateral Desplegable (Drawer) */}
            <aside className={`fixed left-0 top-0 h-full w-80 bg-[#fff1e7] z-[70] transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-out shadow-2xl rounded-r-3xl flex flex-col py-6 px-4 border-r border-[#c0c9b9]/30`}>
                <div className="px-2 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full border-2 border-[#23661d] bg-[#e6ffdb] flex items-center justify-center font-bold text-[#23661d] text-lg">
                            SL
                        </div>
                        <div>
                            <h3 className="font-bold text-base text-[#23661d]">Scouter Leader</h3>
                            <p className="text-xs text-[#41493d]">Grupo Scout Kimün</p>
                        </div>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#92fb7b] text-[#037500] text-[10px] font-bold uppercase tracking-wider">
                        ADMIN MODE
                    </span>
                </div>

                <nav className="flex flex-col gap-1.5">
                    <button 
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex items-center gap-3 px-4 h-12 bg-[#92fb7b] text-[#037500] font-bold rounded-2xl active:opacity-80 transition-all text-left"
                    >
                        <img src={hometIcon} alt="Home" className="w-5 h-5 object-contain" />
                        <span className="text-sm">Home</span>
                    </button>
                    <button 
                        onClick={() => { setIsDrawerOpen(false); alert("Documentos seleccionados"); }}
                        className="flex items-center gap-3 px-4 h-12 text-[#41493d] hover:bg-[#ffeada] rounded-2xl active:opacity-80 transition-all text-left"
                    >
                        <img src={documentIcon} alt="Documentos" className="w-5 h-5 object-contain" />
                       <span className="text-sm">Documentos</span>
                    </button>
                    <button 
                        onClick={() => { setIsDrawerOpen(false); alert("Alertas de emergencias seleccionadas"); }}
                        className="flex items-center gap-3 px-4 h-12 text-[#41493d] hover:bg-[#ffeada] rounded-2xl active:opacity-80 transition-all text-left"
                    >
                        <img src={medicalIcon} alt="Emergencias" className="w-5 h-5 object-contain" />
                        <span className="text-sm">Alertas de emergencias</span>
                    </button>
                    
                    <div className="my-3 border-t border-[#c0c9b9]/30"></div>

                    <button 
                        onClick={() => { setIsDrawerOpen(false); alert("Configuración seleccionada"); }}
                        className="flex items-center gap-3 px-4 h-12 text-[#41493d] hover:bg-[#ffeada] rounded-2xl active:opacity-80 transition-all text-left"
                    >
                        <img src={configIcon} alt="Configuración" className="w-5 h-5 object-contain" />
                        <span className="text-sm">Configuración</span>
                    </button>
                </nav>
            </aside>

            {/* Top Bar */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#fff8f5]/80 shadow-sm flex justify-between items-center h-14 px-4 md:px-8">
                <button 
                    onClick={() => alert("Próximamente: Menú desplegable")}
                    className="flex items-center justify-center w-11 h-11 active:scale-95 duration-100 hover:bg-[#ffeada] transition-colors rounded-full"
                >
                    <img src={menuIcon} alt="Menú" className="w-6 h-6 object-contain" />
                </button>
                <div className="w-11 h-11 rounded-full border-2 border-[#23661d] flex items-center justify-center text-[#23661d] font-bold text-lg bg-[#e6ffdb] mx-auto">
                    <span className="mt-[-2px]">ü</span>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center justify-center w-11 h-11 active:scale-95 duration-100 hover:bg-[#ffeada] transition-colors rounded-full">
                        <img src={notificacionIcon} alt="Notificaciones" className="w-6 h-6 object-contain" />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 px-4 md:px-8 max-w-[1280px] mx-auto">
                
                {/* Welcome Hero */}
                <header className="relative overflow-hidden rounded-2xl mb-6 bg-[#fff1e7] p-6 min-h-[160px] flex flex-col justify-end border border-[#c0c9b9]/20 shadow-sm">
                    <div className="relative z-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#23661d] tracking-tight">¡Bienvenido, Scouter!</h1>
                        <p className="text-base text-[#41493d] mt-1">Sábado, 21 de Octubre</p>
                    </div>
                </header>

                {/* Tool Bar Row */}
                <section className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-8 bg-[#23661d] rounded-full"></div>
                        <h2 className="text-xl font-bold text-[#2d1600]">Gestión de Ramas</h2>
                    </div>
                    <button className="flex items-center justify-center w-11 h-11 rounded-full bg-[#ffe3cc] active:scale-95 transition-transform hover:shadow-sm">
                        <img src={calendarioIcon} alt="Calendario" className="w-6 h-6 object-contain" />
                    </button>
                </section>

                {/* Search Component */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <img src={lupaIcon} alt="Buscar" className="w-5 h-5 object-contain opacity-60" />
                    </div>
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full h-12 pl-12 pr-4 bg-white border-2 border-transparent focus:border-[#23661d] focus:ring-0 rounded-full text-base shadow-[0px_4px_12px_rgba(133,73,18,0.05)] transition-all outline-none" 
                        placeholder="Buscar scout por nombre o apellido..." 
                    />
                </div>

                {/* Resultados de Búsqueda */}
                {searchQuery.trim() !== '' && (
                    <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm border border-[#c0c9b9]/30">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#41493d] mb-3">Resultados de la búsqueda</h3>
                        {loading ? (
                            <p className="text-sm text-[#41493d] italic py-2">Buscando en la base de datos...</p>
                        ) : beneficiarios.length > 0 ? (
                            <div className="space-y-2">
                                {beneficiarios.map((b) => (
                                    <div 
                                        key={b.id}
                                        onClick={() => onSelectBeneficiario(b)}
                                        className="flex items-center justify-between p-3 rounded-xl bg-[#fff8f5] hover:bg-[#ffeada] cursor-pointer transition-colors border border-[#c0c9b9]/20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src={perfilIcon} alt="Perfil Scout" className="w-8 h-8 object-contain" />
                                            <div>
                                                <p className="font-bold text-[#874a13]">{b.persona.nombre} {b.persona.apellido}</p>
                                                <p className="text-xs text-[#41493d]">Legajo: {b.legajo} — Rama: {b.rama}</p>
                                            </div>
                                        </div>
                                        <span className="text-[#717a6c] font-bold">›</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-[#41493d] py-2">No se encontraron scouts con ese nombre.</p>
                        )}
                    </div>
                )}

                {/* Bento Grid for Branches */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    
                    {/* Manada */}
                    <button className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#ffde59] shadow-sm text-left overflow-hidden aspect-[1.5/1] active:scale-95 transition-transform">
                        <div className="absolute -right-2 -top-2 opacity-20">
                            <img src={huellaIcon} alt="Huella Background" className="w-24 h-24 object-contain" />
                        </div>
                        <img src={huellaIcon} alt="Manada" className="w-8 h-8 object-contain" />
                        <div>
                            <span className="text-xl font-bold text-[#2d1600] block">Manada</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d1600]/60">7-11 años</p>
                        </div>
                    </button>

                    {/* Unidad */}
                    <button className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#7ed957] shadow-sm text-left overflow-hidden aspect-[1.5/1] active:scale-95 transition-transform">
                        <div className="absolute -right-2 -top-2 opacity-20">
                            <img src={arbolesIcon} alt="Arboles Background" className="w-24 h-24 object-contain" />
                        </div>
                        <img src={arbolesIcon} alt="Unidad" className="w-8 h-8 object-contain" />
                        <div>
                            <span className="text-xl font-bold text-[#23661d] block">Unidad</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#23661d]/60">11-14 años</p>
                        </div>
                    </button>

                    {/* Caminantes */}
                    <button className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#0cc0df] shadow-sm text-left overflow-hidden aspect-[1.5/1] active:scale-95 transition-transform">
                        <div className="absolute -right-2 -top-2 opacity-20">
                            <img src={prismaticosIcon} alt="Prismáticos Background" className="w-24 h-24 object-contain" />
                        </div>
                        <img src={prismaticosIcon} alt="Caminante" className="w-8 h-8 object-contain" />
                        <div>
                            <span className="text-xl font-bold text-white block">Caminante</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">14-17 años</p>
                        </div>
                    </button>

                    {/* Rovers */}
                    <button className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#ff3131] shadow-sm text-left overflow-hidden aspect-[1.5/1] active:scale-95 transition-transform">
                        <div className="absolute -right-2 -top-2 opacity-20">
                            <img src={direccionIcon} alt="Dirección Background" className="w-24 h-24 object-contain" />
                        </div>
                        <img src={direccionIcon} alt="Rover" className="w-8 h-8 object-contain" />
                        <div>
                            <span className="text-xl font-bold text-white block">Rover</span>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">17-21 años</p>
                        </div>
                    </button>
                </div>

                {/* Adultos */}
                <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#8c52ff] shadow-sm text-left mb-6 overflow-hidden">
                    <div className="flex items-center gap-4">
                        <img src={personasIcon} alt="Adultos" className="w-8 h-8 object-contain" />
                        <div>
                            <span className="font-bold text-base text-white block">Adultos</span>
                            <p className="text-xs text-white/80">Consejo de Grupo</p>
                        </div>
                    </div>
                </div>

                {/* Eventos */}
                <section className="mb-10">
                    <h2 className="font-bold text-xl text-[#3d8034] mb-4">Próximos Eventos</h2>
                    <div className="bg-[#fff1e7] rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#c0c9b9]/20">
                        <div className="bg-white rounded-xl w-12 h-12 flex flex-col items-center justify-center border border-[#c0c9b9]/30 shadow-sm">
                            <span className="text-[10px] font-bold text-[#23661d] uppercase">SAB</span>
                            <span className="text-lg font-bold text-[#2d1600] leading-none">15</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base text-[#854912]">Campamento de invierno 2026</span>
                            <span className="text-xs text-[#854912]/80">Capilla de Buffo</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl backdrop-blur-md bg-[#ffeada]/90 shadow-[0px_-4px_12px_rgba(133,73,18,0.05)] flex justify-around items-center h-16 border-t border-[#c0c9b9]/20">
                <button className="flex flex-col items-center justify-center text-[#3d8034] active:scale-95 transition-transform px-6">
                    <img src={hogarIcon} alt="Inicio" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Home</span>
                </button>
                <button className="flex flex-col items-center justify-center text-[#41493d] active:scale-95 transition-transform px-6">
                    <img src={calendarioIcon} alt="Eventos" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Eventos</span>
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