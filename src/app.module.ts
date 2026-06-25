import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PrismaService } from './prisma/prisma.service';
import { NursesModule } from './nurses/nurses.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';

@Module({
  imports: [UsersModule, AuthModule, DoctorsModule, PatientsModule, AppointmentsModule,PrismaModule,NursesModule,DiagnosisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
