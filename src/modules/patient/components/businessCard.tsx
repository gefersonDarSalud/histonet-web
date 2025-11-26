import type { IdName } from "#/core/entities"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, X } from "lucide-react"


type BusinessCardProps = {
    business: IdName;
    insurance: IdName;
}

export const BusinessCard = ({ business, insurance }: BusinessCardProps) => {
    return (
        <Card id={`business-card${business.id}}`} className="mb-5">
            <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription>{insurance.name}</CardDescription>
                <CardAction className="flex justify-between gap-3">
                    <Button variant="outline"><Edit /></Button>
                    <Button variant="outline"><X className="text-red-500" /></Button>
                </CardAction>
            </CardHeader>
        </Card>
    )
}