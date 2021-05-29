import { Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { RiDashboard2Line, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";

export function SidebarNav(){
    return(
        <Stack spacing="12" align="flex-start">

                <NavSection title="GERAL">
                    <NavLink icon={RiDashboard2Line} href="/dashboard">DashBoard</NavLink>
                    <NavLink icon={RiContactsLine} href="/users">Usuários</NavLink>
                </NavSection>

                <NavSection title="AUTOMAÇÃO">
                    <NavLink icon={RiInputMethodLine} href="/forms">Formulários</NavLink>
                    <NavLink icon={RiGitMergeLine} href="/automation">Automação</NavLink>
                </NavSection>

            </Stack>
    );
}