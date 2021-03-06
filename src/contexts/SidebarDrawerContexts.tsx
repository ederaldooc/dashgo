import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, ReactNode } from "react";

interface SidebarDrawerProvidersProps {
    children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider( { children }: SidebarDrawerProvidersProps){
    const disclosure = useDisclosure()

    const router = useRouter()
    
    useEffect(() =>{
        disclosure.onClose()
    },[router.asPath])

    return(
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )    
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)