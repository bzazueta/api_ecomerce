import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { hash } from 'bcrypt';///dependencia que sirve para encriptar el password npm install bcrypt
// import { Rol } from 'src/roles/rol.entity';


////al correr este archivo crea la tabla users son ls mismos campos que la tabla users de la bd
@Entity({ name: 'users_ecommerce' }) //nombre de la tabla
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    lastname: string;

    @Column({ unique: true })///{ unique: true } unique valor unico no puede duplcarse
    email: string;
    
    @Column({ unique: true })///
    phone: string;
    
    @Column({ nullable: true })
    image: string;
    
    @Column()
    password: string;
    
    @Column({ nullable: true })///campo nulo
    notification_token: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })///le agrega por defecto la fecha actual
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // @JoinTable({
    //     name: 'user_has_roles',
    //     joinColumn: {
    //         name: 'id_user'
    //     },
    //     inverseJoinColumn: {
    //         name: 'id_rol'
    //     }
    // })
    // @ManyToMany(() => Rol, (rol) => rol.users)
    // roles: Rol[];

    @BeforeInsert()///siempre lleva esta etiqueta
    async hashPassword() {///metodo que encripta un password
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}


