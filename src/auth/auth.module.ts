import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([User]),//rol
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService],//, RolesService, JwtStrategy
  controllers: [AuthController]
})
export class AuthModule {}
