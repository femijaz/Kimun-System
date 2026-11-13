import React, { useState } from 'react';
import { crearBeneficiario } from '../services/api';
import atrasIcon from '../recursos/iconos/flecha.png';

export default function BeneficiarioForm({ ramaInicial, onBack, onSuccess }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [legajo, setLegajo] = useState('');
    const [rama, setRama] = useState(ramaInicial || 'Manada');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        const payload = {
            legajo: legajo.trim(),
            rama: rama,
            persona: {
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                documento: documento.trim(),
                fecha_nacimiento: fechaNacimiento || null
            }
        };

        try {
            await crearBeneficiario(payload);
            onSuccess(); // Vuelve al roster y recarga la lista
        } catch (err) {
            console.error(err);
            setError('Error al registrar el beneficiario en la base de datos.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fff8f5] text-[#2d1600] pb-24 font-['Work_Sans']">
            {/* Top Bar */}
            <nav className="fixed top-0 w-full z-50 bg-[#fff8f5] shadow-sm flex items-center justify-between px-4 h-14">
                <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ffeada]">
                    <img src={atrasIcon} alt="Volver" className="w-5 h-5 object-contain" />
                </button>
                <span className="font-bold text-sm text-[#23661d]">Nuevo Beneficiario</span>
                <div className="w-10"></div>
            </nav>

            <main className="pt-20 px-4 max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-[#c0c9b9]/30 space-y-4">
                    <h2 className="font-bold text-lg text-[#2d1600] mb-2">Carga de Legajo</h2>

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl font-medium">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-[#41493d] block mb-1">Nombre *</label>
                        <input 
                            type="text" 
                            required 
                            value={nombre} 
                            onChange={e => setNombre(e.target.value)} 
                            placeholder="Ej. Mateo Benjamín"
                            className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none focus:border-[#23661d]"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-[#41493d] block mb-1">Apellido *</label>
                        <input 
                            type="text" 
                            required 
                            value={apellido} 
                            onChange={e => setApellido(e.target.value)} 
                            placeholder="Ej. Valenzuela"
                            className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none focus:border-[#23661d]"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-[#41493d] block mb-1">DNI / Documento *</label>
                        <input 
                            type="text" 
                            required 
                            value={documento} 
                            onChange={e => setDocumento(e.target.value)} 
                            placeholder="Ej. 45321908"
                            className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none focus:border-[#23661d]"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-[#41493d] block mb-1">Legajo *</label>
                        <input 
                            type="text" 
                            required 
                            value={legajo} 
                            onChange={e => setLegajo(e.target.value)} 
                            placeholder="Ej. MAN-004"
                            className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none focus:border-[#23661d]"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-[#41493d] block mb-1">Fecha de Nacimiento</label>
                        <input 
                            type="date" 
                            value={fechaNacimiento} 
                            onChange={e => setFechaNacimiento(e.target.value)} 
                            className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none focus:border-[#23661d]"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-[#41493d] block mb-1">Rama Asignada *</label>
                        <select 
                            value={rama} 
                            onChange={e => setRama(e.target.value)}
                            className="w-full p-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl text-sm outline-none focus:border-[#23661d]"
                        >
                            <option value="Manada">Manada (7-11 años)</option>
                            <option value="Unidad">Unidad Scout (11-14 años)</option>
                            <option value="Caminantes">Caminantes (14-17 años)</option>
                            <option value="Rovers">Rovers (17-21 años)</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button" 
                            onClick={onBack}
                            className="flex-1 py-3 bg-[#fff8f5] border border-[#c0c9b9]/40 text-[#41493d] text-xs font-bold rounded-xl"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            disabled={cargando}
                            className="flex-1 py-3 bg-[#23661d] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#1b5217] disabled:opacity-50"
                        >
                            {cargando ? 'Guardando...' : 'Guardar Beneficiario'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}