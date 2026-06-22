import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { NursesService } from "./nurses.service";
import { NursesController } from "./nurses.controller";

@Module({
    imports:[PrismaModule],
    providers:[NursesService],
    controllers:[NursesController],
    exports:[NursesService]
})
export class NursesModule{}