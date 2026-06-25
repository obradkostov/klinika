import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DiagnosisService{
    constructor(private prisma:PrismaService){}
    async create(data:{description:string,prescription?:string,appointmentId:number}){
        return this.prisma.diagnosis.create({data});
    }
    async findByAppointment(appointmentId:number){
        return this.prisma.diagnosis.findUnique({where:{appointmentId}});
    }
}