import type React from "react"

export const Footer = (): React.ReactElement => {
    return (
        <>
            {/* Footer */}
            <footer className="w-full border-t bg-white mt-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} DarSalud. Todos los derechos reservados.
                </div>
            </footer>
        </>
    )
}