import type { IdName } from "#/core/entities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import type { VisitFormValues } from "@/remoteClicnic/validations/ClinicalInterview"
import { Newspaper, NotebookText } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

type CardProps = {
    children: React.ReactNode
    title: string,
}


const CardCheckbox = ({ children, title }: CardProps) => {
    return (
        <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <p className="text-sm leading-none font-medium">
                {title}
            </p>
            {children}

        </Label>
    );
}

type props = {
    form: UseFormReturn<VisitFormValues>;
}

const familiesList: IdName[] = [
    { id: '1', name: 'Padre' },
    { id: '2', name: 'Madre' },
    { id: '5', name: 'Abuelo' },
    { id: '6', name: 'Abuela' },
    { id: '7', name: 'Tío' },
    { id: '8', name: 'Tía' },
]

export const FamilyHistory = (props: props) => {
    return (
        <Card className="max-h-64 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground ">
                    <Newspaper />Antecedentes Familiares
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {familiesList.map(family =>
                    <CardCheckbox title={family.name} key={family.id}>
                        <InputGroup>
                            <InputGroupInput placeholder="Ingrese la patología" className="w-full" />
                            <InputGroupAddon>
                                <NotebookText />
                            </InputGroupAddon>
                        </InputGroup>
                    </CardCheckbox>
                )}
            </CardContent>
        </Card>
    )
}
