from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Persona(Base):
    __tablename__ = "personas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
    documento = Column(String(20), unique=True, index=True, nullable=False)
    fecha_nacimiento = Column(Date, nullable=True)

    # Relaciones 1 a 1 o 1 a muchos según el diagrama
    usuario = relationship("Usuario", back_populates="persona", uselist=False)
    beneficiario = relationship("Beneficiario", back_populates="persona", uselist=False)
    adulto = relationship("Adulto", back_populates="persona", uselist=False)
    historia_clinica = relationship("HistoriaClinica", back_populates="persona", uselist=False)
    documentaciones = relationship("DocumentacionLegal", back_populates="persona")


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    documento = Column(String(20), nullable=False)
    contrasena = Column(String(255), nullable=False)
    rol = Column(String(30), nullable=False)  # Ej: Dirigente, Admin

    persona_id = Column(Integer, ForeignKey("personas.id"), unique=True)
    persona = relationship("Persona", back_populates="usuario")


class Beneficiario(Base):
    __tablename__ = "beneficiarios"

    id = Column(Integer, primary_key=True, index=True)
    legajo = Column(String(50), unique=True, nullable=False)
    rama = Column(String(30), nullable=False)  # Manada, Unidad, Caminante, Rover

    persona_id = Column(Integer, ForeignKey("personas.id"), unique=True)
    persona = relationship("Persona", back_populates="beneficiario")


class Adulto(Base):
    __tablename__ = "adultos"

    id = Column(Integer, primary_key=True, index=True)
    legajo = Column(String(50), unique=True, nullable=False)
    cargo = Column(String(50), nullable=False)  # Ej: Scouter, Jefe de Grupo

    persona_id = Column(Integer, ForeignKey("personas.id"), unique=True)
    persona = relationship("Persona", back_populates="adulto")


class HistoriaClinica(Base):
    __tablename__ = "historias_clinicas"

    id = Column(Integer, primary_key=True, index=True)
    alergias = Column(Text, nullable=True)
    enfermedades = Column(Text, nullable=True)
    medicacion = Column(Text, nullable=True)
    carnet_vacunacion = Column(String(255), nullable=True)

    persona_id = Column(Integer, ForeignKey("personas.id"), unique=True)
    persona = relationship("Persona", back_populates="historia_clinica")

    declaraciones_juradas = relationship("DeclaracionJurada", back_populates="historia_clinica")


class DocumentacionLegal(Base):
    __tablename__ = "documentacion_legal"

    id = Column(Integer, primary_key=True, index=True)
    tipo_documento = Column(String(100), nullable=False)
    fecha_subida = Column(String(50), nullable=False)
    url_archivo = Column(Text, nullable=False)
    estado = Column(String(30), nullable=False)  # Completo, Faltante, etc.

    persona_id = Column(Integer, ForeignKey("personas.id"))
    persona = relationship("Persona", back_populates="documentaciones")


class DeclaracionJurada(Base):
    __tablename__ = "declaraciones_juradas"

    id = Column(Integer, primary_key=True, index=True)
    fecha_emision = Column(String(50), nullable=False)
    estado = Column(String(30), nullable=False)

    historia_clinica_id = Column(Integer, ForeignKey("historias_clinicas.id"))
    historia_clinica = relationship("HistoriaClinica", back_populates="declaraciones_juradas")