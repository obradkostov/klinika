import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PatientsService } from "./patients.service";

@Controller('patients')
export class PatientsController{
    constructor(private patientsService:PatientsService){}
    @Get()
    findAll(){
        return this.patientsService.findAll();
    }
    @Get(':id')
    findOne(@Param('id')id:string){
        return this.patientsService.findOne(+id);
    }   
    @Post()
    create(@Body()body:{firstName:string,lastName:string,dateOfBirth:string,userId:number}){
        return this.patientsService.create(body);
    }
    @Put(':id')
    update(@Param('id')id:string,@Body() body:any){
        return this.patientsService.update(+id,body);
    }    
    @Delete(':id')
    remove(@Param('id')id:string){
        return this.patientsService.remove(+id);
    }
}