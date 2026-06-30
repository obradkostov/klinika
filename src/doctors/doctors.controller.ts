import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";

@Controller('doctors')
export class DoctorsController{
    constructor(private doctorsService:DoctorsService){}
    @Get()
    findAll(){
        return this.doctorsService.findAll();
    }
    @Get(':id')
    findOne(@Param('id')id:string){
        return this.doctorsService.findOne(+id);
    }   
    @Post()
    create(@Body()body:{firstName:string,lastName:string,specialization:string,userId:number}){
        return this.doctorsService.create(body);
    }
    @Put(':id')
    update(@Param('id')id:string,@Body() body:any){
        return this.doctorsService.update(+id,body);
    }    
    @Delete(':id')
    remove(@Param('id')id:string){
        this.doctorsService.remove(+id);
    }
}