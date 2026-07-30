# 🛠️ Estándares de Desarrollo, Git Flow y Nomenclatura

Este documento establece las convenciones de código, flujo de trabajo en Git y buenas prácticas que todos los desarrolladores deben seguir en el repositorio de **PhysaFlow**.

---

## 🌿 1. Estrategia de Ramas (Git Flow Simplificado)

Utilizaremos una estrategia basada en ramas cortas (*Short-Lived Feature Branches*) sobre una rama principal integrada.

### Ramas Principales
* **`main`**: Código estable y listo para producción.
* **`develop`**: Rama de integración continua donde se consolidan los nuevos desarrollos probados.

### Ramas Auxiliares
Cada nueva funcionalidad, corrección o refactorización debe realizarse en una rama propia creada a partir de `develop`:

* `feature/nombre-de-la-funcionalidad` → Nuevas pantallas, componentes o features.
  * *Ejemplo:* `feature/3-layer-visualizer-component`
* `fix/descripcion-del-bug` → Correcciones de errores.
  * *Ejemplo:* `fix/email-modal-validation`
* `refactor/zona-a-mejorar` → Mejoras de código o performance sin cambio de comportamiento.
  * *Ejemplo:* `refactor/input-calculator-state`
* `docs/tema-actualizado` → Actualizaciones exclusivamente en documentación.
  * *Ejemplo:* `docs/update-architecture-readme`

---

## 💬 2. Convención de Commits (Conventional Commits)

Los mensajes de commit deben seguir la sintaxis de [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial limpio y automatizable.

### Formato
```text
<tipo>(<alcance opcional>): <descripción breve en presente o infinitivo>
```