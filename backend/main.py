from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
import database

# Crear las tablas automáticamente
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Kimün API", version="2.0")

# Configurar CORS para React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "¡API de Kimün System funcionando al 100% con el diagrama de clases! 🚀"}

@app.post("/api/login")
def login(credentials: schemas.LoginSchema, db: Session = Depends(database.get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.documento == credentials.documento).first()
    if not usuario or usuario.contrasena != credentials.contrasena:
        raise HTTPException(status_code=400, detail="Documento o contraseña incorrectos")
    return {
        "access_token": "token_jwt_simulado", 
        "token_type": "bearer", 
        "usuario_id": usuario.id,
        "persona_id": usuario.persona_id
    }

@app.get("/api/beneficiarios", response_model=List[schemas.BeneficiarioOut])
def get_beneficiarios(
    rama: Optional[str] = Query(None, description="Filtrar por rama (Manada, Unidad, etc.)"),
    search: Optional[str] = Query(None, description="Buscar por nombre o apellido"),
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Beneficiario).join(models.Persona)
    
    if rama:
        query = query.filter(models.Beneficiario.rama.ilike(f"%{rama}%"))
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (models.Persona.nombre.ilike(search_pattern)) | 
            (models.Persona.apellido.ilike(search_pattern))
        )
    return query.all()

@app.get("/api/beneficiarios/{beneficiario_id}", response_model=schemas.BeneficiarioOut)
def get_beneficiario_detail(beneficiario_id: int, db: Session = Depends(database.get_db)):
    beneficiario = db.query(models.Beneficiario).filter(models.Beneficiario.id == beneficiario_id).first()
    if not beneficiario:
        raise HTTPException(status_code=404, detail="Beneficiario no encontrado")
    return beneficiario

@app.get("/api/usuarios/{usuario_id}", response_model=schemas.UsuarioOut)
def get_usuario_profile(usuario_id: int, db: Session = Depends(database.get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario