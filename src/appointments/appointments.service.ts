import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) { }
    async findAll() {
        return this.prisma.appointment.findMany({ include: { doctor: true, patient: true, diagnosis: true } });
    }
    async findOne(id: number) {
        return this.prisma.appointment.findUnique({
            where: { id },
            include: { doctor: true, patient: true, diagnosis: true },
        });
    }
    async findByDoctor(doctorId: number) {
        return this.prisma.appointment.findMany({
            where: { doctorId },
            include: { patient: true, diagnosis: true },
        });
    }

    async findByPatient(patientId: number) {
        return this.prisma.appointment.findMany({
            where: { patientId },
            include: { doctor: true, diagnosis: true },
        });
    }
    async create(data: {
        dateTime: Date,
        reason: string,
        doctorId: number,
        patientId: number
    }) {
        return this.prisma.appointment.create({
             data:{
                ...data,
                dateTime:new Date(data.dateTime)
             } 
            });
    }
    async updateStatus(id: number,status:string) {
        return this.prisma.appointment.update({ where: { id }, data:{status:status as any} });
    }

    async remove(id: number) {
        return this.prisma.appointment.delete({ where: { id } });
    }
}