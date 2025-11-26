import colors from "$/theme/colors"
import { ThreeDot } from "react-loading-indicators"

export const Loading = () => {
    return (
        <ThreeDot variant="bob" color={colors.third} size="small" text="" textColor="#8f1818" />
    )
}