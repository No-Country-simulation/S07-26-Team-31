# 🗺️ Flujo de Usuario y Arquitectura de Experiencia (User Flow)

Este documento detalla el recorrido completo del usuario dentro de la calculadora **PhysaFlow**, definiendo la navegación por rutas de **Expo Router**, las interacciones clave y las transiciones entre pantallas.

---

## 📊 Diagrama de Flujo General

```mermaid
graph TD
    %% Pantallas
    START(("🚀 Inicio / App Launch"))

    S1["📱 Pantalla 1: Home / Input<br/>PhysaFlowCalculator/app/(calculator)/index.tsx<br/>• MW, Utilización % y Cooling"]

    S2["📊 Pantalla 2: Diagnostic Summary<br/>PhysaFlowCalculator/app/(calculator)/result.tsx<br/>• Pérdida financiera anual<br/>• Visualizador de 3 capas"]

    MODAL["📩 Bottom Sheet: Captura de Email<br/>• Email corporativo obligatorio<br/>• Validación de formato<br/>• Desbloquea acciones premium"]

    SHARE["📤 Compartir Diagnóstico<br/>• Generar imagen PNG<br/>• Menú nativo de compartir"]

    S3["🔍 Pantalla 3: Full Deep Analysis<br/>PhysaFlowCalculator/app/(calculator)/full-analysis.tsx<br/>• Breakdown por capas<br/>• Simulador<br/>• Exportar PDF"]

    S4["🗂️ Pantalla 4: Histórico<br/>PhysaFlowCalculator/app/history/index.tsx<br/>• Resultados guardados<br/>• Comparación Side-by-Side"]

    %% Flujo principal
    START --> S1
    S1 -->|"Calcular pérdida"| S2

    %% Gate de email
    S2 -->|"Compartir diagnóstico"| MODAL
    S2 -->|"Desbloquear análisis completo"| MODAL

    %% Acciones habilitadas tras email
    MODAL -->|"Email válido"| SHARE
    MODAL -->|"Continuar"| S3

    %% Flujo final
    SHARE --> S2
    S3 -->|"Guardar automáticamente"| S4
```