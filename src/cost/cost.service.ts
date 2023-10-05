import { Injectable } from '@nestjs/common'
import { Cost } from './entities/cost.entity'
import { lastValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class CostService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {}

	async sendToExternalApi(file: Express.Multer.File): Promise<Cost[]> {
		const url = this.configService.get('API_PYTHON')

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
		const body = {
			file
		}

		const response = await lastValueFrom(
			this.httpService.post<Cost[]>(url, body, config)
		)
		return response.data
	}

	async createOrUpdate(castList: Cost[]) {
		const createdOrUpdatedCosts = []
		for (const cost of castList) {
			if (cost.id === -1) {
				const createCostDto = {
					description: cost.description,
					transactionDate: cost.transactionDate,
					transactionType: cost.transactionType,
					value: cost.value,
					recipient: cost.recipient
				}
				const newCost = await this.create(createCostDto)
				createdOrUpdatedCosts.push(newCost)
			} else if (cost.id > -1) {
				const costVerify = await this.findOne(cost.id)

				const updateCostDto = {
					description: cost.description,
					transactionDate: cost.transactionDate,
					transactionType: cost.transactionType,
					value: cost.value,
					recipient: cost.recipient
				}

				if (costVerify) {
					const affectedRows = await this.update(cost.id, updateCostDto)
					if (affectedRows === 1) {
						const updatedCost = await this.findOne(cost.id)
						createdOrUpdatedCosts.push(updatedCost)
					} else {
						throw new Error('Falha na atualização do Cost.')
					}
				} else {
					const newCost = await this.create(updateCostDto)
					createdOrUpdatedCosts.push(newCost)
				}
			} else {
				throw new Error('Valor de id inválido retornado pela API externa.')
			}
		}
		return createdOrUpdatedCosts
	}

	async create(costData: Partial<Cost>) {
		return await Cost.create(costData)
	}
	async update(id: number, CostData: Partial<Cost>): Promise<number> {
		const [affectedRows] = await Cost.update(CostData, { where: { id } })
		return affectedRows
	}

	async findAll(): Promise<Cost[]> {
		return Cost.findAll()
	}

	async findOne(id: number): Promise<Cost | null> {
		return Cost.findByPk(id)
	}

	async remove(id: number): Promise<number> {
		const result = await Cost.destroy({ where: { id } })
		return result
	}
}
