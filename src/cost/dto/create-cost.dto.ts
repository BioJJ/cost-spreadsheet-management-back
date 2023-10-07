import { IsOptional, IsNotEmpty } from 'class-validator'

export class CreateCostDto {
	@IsOptional()
	id: number

	@IsNotEmpty()
	description: string

	@IsNotEmpty()
	transactionDate: string

	@IsNotEmpty()
	transactionType: string

	@IsNotEmpty()
	value: number

	@IsNotEmpty()
	recipient: string
}
