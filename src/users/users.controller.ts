import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { UserService } from './users.service'
import { User } from './entities/user.entity'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@IsPublic()
	@Post()
	create(@Body() userData: Partial<User>): Promise<User> {
		return this.userService.create(userData)
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.userService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<User | null> {
		return this.userService.findOne(+id)
	}

	@Put(':id')
	update(
		@Param('id') id: number,
		@Body() userData: Partial<User>
	): Promise<number> {
		return this.userService.update(id, userData)
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<number> {
		return this.userService.remove(+id)
	}
}
