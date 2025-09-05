import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <Card className="w-full max-w-sm text-center p-6 shadow-lg rounded-xl transition-all duration-300 transform hover:scale-105">
        <CardHeader>
          <CardTitle className="text-6xl font-extrabold text-red-600 dark:text-red-400 animate-pulse">
            404
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
            ¡Página no encontrada!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Parece que te has perdido en el espacio.
            No te preocupes, esto le sucede a los mejores.
          </p>
          <a href="/">
            <Button
              className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-md font-bold py-2 px-4 transition-colors duration-300 shadow-md"
            >
              Volver al inicio
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
