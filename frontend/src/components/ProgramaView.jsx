import React, { useState } from 'react';
import hogarIcon from '../recursos/iconos/hogar.png';
import calendarioIcon from '../recursos/iconos/calendario.png';
import perfilIcon from '../recursos/iconos/perfil.png';
import atrasIcon from '../recursos/iconos/flecha.png';
import ubicacionIcon from '../recursos/iconos/ubicacion.png';

export default function ProgramaView({ user, onBack, onNavigateHome, onNavigateProfile }) {
    const rolUser = (user?.rol || '').toUpperCase();
    const esAdmin = rolUser.includes('ADMIN') || rolUser.includes('DIRIGENTE') || rolUser.includes('JEFE') || rolUser.includes('SCOUTER') || user?.es_admin === true;

    // Si es beneficiario, por defecto filtramos por su rama o actividades generales ("Todas")
    const [filtroRama, setFiltroRama] = useState('Todas');
    const [modalAbierto, setModalAbierto] = useState(false);
    
    const [actividades, setActividades] = useState([
        { id: 1, mes: "MAY", dia: "12", titulo: "Reunión de Consejo de Grupo", lugar: "Sede Scout", rama: "Adultos" },
        { id: 2, mes: "JUN", dia: "05", titulo: "Paseo de Manada a la Plaza", lugar: "Parque San Martín", rama: "Manada" },
        { id: 3, mes: "JUL", dia: "15", titulo: "Campamento de Invierno 2026", lugar: "Capilla de Buffo, Unquillo", rama: "Todas" }
    ]);

    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevoLugar, setNuevoLugar] = useState('');
    const [nuevaRama, setNuevaRama] = useState('Manada');

    const handleCrear = (e) => {
        e.preventDefault();
        if (!esAdmin || !nuevoTitulo.trim()) return; // Seguridad extra
        setActividades([{ id: Date.now(), mes: "AGO", dia: "20", titulo: nuevoTitulo, lugar: nuevoLugar || "Sede", rama: nuevaRama }, ...actividades]);
        setNuevoTitulo(''); setNuevoLugar(''); setModalAbierto(false);
    };

    const filtradas = filtroRama === 'Todas' ? actividades : actividades.filter(a => a.rama === filtroRama || a.rama === 'Todas');

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            <nav className="fixed top-0 w-full z-50 bg-[#fff8f5] shadow-sm flex justify-between items-center h-14 px-4">
                <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ffeada]">
                    <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                </button>
                <span className="font-bold text-sm text-[#23661d]">Programa de Actividades</span>
                <div className="w-10"></div>
            </nav>

            <main className="pt-20 px-4 max-w-3xl mx-auto space-y-4">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-[#2d1600]">Cronograma Oficial</h1>
                        <p className="text-xs text-[#41493d]">
                            {esAdmin ? 'Vista de gestión institucional' : 'Actividades de tu rama y grupo'}
                        </p>
                    </div>
                    {/* Solo los administradores / dirigentes pueden agregar actividades */}
                    {esAdmin && (
                        <button onClick={() => setModalAbierto(true)} className="px-3 py-1.5 bg-[#23661d] text-white font-bold text-xs rounded-xl shadow-sm">
                            + Nueva Actividad
                        </button>
                    )}
                </header>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {['Todas', 'Manada', 'Unidad', 'Caminantes', 'Rovers', 'Adultos'].map(r => (
                        <button key={r} onClick={() => setFiltroRama(r)} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${filtroRama === r ? 'bg-[#23661d] text-white' : 'bg-[#fff1e7] text-[#854912]'}`}>
                            {r}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    {filtradas.map(act => (
                        <div key={act.id} className="bg-white rounded-2xl p-4 border border-[#c0c9b9]/20 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#fff1e7] rounded-xl w-12 h-12 flex flex-col items-center justify-center border border-[#c0c9b9]/30">
                                    <span className="text-[9px] font-bold text-[#23661d]">{act.mes}</span>
                                    <span className="text-base font-bold text-[#2d1600]">{act.dia}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-[#2d1600]">{act.titulo}</h3>
                                    <p className="text-xs text-[#41493d] flex items-center gap-1">
                                        <img src={ubicacionIcon} alt="Lugar" className="w-3.5 h-3.5 object-contain" />
                                        {act.lugar}
                                    </p>
                                </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-[#ffeada] text-[#854912] text-[10px] font-bold uppercase">{act.rama}</span>
                        </div>
                    ))}
                </div>

                {/* Modal de nueva actividad (Solo renderiza si es admin) */}
                {esAdmin && modalAbierto && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-3">
                            <h3 className="font-bold text-lg text-[#2d1600]">Nueva Actividad</h3>
                            <form onSubmit={handleCrear} className="space-y-3">
                                <input type="text" placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} required className="w-full p-2.5 bg-[#fff8f5] border rounded-xl text-sm" />
                                <input type="text" placeholder="Lugar" value={nuevoLugar} onChange={e => setNuevoLugar(e.target.value)} className="w-full p-2.5 bg-[#fff8f5] border rounded-xl text-sm" />
                                <select value={nuevaRama} onChange={e => setNuevaRama(e.target.value)} className="w-full p-2.5 bg-[#fff8f5] border rounded-xl text-xs">
                                    <option value="Manada">Manada</option>
                                    <option value="Unidad">Unidad</option>
                                    <option value="Caminantes">Caminantes</option>
                                    <option value="Rovers">Rovers</option>
                                    <option value="Adultos">Adultos</option>
                                </select>
                                <div className="flex gap-2 pt-2">
                                    <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-2 bg-[#fff8f5] text-xs font-bold rounded-xl border">Cancelar</button>
                                    <button type="submit" className="flex-1 py-2 bg-[#23661d] text-white text-xs font-bold rounded-xl">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <nav className="fixed bottom-0 w-full z-50 bg-[#ffeada]/90 flex justify-around items-center h-16 border-t border-[#c0c9b9]/20">
                <button onClick={onNavigateHome} className="flex flex-col items-center text-[#41493d] px-6">
                    <img src={hogarIcon} alt="Home" className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Home</span>
                </button>
                <button className="flex flex-col items-center text-[#23661d] px-6">
                    <img src={calendarioIcon} alt="Programa" className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Programa</span>
                </button>
                <button onClick={onNavigateProfile} className="flex flex-col items-center text-[#41493d] px-6">
                    <img src={perfilIcon} alt="Perfil" className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Mi perfil</span>
                </button>
            </nav>
        </div>
    );
}