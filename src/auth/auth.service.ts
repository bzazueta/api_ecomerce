import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
       // @InjectRepository(Rol) private rolesRepository: Repository<Rol>,
         private jwtService: JwtService
    ) {}

    async register(user: RegisterAuthDto) {

        const { email, phone } = user; //obtenemos los valores de user email y phone
        const emailExist = await this.usersRepository.findOneBy({ email: email })///metodo typeorm que nos permite hacer una peticion por email campode bd de usuario etc

        if (emailExist) {///validamos si existe
            // 409 CONFLICT  HttpStatus.CONFLICT) https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
            throw new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExist = await this.usersRepository.findOneBy({phone: phone});

        if (phoneExist) {
            throw new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT)
        }

        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
        //metodo typeorm que nos permite crear
        //metodo typeorm que nos guardar
    }

    async login(loginData: LoginAuthDto) {

        const { email, password } = loginData;
        const userFound = await this.usersRepository.findOne({ 
            where: { email: email },
            //relations: ['roles']
         })
        if (!userFound) {
            throw new HttpException('El email no existe', HttpStatus.NOT_FOUND);
        }
        
        const isPasswordValid = await compare(password, userFound.password);//comprobamos si la contraseña es correcta
        if (!isPasswordValid) {
            console.log('PASSWORD INCORRECTO');
            
            // 403 FORBITTEN access denied
            throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }

        // const rolesIds = userFound.roles.map(rol => rol.id); //['CLIENT', 'ADMIN']

        const payload = { 
            id: userFound.id, 
            name: userFound.name, 
            //roles: rolesIds 
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: 'Bearer ' + token
        }

        delete data.user.password;
        return data;
    }
}
