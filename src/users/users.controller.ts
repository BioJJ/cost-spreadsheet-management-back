import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { UserService } from './users.service'
import { User } from './entities/user.entity'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@IsPublic()
	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.userService.create(createUserDto)
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User | null> {
		return await this.userService.findOne(+id)
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto
	): Promise<number> {
		return await this.userService.update(id, updateUserDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<number> {
		return await this.userService.remove(+id)
	}
}
