import { Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox(){
    const [search, setSearch] = useState('');
    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full"
        >
            <Input
                color="gray.50"
                px="4"
                mr="4"
                variant="unstyled"
                placeholder="Buscar na pĺataforma"
                _placeholder={{ color: 'gray.400'}}
                value={search}
                onChange={ event => setSearch( event.target.value ) }
            />

            <Icon as={RiSearchLine} fontSize="20" />

        </Flex>
    );
}