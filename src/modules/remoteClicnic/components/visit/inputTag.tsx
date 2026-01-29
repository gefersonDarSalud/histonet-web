import { Paperclip, Globe, ChevronUp, AtSign, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const InputTag = () => {
    return (
        <div className="w-full max-w-2xl p-4 mx-auto">
            {/* Contenedor Principal */}
            <div className="relative flex flex-col w-full p-3 bg-white border rounded-3xl shadow-sm focus-within:ring-1 focus-within:ring-ring border-input">

                {/* Fila Superior: Context Tags */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 border rounded-full text-muted-foreground">
                        <AtSign className="w-4 h-4" />
                    </div>
                    <Badge
                        variant="secondary"
                        className="flex items-center gap-1 py-1 pl-2 pr-1 font-medium bg-secondary/50 hover:bg-secondary/70 text-sm rounded-lg"
                    >
                        <span className="w-3 h-3 bg-red-400 rounded-sm inline-block mr-1"></span>
                        Project Dashboard
                        <Button variant="ghost" size="icon" className="w-4 h-4 p-0 ml-1 hover:bg-transparent">
                            <X className="w-3 h-3 text-muted-foreground" />
                        </Button>
                    </Badge>
                </div>

                {/* Área de Texto / Input */}
                <textarea
                    placeholder="Ask, search, or make anything..."
                    className="w-full min-h-[60px] bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-lg placeholder:text-muted-foreground/60 px-1"
                />

                {/* Fila Inferior: Herramientas y Envío */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-full gap-2 px-3">
                            <Paperclip className="w-4 h-4" />
                        </Button>

                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium px-3">
                            Auto
                        </Button>

                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-full gap-2 px-3">
                            <Globe className="w-4 h-4" />
                            All Sources
                        </Button>
                    </div>

                    <Button size="icon" className="rounded-full bg-black hover:bg-black/90 text-white w-10 h-10">
                        <ChevronUp className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}