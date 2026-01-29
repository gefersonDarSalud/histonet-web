import type { ReactElement } from "react"

type MainProps = {
    children: ReactElement
    className?: string
}

export const Main = (props: MainProps) => {
    return (
        <main className={""}>
            {props.children}
        </main>
    )
}