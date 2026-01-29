// C:\Users\geferson.moreno\Documents\dev\histonet-web\frontent\src\utils\declarations.d.ts
declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    // Opcionalmente, puedes configurar SVG para usarse como componente React
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    const src: string;
    export default src;
}

// Puedes añadir `.ico`, `.webp`, etc., de la misma manera
declare module '*.ico' {
    const content: string;
    export default content;
}