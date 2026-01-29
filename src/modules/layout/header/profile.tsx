import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    LogOut,
    User,
} from "lucide-react"
import { useAuthStore } from "#/stores/auth/useAuth"
import type { state } from "#/utils/types"

type ProfileProps = {
    modal: state<boolean>
}

export const Profile = ({modal}: ProfileProps) => {
    const { logout } = useAuthStore();
    return (
        <>
        <ButtonGroup>
            <DropdownMenu>
                <DropdownMenuTrigger >
                    <Button className="w-full px-4 text-black" variant="outline" size="icon" aria-label="More Options">
                        <span className=" font-semibold">
                            Geferson Moreno
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 z-10000">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={()=>modal.set(set => !set)}>
                            <User />
                            Perfil
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive" onClick={() => logout()}>
                            <LogOut />
                            Cerrar Sesión
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
        </>
    )
}


