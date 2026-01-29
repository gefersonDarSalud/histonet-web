import { useEffect } from "react";

/**
 * Hook para cambiar dinámicamente el favicon de la página.
 * @param url La URL del archivo de icono (ej: '/assets/new-icon.svg')
 */
export const useFavicon = (url: string) => {
    useEffect(() => {
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }

        link.href = url;

    }, [url]);
};