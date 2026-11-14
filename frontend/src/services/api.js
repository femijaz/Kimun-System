// Definimos la URL base asegurándonos de quitar cualquier barra al final
const API_URL = (import.meta.env.VITE_API_URL || "https://kimun-system.onrender.com").replace(/\/+$/, '');

// Función auxiliar para evitar barras dobles al concatenar endpoints
const getUrl = (endpoint) => {
    // Si el endpoint empieza con barra, se la quitamos para controlarlo nosotros
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_URL}${cleanEndpoint}`;
};

// Función para iniciar sesión con el documento y contraseña del dirigente
export const loginUsuario = async (documento, contrasena) => {
    const response = await fetch(getUrl('/login'), {
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
    const response = await fetch(`${getUrl('/beneficiarios')}?${params}`);
    if (!response.ok) throw new Error("Error al obtener beneficiarios");
    return response.json();
};

export const crearBeneficiario = async (data) => {
    const response = await fetch(getUrl('/beneficiarios'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear beneficiario");
    return response.json();
};

export const eliminarBeneficiarioLogico = async (id) => {
    const response = await fetch(getUrl(`/beneficiarios/${id}`), {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al dar de baja al beneficiario");
    return response.json();
};