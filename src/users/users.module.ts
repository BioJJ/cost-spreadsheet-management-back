import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserService } from './users.service'
import { UserController } from './users.controller'
import { User } from './entities/user.entity'

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UsersModule {}
