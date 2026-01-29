import { routeLabel } from "#/routes";
import { ArrowLeft, Link } from "lucide-react";

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
            <p className="text-xl mt-4 mb-6 text-gray-700">Página no encontrada</p>
            <Link to={routeLabel.home} className="text-blue-600 hover:underline font-medium flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
            </Link>
        </div>
    );
}
