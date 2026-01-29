import { Button } from "@/components/ui/button";
import { X } from "lucide-react";



type props = {
    antecedent: string
    handlerOnClick: (antecedente: string) => void
}

export const InputTagBadge = ({ antecedent, handlerOnClick }: props) => {
    return (
        <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
            key={antecedent}
        >
            {antecedent}
            <Button className="size-4 p-0 rounded-full hover:bg-secondary/70 text-secondary-foreground/70 hover:text-secondary-foreground"
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handlerOnClick(antecedent)}
                aria-label={`Eliminar antecedente ${antecedent}`}
            >
                <X />
            </Button>
        </div>
    )
}