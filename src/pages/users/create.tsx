import { Box, Divider, Flex, Heading, SimpleGrid, VStack, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../components/form/input';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/Sidebar';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};
  
const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais')
})

const handleCreateUserSubmit: SubmitHandler<CreateUserFormData> = (values) => {
console.log(values)
}

export default function CreateUser(){
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    })
    return(
        <Box>
            <Header/>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                <SideBar />

                <Box 
                    as="form"
                    flex="1" 
                    borderRadius={8} 
                    bg="gray.800" 
                    p={["6","8"]}
                    onSubmit={handleSubmit(handleCreateUserSubmit)}
                >
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
                  
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%" >
                            <Input 
                                name="name" 
                                label="Nome completo" 
                                error={errors.name}
                                {...register("name")}/>
                            <Input 
                                name="email" 
                                type="email" 
                                label="E-mail" 
                                error={errors.email}
                                {...register("email")}/>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%" >
                            <Input 
                                name="password" 
                                type="password" 
                                label="Senha" 
                                error={errors.password}
                                {...register("password")}/>
                            <Input 
                                name="password_confirmation" 
                                type="password" 
                                label="Confirmação da senha" 
                                error={errors.password_confirmation}
                                {...register("password_confirmation")}/>
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button 
                                type="submit" 
                                colorScheme="pink"
                                isLoading={isSubmitting} >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>

                </Box>
            </Flex>
        </Box>
    );
}