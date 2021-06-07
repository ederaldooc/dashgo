import { ActiveModelSerializer, createServer, Factory, Model, Response } from "miragejs";
import faker from 'faker';
import { number } from "yup/lib/locale";
import { NumberInput } from "@chakra-ui/react";

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer(){
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer
        },

        models: {
            user: Model.extend<Partial<User>>({})
        },

        factories:{
            user: Factory.extend({
                name(index: number) {
                    return `User ${index + 1}`;
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                }
            })
        },

        seeds(server){
            server.createList('user',200);
        },

        routes(){
            //Seta o namespace pra ficar /api/users
            this.namespace = 'api';
            //Seta um delay de 750 ms nas chamadas
            this.timing = 750;

            //Shorthand para listar os usuários
            this.get('/users', function(schema,request){
                const { page = 1, per_page = 10 }=request.queryParams

                const total = schema.all('user').length

                const pageStart = (Number(page) -1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);

                const users = this.serialize(schema.all('user'))
                .users.slice(pageStart,pageEnd);

                return new Response(
                    200,
                    {'x-total-count': String(total)},
                    { users }
                )
            });
            //Shorthand para pegar os dados de um único usuário
            this.get('/users:id');

            //Shorthand para criar um novo usuário
            this.post('/users');

            //Reseta o namespace pra evitar conflitos caso exista pasta api
            this.namespace = '';
            //Essa chamada é para que o mirage ignore o que não estiver no routes
            this.passthrough();
        }
    })
    return server;
}