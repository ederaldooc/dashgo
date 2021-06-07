import { Stack, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from:number, to:number){
    return [...new Array(to-from)]
        .map(( _ , index ) => {
            return from +index+1;
        }).filter(page => page > 0)
}

export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange
}:PaginationProps){
    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

    const previusPage = currentPage > 1
    ? generatePagesArray( currentPage -1 -siblingsCount, currentPage - 1)
    : []

    const nextPage = currentPage < lastPage
    ? generatePagesArray( currentPage, Math.min(currentPage + siblingsCount, lastPage) )
    : []

    return (
        <Stack
            direction={["column","row"]}
            spacing="6"
            mt="8"
            justify="space-between"
            align="center"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
                
                {currentPage > ( 1 + siblingsCount) && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={1} />
                        { currentPage > (2 + siblingsCount) && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>)}
                    </>
                )}

                { previusPage.length > 0 && previusPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} number={page} />
                })}

                <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

                { nextPage.length > 0 && nextPage.map(page => {
                    return <PaginationItem onPageChange={onPageChange} number={page} />
                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        <PaginationItem onPageChange={onPageChange} number={lastPage} />
                        { (currentPage + 1 + siblingsCount) < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>)}
                    </>
                )}

            </Stack>
        </Stack>
    );
}