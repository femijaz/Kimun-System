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
export const getBeneficiarios = async (rama = "", search = "") => {
    let url = `${API_URL}/beneficiarios?`;
    if (rama) url += `rama=${rama}&`;
    if (search) url += `search=${search}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los beneficiarios");
    return response.json();
};