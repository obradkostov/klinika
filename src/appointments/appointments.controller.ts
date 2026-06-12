import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";

@Controller('appointments')
export class AppointmentsController {
    constructor(private appointmentsService: AppointmentsService) { }
    @Get()
    findAll() {
        return this.appointmentsService.findAll();
    }
    @Get('id')
    findOne(@Param('id') id: string) {
        return this.appointmentsService.findOne(+id);
    }
    @Get('doctor/:doctorId')
    findByDoctor(@Param('doctorId') doctorId: string) {
        return this.appointmentsService.findByDoctor(+doctorId);
    }
    @Get('patient/:patientId')
    findByPatient(@Param('patientId') patientId: string) {
        return this.appointmentsService.findByPatient(+patientId);
    }
    @Post()
    create(@Body() body: { dateTime: Date, reason: string, doctorId: number, patientId: number }) {
        return this.appointmentsService.create(body);
    }
    @Put(':id/status')
    update(@Param('id') id: string, @Body() status: string) {
        return this.appointmentsService.updateStatus(+id, status);
    }
    @Delete('id')
    remove(@Param('id') id: number) {
        this.appointmentsService.remove(id);
    }
}