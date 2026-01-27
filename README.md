# Design System Manager

Una herramienta completa para gestionar sistemas de diseño, auditar inconsistencias y rastrear la adopción en equipos de producto.

## Características

### 📊 Dashboard de Componentes
- Grid de componentes con preview, versión y estadísticas de uso
- Filtros por plataforma (iOS/Android/Web), categoría y estado
- Color-coding: verde (actualizado), amarillo (necesita update), rojo (deprecated)
- Búsqueda potente con autocompletado
- Stats overview: total componentes, coverage %, issues abiertos

### 🔍 Detalle de Componente
- Preview interactivo con variantes (default, hover, active, disabled, loading)
- Controles para ajustar props en tiempo real
- Documentación estructurada: Usage, Anatomy, Props, Accessibility, Code
- Snippets de código por plataforma
- Timeline de versiones
- Sección de comentarios para feedback del equipo

### 🔬 Auditoría de Inconsistencias
- Mapa de calor de archivos con inconsistencias detectadas
- Issues agrupados por severidad (crítico/alto/medio)
- Sugerencias de fix automático
- Bulk actions: "Fix all auto-fixable"
- Progress bar de adopción por proyecto
- Export de reporte PDF

### 📝 Workflow de Solicitudes
- Wizard multi-step para nuevas solicitudes
- Sistema de votación del equipo
- Status tracking: submitted → under review → in development → ready
- Sugerencias de componentes similares existentes

### 📈 Analytics de Adopción
- Gráficas de adoption rate over time
- Componentes más usados (bar chart)
- Cobertura por proyecto
- Uso por plataforma
- Red de dependencias
- Alertas configurables
- Recomendaciones automáticas

## Stack Tecnológico

- **Framework**: Vue 3 + Vite + TypeScript
- **Estilos**: Tailwind CSS v4
- **Routing**: Vue Router 4
- **Estado**: Pinia
- **Gráficas**: Chart.js + vue-chartjs
- **Iconos**: Lucide Vue Next

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── common/      # StatusBadge, ComponentCard, MetricCard, etc.
│   ├── layout/      # Sidebar, Header, MainLayout
│   ├── charts/      # Wrappers de gráficas
│   └── ui/          # Tabs, Modal, ProgressBar, WizardStepper
├── data/            # Mock data
├── pages/           # Vistas principales
├── router/          # Configuración de rutas
├── stores/          # Pinia stores
├── types/           # TypeScript interfaces
└── style.css        # Estilos globales y tema
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard de componentes |
| `/component/:id` | Detalle de componente |
| `/audit` | Auditoría de inconsistencias |
| `/requests` | Workflow de solicitudes |
| `/analytics` | Analytics de adopción |

## Tema

La aplicación usa un tema oscuro profesional con:

- **Primary**: Indigo/Violet (#6366f1)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Rose (#ef4444)
- **Tipografía**: Plus Jakarta Sans (headings), DM Sans (body), JetBrains Mono (code)

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Licencia

MIT
