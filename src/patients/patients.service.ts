import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PatientsService {
    constructor(private prisma: PrismaService) { }
    async findAll() {
        return this.prisma.patient.findMany({ include: { user: true } });
    }
    async findOne(id: number) {
        return this.prisma.patient.findUnique({
            where: { id },
            include: { user: true }
        });
    }
    async create(data: {
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        userId: number
    }) {
        return this.prisma.patient.create({ data });
    }
    async update(id: number, data: Partial<{ firstName: string; lastName: string; dateOfBirth: string }>) {
        return this.prisma.patient.update({ where: { id }, data });
    }

    async remove(id: number) {
        return this.prisma.patient.delete({ where: { id } });
    }
    async findByUserId(userId: number) {
        return this.prisma.patient.findFirst({ where: { userId } });
    }
}