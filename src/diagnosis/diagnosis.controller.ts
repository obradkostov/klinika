import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DiagnosisService } from "./diagnosis.service";

@Controller('diagnosis')
export class DiagnosisController{
    constructor(private diagnosisService:DiagnosisService){}
    @Post()
    create(@Body() body:{description:string,prescription?:string,appointmentId:number}){
        return this.diagnosisService.create(body);        
    }
    @Get('appointment/:appointmentId')
    findAppointment(@Param('appointmentId') appointmentId:string){
        return this.diagnosisService.findByAppointment(+appointmentId);
    }

}