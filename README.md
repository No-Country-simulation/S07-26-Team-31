# ⚡ PhysaFlow — Data Center Stranded Capacity Calculator

> Herramienta de diagnóstico ágil y visualización técnica para estimar capacidad varada y pérdidas financieras en Data Centers.

---

## 📌 Presentación del Proyecto

**PhysaFlow** permite a operadores de Data Centers calcular en menos de 3 minutos cuánta capacidad energética y de enfriamiento están desperdiciando y cuál es su impacto económico anual. 

Diseñado con un enfoque **Mobile-First & Responsivo**, integra una visualización icónica de 3 capas (*Facility*, *IT Infrastructure*, *Workload*) para transformar datos complejos de infraestructura en un reporte claro, compartible y orientado a la optimización.

---

## 📚 Índice de Documentación Técnica

Para mantener el proyecto organizado y facilitar la colaboración, la documentación detallada se divide en los siguientes capítulos:

### 1. 🛠️ [Estándares de Desarrollo & Nomenclatura](./docs/development/01-development-standards.md)
Normas de trabajo para el equipo de desarrollo:
* Git Flow y estrategia de ramas (`feature/`, `fix/`, `refactor/`, `docs/`).
* Convención de Commits (*Conventional Commits*).
* Estructura y Checklist para Pull Requests (PRs).

### 2. 📱 [Arquitectura Frontend & Tecnologías Mobile](./docs/development/02-frontend-architecture.md)
Especificaciones técnicas de la aplicación:
* **Stack Principal:** React Native / React Native for Web + TypeScript.
* **Sistema de Diseño & UI:** StyleSheet / TailwindCSS / NativeWind (Paleta Forest Green & Gold).
* **Arquitectura de Software:** Atomic Design / Feature-based Architecture.
* **Manejo de Estado & Storage Local:** Zustand / AsyncStorage.

### 3. 🗺️ [User Flow & Experiencia de Usuario](./docs/development/03-user-flow.md)
Diagramas y detalle del recorrido del usuario:
* Flujo navegable end-to-end en Mermaid (Input → Summary → Lead Gate → Deep Analysis → History).
* Descripción de pantallas, interacciones y componentes clave.

---

## 🚀 Inicio Rápido (Quickstart)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/physaflow-mobile.git

# Instalar dependencias
npm install

# Ejecutar en entorno local (Mobile / Web)
npm run start
```