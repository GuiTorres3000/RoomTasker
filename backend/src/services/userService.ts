import prismaClient from "../../prisma";

interface userProps{
    name: string,
    email: string,
    password: string
}

class userService{
    async execute({name, email, password}: userProps){
        if(!name || !email || !password){
            throw new Error("Preencha o campo!");
        }

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password
            }
        });

        return user;
    }
}
export { userService }