# HistoNet - Frontend

Frontend de la aplicación de telemedicina HistoNet, construida con React, TypeScript y Vite.

## 📋 Descripción

**HistoNet** es una aplicación de historias médicas electrónicas donde se gestiona el ingreso de pacientes y los médicos registran toda la información de la visita médica.

**RemoteClinic** es un módulo específico para gestión de llamadas/telemedicina, donde:
- Se busca al paciente previamente registrado en el sistema
- Se selecciona el método de ingreso (Particular, Asegurado, Corporativo, Convenio)
- Se registra el motivo de la consulta
- Se configura el baremo de precios y servicios
- Se pasa a la entrevista clínica del paciente

## 🛠️ Stack Tecnológico

- **Framework:** React 18
- **Build Tool:** Vite
- **Lenguaje:** TypeScript
- **Estilado:** Tailwind CSS + shadcn/ui
- **Validaciones:** Zod
- **Gestión de Formularios:** React Hook Form + FormController
- **Estado del Servidor:** TanStack Query (React Query)
- **Íconos:** Lucide React

## 📁 Estructura de Carpetas

```
frontent/src/
├── assets/              # Recursos estáticos (imágenes, logos)
├── components/          # Componentes compartidos
│   └── ui/              # Componentes base de shadcn/ui
├── context/             # Contextos de la aplicación
│   └── providers/       # Providers (medicalVisit, toast)
├── core/                # Núcleo de la aplicación
│   ├── entities/        # Entidades del dominio
│   ├── repositories/    # Interfaces de repositorios
│   └── services/        # Servicios de negocio
├── data/                # Capa de datos
│   ├── mappers/         # Mapeadores de datos
│   └── types/           # Tipos de datos
├── infrastructure/      # Implementación de repositorios
├── modules/             # Módulos de la aplicación
│   ├── admission/       # Módulo de admisión
│   ├── auth/            # Módulo de autenticación
│   ├── components/      # Componentes compartidos del proyecto
│   │   └── app/         # Componentes agnósticos (FormController, SearchCombobox, OptionCards)
│   └── remoteClicnic/   # Módulo de telemedicina
│       ├── components/
│       │   ├── main/    # Componentes principales (newCall, PatientVisitTable)
│       │   └── visit/   # Componentes de visita (ClinicalInterview, AdmissionDataPanel)
│       ├── pages/       # Páginas del módulo
│       └── validations/ # Esquemas Zod
└── infrastructure/      # Repositorios concretos
```

## 🚀 Componentes Principales (modules/components/app/)

### FormController
Wrapper agnóstico para integrar componentes UI con React Hook Form.

```tsx
<FormController
    as={SearchCombobox}
    name="patientId"
    label="Buscar Paciente"
    fetcher={searchService.execute}
    getOptionValue={(p) => p.id}
    getOptionLabel={(p) => p.fullname}
/>
```

### SearchCombobox
Combobox con búsqueda asíncrona y debounce.

### OptionCards
Selector visual mediante tarjetas para elegir tipo de ingreso:
- **Particular** - Atención directa sin intermediarios
- **Asegurado** - Cobertura mediante póliza de seguro
- **Corporativo** - Cargo a cuenta de empresa directa
- **Convenio** - Acuerdos institucionales especiales

## 📝 Validaciones

Los esquemas Zod se encuentran en `modules/remoteClicnic/validations/`:

- `newcall.ts` - Validación del formulario de nueva llamada
- `ClinicalInterview.ts` - Validación de entrevista clínica

## 🔧 Configuración

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Linting
npm run lint

# Vista previa de producción
npm run preview
```

## 📚 Dependencias Principales

- `@hookform/resolvers` - Resolvedores de validación para React Hook Form
- `zod` - Validaciones de esquemas TypeScript
- `lucide-react` - Biblioteca de íconos
- `class-variance-authority` - Variantes de clases CSS
- `clsx` - Utilidad para clases condicionales
- `tailwind-merge` - Merge de clases Tailwind
- `@tanstack/react-query` - Gestión de estado del servidor

## 🎨 Estilo y Theme

El theme de la aplicación está definido en:
- `src/assets/theme/colors.ts` - Colores del sistema
- `src/assets/theme/darsalud.css` - Estilos CSS globales

## 📄 Licencia

Este proyecto es parte del sistema HistoNet.
