import {
	Model,
	Column,
	Table,
	DataType,
	BeforeCreate
} from 'sequelize-typescript'
import { hashSync } from 'bcrypt'

@Table({
	tableName: 'users'
})
export class User extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	email: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string

	@BeforeCreate
	static hashPassword(instance: User) {
		instance.password = hashSync(instance.password, 10)
	}
}
