import { Body, Controller, Get, Post } from "@nestjs/common";
import { NursesService } from "./nurses.service";

@Controller('nurses')
export class NursesController{
    constructor(private nursesService:NursesService){}
    @Get()
    findAll(){
        return this.nursesService.findAll();
    }
    @Post()
    create(@Body() body:{firstName:string,lastName:string,userId:number}){
        return this.nursesService.create(body);
    }
}