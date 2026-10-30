import React, { useState } from 'react';
import { loginUsuario } from '../services/api';

export default function Login({ onLoginSuccess }) {
    const [documento, setDocumento] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginUsuario(documento, contrasena);
            onLoginSuccess(data);
        } catch (err) {
            setError("Documento o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#fff8f5] px-4 font-['Work_Sans']">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-[0_4px_24px_rgba(45,22,0,0.06)] border border-[#c0c9b9]/20">
                
                {/* Logo institucional con la "ü" */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-14 h-14 rounded-full border-2 border-[#23661d] flex items-center justify-center text-[#23661d] text-2xl font-bold mb-3 shadow-sm bg-[#e6ffdb]">
                        <span className="mt-[-2px]">ü</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#2d1600]">Kimün System</h1>
                    <p className="text-sm text-[#41493d] mt-1">Plataforma de Gestión Scout</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 text-sm text-[#ba1a1a] bg-[#ffdad6] rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#41493d]">
                            Documento (DNI)
                        </label>
                        <input 
                            type="text" 
                            value={documento} 
                            onChange={(e) => setDocumento(e.target.value)}
                            className="w-full px-4 py-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23661d] text-[#2d1600]"
                            placeholder="Ej: 28.452.910"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-[#41493d]">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            value={contrasena} 
                            onChange={(e) => setContrasena(e.target.value)}
                            className="w-full px-4 py-3 bg-[#fff8f5] border border-[#c0c9b9]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#23661d] text-[#2d1600]"
                            placeholder="••••••••"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3.5 mt-2 text-white font-bold bg-[#23661d] rounded-xl hover:bg-[#3d8034] transition shadow-lg shadow-[#23661d]/20 active:scale-95 disabled:bg-[#23661d]/50"
                    >
                        {loading ? "Verificando..." : "Ingresar al Sistema"}
                    </button>
                </form>
            </div>
        </div>
    );
}