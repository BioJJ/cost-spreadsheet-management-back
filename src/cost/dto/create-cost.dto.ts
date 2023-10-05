import { IsOptional, IsNotEmpty } from 'class-validator'

export class CreateCostDto {
	@IsOptional()
	id: number

	@IsNotEmpty()
	description: string

	@IsNotEmpty()
	transactionDate: Date

	@IsNotEmpty()
	transactionType: 'Débito' | 'Crédito'

	@IsNotEmpty()
	value: number

	@IsNotEmpty()
	recipient: string
}
