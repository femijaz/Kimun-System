const API_URL = "http://127.0.0.1:8000/api";

// Función para iniciar sesión con el documento y contraseña del dirigente
export const loginUsuario = async (documento, contrasena) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documento, contrasena }),
    });
    if (!response.ok) {
        throw new Error("Documento o contraseña incorrectos");
    }
    return response.json();
};

// Función para obtener la lista de beneficiarios (scouts) filtrados por rama o búsqueda
export const getBeneficiarios = async (rama = "", q = "", skip = 0, limit = 10) => {
    const params = new URLSearchParams({ rama, q, skip, limit });
    const response = await fetch(`${API_URL}/beneficiarios?${params}`);
    if (!response.ok) throw new Error("Error al obtener beneficiarios");
    return response.json();
};

export const crearBeneficiario = async (data) => {
    const response = await fetch(`${API_URL}/beneficiarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear beneficiario");
    return response.json();
};

export const eliminarBeneficiarioLogico = async (id) => {
    const response = await fetch(`${API_URL}/beneficiarios/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al dar de baja al beneficiario");
    return response.json();
};