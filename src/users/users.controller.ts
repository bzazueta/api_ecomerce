import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')//nombre del controlador
export class UsersController {
    //usersService: any;

      constructor(private usersService :UsersService){}

    ///aqui se cran las rutas de nuestra api rest
    @Post() // http://localhost/users -> POST  ruta para hacer la pétición 
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user);///inyectamos el userservice
    }

}
