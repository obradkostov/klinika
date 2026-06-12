import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './docktors.controller';

@Module({
    imports:[PrismaModule],
    providers:[DoctorsService],
    controllers:[DoctorsController],
    exports:[DoctorsService]
})
export class DoctorsModule {}
