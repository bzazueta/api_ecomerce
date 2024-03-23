import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator"; //npm i --save class-validator class-transformer

export class RegisterAuthDto {
    
    @IsNotEmpty()///calse validator nos ayuida a validar los campos este campo no de se vacio
    @IsString()///calse validator nos ayuida a validar los campos este campo debe ser string
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'El email no es valido' })
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
    password: string;
    
    //rolesIds: string[];

}