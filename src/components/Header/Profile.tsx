import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileDataProps{
    showProfileData: boolean;
}

export function Profile({showProfileData}:ProfileDataProps){
    return (
        <Flex align="center">
            { showProfileData && (
                <Box mr="4" textAlign="right">
                <Text>Ederaldo de Oliveira Constantino</Text>
                <Text
                    color="gray.300"
                    fontSize="small"
                >
                    ederaldo.constantino@moldsystems.com.br
                </Text>
            </Box>
            )}
            <Avatar size="md" name="Ederaldo de Oliveira Constantino" />
        </Flex>
    );
}