import React, { useState, useEffect } from 'react';
import { getBeneficiarios } from '../services/api';

// Íconos con imágenes
import hogarIcon from '../recursos/iconos/hogar.png';
import calendarioIcon from '../recursos/iconos/calendario.png';
import perfilIcon from '../recursos/iconos/perfil.png';
import atrasIcon from '../recursos/iconos/flecha.png';
import seleccionIcon from '../recursos/iconos/flechita.png';

export default function BranchRoster({ rama, onBack, onSelectBeneficiario, onNavigateEvents, onNavigateProfile }) {
    const [scouts, setScouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const configRama = {
        Manada: { titulo: 'MANADA', bgHeader: 'bg-[#ffde59]', borderCard: 'border-l-[#ffde59]' },
        Unidad: { titulo: 'UNIDAD', bgHeader: 'bg-[#7ed957]', borderCard: 'border-l-[#7ed957]' },
        Caminantes: { titulo: 'CAMINANTES', bgHeader: 'bg-[#0cc0df]', borderCard: 'border-l-[#0cc0df]' },
        Rovers: { titulo: 'ROVERS', bgHeader: 'bg-[#ff3131]', borderCard: 'border-l-[#ff3131]' },
        Adultos: { titulo: 'CONSEJO DE ADULTOS', bgHeader: 'bg-[#8c52ff]', borderCard: 'border-l-[#8c52ff]' }
    }[rama] || { titulo: rama.toUpperCase(), bgHeader: 'bg-[#23661d]', borderCard: 'border-l-[#23661d]' };

    useEffect(() => {
        const fetchBranchScouts = async () => {
            setLoading(true);
            try {
                const data = await getBeneficiarios(rama, '');
                setScouts(data);
            } catch (err) {
                console.error("Error al cargar la rama:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBranchScouts();
    }, [rama]);

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            {/* Top Bar */}
            <header className="fixed top-0 w-full z-50 bg-[#fff8f5] shadow-sm flex items-center justify-between px-4 h-14">
                <button 
                    onClick={onBack}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#ffeada] transition-colors active:scale-95"
                >
                    <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                </button>
                <div className="w-10 h-10 bg-[#23661d] rounded-full flex items-center justify-center border-2 border-[#23661d] overflow-hidden shadow-sm">
                    <span className="text-[#e6ffdb] font-bold text-lg leading-none select-none">Ü</span>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="pt-14">
                <div className={`w-full ${configRama.bgHeader} py-3 px-4 flex items-center justify-center mb-4 shadow-sm`}>
                    <h2 className="font-bold text-lg text-[#2d1600] uppercase tracking-widest">{configRama.titulo}</h2>
                </div>

                <div className="px-4 max-w-2xl mx-auto space-y-3">
                    {loading ? (
                        <p className="text-center text-sm text-[#41493d] italic py-8">Cargando integrantes de la rama...</p>
                    ) : scouts.length > 0 ? (
                        scouts.map((scout) => (
                            <div 
                                key={scout.id}
                                onClick={() => onSelectBeneficiario(scout)}
                                className={`flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-[#c0c9b9]/20 cursor-pointer active:scale-98 transition-all border-l-4 ${configRama.borderCard}`}
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#ffdcbe] flex-shrink-0 border-2 border-white flex items-center justify-center font-bold text-[#874a13]">
                                    {scout.persona.nombre[0]}{scout.persona.apellido ? scout.persona.apellido[0] : ''}
                                </div>
                                <div className="flex-grow">
                                    <span className="font-bold text-sm text-[#874a13] block">
                                        {scout.persona.nombre} {scout.persona.apellido}
                                    </span>
                                    <span className="text-xs text-[#41493d]/80">
                                        Legajo: {scout.legajo}
                                    </span>
                                </div>
                                <img src={seleccionIcon} alt="Seleccionar" className="w-4 h-4 object-contain opacity-60" />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-2xl border border-[#c0c9b9]/20">
                            <p className="text-sm font-bold text-[#874a13]">No hay scouts registrados en esta rama aún.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl backdrop-blur-md bg-[#ffeada]/90 shadow-[0px_-4px_12px_rgba(133,73,18,0.05)] flex justify-around items-center h-16 border-t border-[#c0c9b9]/20">
                <button onClick={onBack} className="flex flex-col items-center justify-center text-[#3d8034] px-6">
                    <img src={hogarIcon} alt="Home" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Home</span>
                </button>
                <button onClick={onNavigateEvents} className="flex flex-col items-center justify-center text-[#41493d] px-6">
                    <img src={calendarioIcon} alt="Eventos" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Eventos</span>
                </button>
                <button onClick={onNavigateProfile} className="flex flex-col items-center justify-center text-[#41493d] px-6">
                    <img src={perfilIcon} alt="Perfil" className="w-6 h-6 object-contain" />
                    <span className="text-[12px] font-medium mt-0.5">Mi perfil</span>
                </button>
            </nav>
        </div>
    );
}