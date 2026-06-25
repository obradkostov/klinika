import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DiagnosisService } from "./diagnosis.service";
import { DiagnosisController } from "./diagnosis.controller";

@Module({
    imports:[PrismaModule],
    providers:[DiagnosisService],
    controllers:[DiagnosisController],
    exports:[DiagnosisService]
})
export class DiagnosisModule{}