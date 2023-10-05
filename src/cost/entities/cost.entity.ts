import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table({
	tableName: 'costs'
})
export class Cost extends Model {
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
	description: string

	@Column({
		type: DataType.DATE,
		allowNull: false,
		field: 'transaction_date'
	})
	transactionDate: Date

	@Column({
		type: DataType.ENUM('Débito', 'Crédito'),
		allowNull: true,
		field: 'transaction_type'
	})
	transactionType: 'Débito' | 'Crédito'

	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: false
	})
	value: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
		field: 'recipient'
	})
	recipient: string
}
