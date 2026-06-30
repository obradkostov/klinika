import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NursesService{
    constructor(private prisma:PrismaService){}
    async findAll(){
        return this.prisma.nurse.findMany({include:{user:true}});
    }
    async create(data:{firstName:string,lastName:string,userId:number}){
        return this.prisma.nurse.create({data});
    }
    async remove(id:number){
        return this.prisma.nurse.delete({where:{id}});
    }
}