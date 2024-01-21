import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){

        //verificar se enviou o email
        if(!email){
            throw new Error("Email incorrect");
        }
        //verificar se o email ja esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(userAlreadyExists){
            throw new Error("User Already Exists!");
        }

        const passwordHash = await hash(password, 8);

        //cadastrar o usuario
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        return user;
    }
}

export { CreateUserService};