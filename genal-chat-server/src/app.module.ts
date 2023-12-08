import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { FriendModule } from './modules/friend/friend.module';
import { GroupModule } from './modules/group/group.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } from './config';
import { MyTaskService } from './schedule';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: 'chat',
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    ChatModule,
    FriendModule,
    GroupModule,
    AuthModule,
    ScheduleModule.forRoot()
  ],
  providers: [
    MyTaskService
  ]
})
export class AppModule {}
