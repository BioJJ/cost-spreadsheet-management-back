import { Module } from '@nestjs/common'
import { CostService } from './cost.service'
import { CostController } from './cost.controller'
import { MulterModule } from '@nestjs/platform-express'
import { HttpModule } from '@nestjs/axios'
import { SequelizeModule } from '@nestjs/sequelize'
import { Cost } from './entities/cost.entity'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		SequelizeModule.forFeature([Cost]),
		MulterModule.register({
			dest: './uploads'
		}),
		HttpModule
	],
	controllers: [CostController],
	providers: [CostService]
})
export class CostModule {}
