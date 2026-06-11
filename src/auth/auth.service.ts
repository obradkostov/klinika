import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService,
    ){}
    async login(email:string,password:string){
        const user=await this.usersService.findByEmail(email);
        if(!user) throw new UnauthorizedException("Nevazeca email adresa");
        const valid=await bcrypt.compare(password,user.password);
        if(!user) throw new UnauthorizedException("Nevazeca email adresa");
        const payload={sub:user.id,email:user.email,role:user.role};
        return {
            access_token:this.jwtService.sign(payload),
        };
    }
    async register(email:string,password:string,role?:any){
        return this.usersService.create(email,password,role);
    }
}
