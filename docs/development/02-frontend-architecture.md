# 📱 Arquitectura Frontend y Stack Tecnológico

Este documento define la estructura de software, el stack de dependencias, la organización de archivos basada en **Expo Router** y los patrones de diseño aplicados en la versión mobile y web de **PhysaFlow**.

---

## 🛠️ 1. Stack Tecnológico

La aplicación se desarrolla sobre el ecosistema **Expo**, garantizando rendimiento nativo, soporte multiplataforma (iOS, Android y Web) y una navegación basada en archivos.

| Capa | Tecnología / Librería | Propósito |
| :--- | :--- | :--- |
| **Framework Base** | **React Native + Expo** | Desarrollo cross-platform ágil y compilación multiplataforma. |
| **Rutado / Navegación**| **Expo Router** | Enrutamiento basado en archivos (`app/` directory con `_layout.tsx`, `index.tsx`, etc.). |
| **Lenguaje** | **TypeScript** | Tipado estricto para modelos de infraestructura y datos numéricos. |
| **Internacionalización**| **react-i18next + i18next** | Soporte multilingüe (Español / Inglés) para la herramienta. |
| **Gestión de Estado** | **Zustand** | Estado global liviano y predecible sin *boilerplate* pesado. |
| **Almacenamiento Local**| **AsyncStorage (`@react-native-async-storage/async-storage`)** | Persistencia local para el historial de consultas y configuración de usuario. |
| **Estilos & UI** | **StyleSheet / NativeWind (A definir)** | Sistema de estilos adaptado al tema (Forest Green & Gold). |
| **Animaciones & Visuales**| **React Native SVG + Reanimated** | Renderizado vectorial interactivo para la Visualización de 3 Capas. |
| **PDF & Compartir** | **Expo Print + Expo Sharing + View Shot** | Generación de reportes PDF y captura de tarjetas de diagnóstico para redes. |

---

## 📁 2. Estructura de Proyecto (Expo Router + Feature-First)

El proyecto Expo vive dentro de `PhysaFlowCalculator/`. Combinamos el enrutamiento nativo de Expo Router (`app/` en la raíz del proyecto) con una organización modular por *features* dentro de `src/`.

```text
PhysaFlowCalculator/
│
├── app/                  # Rutas y Navegación (Expo Router File-based Routing)
│   ├── _layout.tsx       # Layout raíz (Providers: i18n, Zustand, Theme)
│   ├── index.tsx         # Redirección o Splash Screen inicial
│   ├── (calculator)/     # Grupo de rutas de la calculadora
│   │   ├── _layout.tsx   # Layout con Header de PhysaFlow
│   │   ├── index.tsx     # Pantalla 1: Formulario de Inputs (MW, Cooling, Util)
│   │   ├── result.tsx    # Pantalla 2: Diagnostic Summary & 3-Layer Visualizer
│   │   └── full-analysis.tsx # Pantalla 3: Detailed Facility Breakdown & Simulator
│   └── history/          # Pantalla 4: Histórico de Consultas
│       └── index.tsx
├── src/                  # Lógica de Negocio y Componentes Reutilizables
│   ├── components/       # Componentes de UI genéricos / átomos
│   │   ├── common/       # Buttons, Cards, Inputs, Modals, Sliders
│   │   └── layout/       # Containers, TopBars, Headers
│   ├── features/         # Módulos específicos por funcionalidad
│   │   ├── calculator/   # Componentes e hooks del formulario de entrada
│   │   ├── diagnostic/   # Componente del Visualizador de 3 Capas y Share Card
│   │   ├── deep-analysis/ # Lógica del simulador y exportador PDF
│   │   └── history/      # Comparador de escenarios y renderizado de historial
│   ├── i18n/             # Configuración de react-i18next
│   │   ├── index.ts      # Inicialización de i18n
│   │   └── locales/      # Archivos JSON de traducción
│   │       ├── es.json   # Traducciones en Español
│   │       └── en.json   # Traducciones en Inglés
│   ├── store/            # Stores de Zustand (calculadora, historial, settings)
│   ├── theme/            # Tokens de diseño (Colores Forest Green & Gold)
│   ├── types/            # Tipado TypeScript (.d.ts / interfaces)
│   └── utils/            # Algoritmos de cálculo de pérdidas, MW y formateadores
│       ├── calculations.ts # Fórmulas de estimación de stranded capacity
│       └── pdfExporter.ts  # Generador de reportes con expo-print
```
