import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

@Module({
    imports: [PrismaModule],
    providers: [AppointmentsService],
    controllers: [AppointmentsController],
    exports: [AppointmentsService]
})
export class AppointmentsModule { }
