import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

//npm install --save @nestjs/typeorm typeorm mysql2 nos permite instalar las librerioas de mysql type orm
//nos conectamos ala base de datos
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '162.241.61.218',
      port: 3306,
      database: 'monitode_homart',
      username: 'monitode_homar',
      password: '6]%$HgSsQ?s{',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],///sirve para indicar que tome todos los archivos con esas extenciones 6]%$HgSsQ?s{
      synchronize:  true,
      autoLoadEntities: true,
      //logging: true, // Habilita el registro de consultas SQL en la consola
     
      // logging: 'all', // Habilita registros detallados
     
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
