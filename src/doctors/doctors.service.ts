import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DoctorsService {
    constructor(private prisma: PrismaService) { }
    async findAll() {
        return this.prisma.doctor.findMany({ include: { user: true } });
    }
    async findOne(id: number) {
        return this.prisma.doctor.findUnique({
            where: { id },
            include: { user: true }
        });
    }
    async create(data: {
        firstName: string,
        lastName: string,
        specialization: string,
        userId: number
    }) {
        return this.prisma.doctor.create({ data });
    }
    async update(id: number, data: Partial<{ firstName: string; lastName: string; specialization: string }>) {
        return this.prisma.doctor.update({ where: { id }, data });
    }

    async remove(id: number) {
        return this.prisma.doctor.delete({ where: { id } });
    }
}