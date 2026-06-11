import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    async findByEmail(email:string){
        return this.prisma.user.findUnique({where:{email}});
    }
    async create(email:string,password:string,role?:any){
        const hashed=await bcrypt.hash(password,10);
        return this.prisma.user.create({
            data:{email,password:hashed,role}
        });
    }

}
