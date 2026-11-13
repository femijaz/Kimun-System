import React, { useState } from 'react';
import atrasIcon from '../recursos/iconos/flecha.png';
import ubicacionIcon from '../recursos/iconos/ubicacion.png';
import calendarioIcon from '../recursos/iconos/calendario.png';

export default function Events({ user, onBack }) {
    const rolUser = (user?.rol || '').toUpperCase();
    const esAdmin = rolUser.includes('ADMIN') || rolUser.includes('DIRIGENTE') || rolUser.includes('JEFE') || rolUser.includes('SCOUTER');

    const [modalAbierto, setModalAbierto] = useState(false);
    const [eventos, setEventos] = useState([
        { id: 1, fecha: "15 MAY", titulo: "Reunión de Consejo de Grupo", lugar: "Sede Scout", tipo: "Institucional" },
        { id: 2, fecha: "22 JUN", titulo: "Salida de Adiestramiento al Aire Libre", lugar: "Reserve San Martín", tipo: "Salida" },
        { id: 3, fecha: "10 JUL", titulo: "Fogón Aniversario del Grupo", lugar: "Predio Central", tipo: "Celebración" }
    ]);

    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [nuevoLugar, setNuevoLugar] = useState('');
    const [nuevaFecha, setNuevaFecha] = useState('01 AGO');

    const handleCrearEvento = (e) => {
        e.preventDefault();
        if (!esAdmin || !nuevoTitulo.trim()) return;
        setEventos([{ id: Date.now(), fecha: nuevaFecha, titulo: nuevoTitulo, lugar: nuevoLugar || "Sede", tipo: "Especial" }, ...eventos]);
        setNuevoTitulo(''); setNuevoLugar(''); setModalAbierto(false);
    };

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            {/* Top Bar exclusivo con botón de retroceso al Dashboard */}
            <nav className="fixed top-0 w-full z-50 bg-[#fff8f5] shadow-sm flex justify-between items-center h-14 px-4">
                <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ffeada] transition-colors" title="Volver al Dashboard">
                    <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                </button>
                <div className="flex items-center gap-2">
                    <img src={calendarioIcon} alt="Eventos" className="w-5 h-5 object-contain" />
                    <span className="font-bold text-sm text-[#23661d]">Gestión de Eventos Oficiales</span>
                </div>
                <div className="w-10"></div>
            </nav>

            <main className="pt-20 px-4 max-w-3xl mx-auto space-y-4">
                <header className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-[#c0c9b9]/20">
                    <div>
                        <h1 className="text-xl font-bold text-[#2d1600]">Calendario de Eventos</h1>
                        <p className="text-xs text-[#41493d] mt-0.5">Eventos institucionales, fogones y salidas de grupo.</p>
                    </div>
                    {esAdmin && (
                        <button onClick={() => setModalAbierto(true)} className="px-3 py-2 bg-[#23661d] text-white font-bold text-xs rounded-xl shadow-sm hover:bg-[#1b5217] transition-colors">
                            + Nuevo Evento
                        </button>
                    )}
                </header>

                <div className="space-y-3">
                    {eventos.map(ev => (
                        <div key={ev.id} className="bg-white rounded-2xl p-4 border border-[#c0c9b9]/20 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#fff1e7] rounded-xl w-14 h-14 flex flex-col items-center justify-center border border-[#c0c9b9]/30 flex-shrink-0">
                                    <span className="text-[10px] font-bold text-[#23661d]">{ev.fecha.split(' ')[1]}</span>
                                    <span className="text-base font-bold text-[#2d1600]">{ev.fecha.split(' ')[0]}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-[#2d1600]">{ev.titulo}</h3>
                                    <p className="text-xs text-[#41493d] flex items-center gap-1 mt-1">
                                        <img src={ubicacionIcon} alt="Lugar" className="w-3.5 h-3.5 object-contain" />
                                        {ev.lugar}
                                    </p>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-[#ffeada] text-[#854912] text-[10px] font-bold uppercase tracking-wider">
                                {ev.tipo}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Modal para crear evento (Solo Administradores / Dirigentes) */}
                {esAdmin && modalAbierto && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
                            <h3 className="font-bold text-lg text-[#2d1600]">Registrar Nuevo Evento</h3>
                            <form onSubmit={handleCrearEvento} className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-[#41493d] block mb-1">Título del evento</label>
                                    <input type="text" placeholder="Ej. Campamento de Primavera" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} required className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#41493d] block mb-1">Lugar o Sede</label>
                                    <input type="text" placeholder="Ej. Base Scout / Unquillo" value={nuevoLugar} onChange={e => setNuevoLugar(e.target.value)} className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-[#41493d] block mb-1">Fecha (Ej. 14 SEP)</label>
                                    <input type="text" placeholder="14 SEP" value={nuevaFecha} onChange={e => setNuevaFecha(e.target.value)} className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none" />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button type="button" onClick={() => setModalAbierto(false)} className="flex-1 py-2.5 bg-[#fff8f5] text-xs font-bold rounded-xl border border-[#c0c9b9]/40">Cancelar</button>
                                    <button type="submit" className="flex-1 py-2.5 bg-[#23661d] text-white text-xs font-bold rounded-xl shadow-sm">Guardar Evento</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}