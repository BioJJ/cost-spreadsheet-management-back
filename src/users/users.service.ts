import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
	async create(userData: Partial<User>): Promise<User> {
		return await User.create(userData)
	}

	async findAll(): Promise<User[]> {
		return await User.findAll()
	}

	async findOne(id: number): Promise<User | null> {
		return await User.findByPk(id)
	}

	async findEmail(email: string): Promise<User | null> {
		return await User.findOne({ where: { email } })
	}

	async update(id: number, userData: Partial<User>): Promise<number> {
		const [affectedRows] = await User.update(userData, { where: { id } })
		return affectedRows
	}

	async remove(id: number): Promise<number> {
		const result = await User.destroy({ where: { id } })
		return result
	}
}
