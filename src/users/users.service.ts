import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

//aqui se crean la operaciones o metodos para obtener y crear usuarios

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,///inyectamos el repository. esta clase Repository tiene todos los metodos
        // como create,save etc y le pasamops la entidad user.entity =>Repository<User>
    ) {}
    
    create(user: CreateUserDto) {///metodo paa crear el user
        const newUser = this.usersRepository.create(user);///accedemos al user repository y le pasamos el user
        return this.usersRepository.save(newUser);///accedemos al user repository y le pasamos el newuser
    }
}

