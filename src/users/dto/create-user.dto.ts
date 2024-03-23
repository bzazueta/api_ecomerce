
///este archivo crea el objeto que vamos enviar ala bd a la tabla users para crear un usuario
export class CreateUserDto {

    name: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    image?: string;
    notification_token?: string;
}