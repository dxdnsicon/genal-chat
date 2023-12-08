import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getRepository } from 'typeorm'; 
import { GroupMessage } from './modules/group/entity/groupMessage.entity';

const ONE_WEEK = 86400000 * 7;

@Injectable()
export class MyTaskService {
  // @Cron(CronExpression.EVERY_10_SECONDS) //
  @Cron(CronExpression.EVERY_WEEKEND) // 每小时的整点执行
  async handleCron() {
    console.log('定时任务每小时执行一次');
    await getRepository(GroupMessage).query(`
      DELETE FROM group_message WHERE time <= ${+new Date(+new Date() - ONE_WEEK )}
    `);
  }
}