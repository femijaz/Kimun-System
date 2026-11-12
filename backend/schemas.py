from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class LoginSchema(BaseModel):
    documento: str
    contrasena: str

class PersonaOut(BaseModel):
    id: int
    nombre: str
    apellido: str
    documento: str
    fecha_nacimiento: Optional[date] = None

    class Config:
        from_attributes = True

class HistoriaClinicaOut(BaseModel):
    alergias: Optional[str] = None
    enfermedades: Optional[str] = None
    medicacion: Optional[str] = None
    carnet_vacunacion: Optional[str] = None

    class Config:
        from_attributes = True

class DocumentacionLegalOut(BaseModel):
    tipo_documento: str
    fecha_subida: str
    estado: str

    class Config:
        from_attributes = True

class BeneficiarioOut(BaseModel):
    id: int
    legajo: str
    rama: str
    persona: PersonaOut
    historia_clinica: Optional[HistoriaClinicaOut] = None

    class Config:
        from_attributes = True

class UsuarioOut(BaseModel):
    id: int
    documento: str
    rol: str
    persona: PersonaOut

    class Config:
        from_attributes = True