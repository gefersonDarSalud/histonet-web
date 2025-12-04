import type { IdName } from "#/core/entities"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"


type BusinessCardProps = {
    row: number;
    business: IdName;
    insurance: IdName;
    onDelete: (contractRow: number) => void;
}

export const BusinessCard = ({ business, insurance, row, onDelete }: BusinessCardProps) => {
    return (
        <Card id={`business-card${row}`} className="mb-5">
            <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription>{insurance.name}</CardDescription>
                <CardAction className="flex justify-between gap-3">
                    <Button variant="outline" onClick={() => onDelete(row)}>
                        <X className="text-red-500" />
                    </Button>
                </CardAction>
            </CardHeader>
        </Card>
    )
}