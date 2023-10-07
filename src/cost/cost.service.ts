import { Injectable, UploadedFile } from '@nestjs/common'
import { Cost } from './entities/cost.entity'
import { lastValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import * as FormData from 'form-data'
import { createReadStream } from 'fs'

@Injectable()
export class CostService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {}

	async sendToExternalApi(file: Express.Multer.File): Promise<Cost[]> {
		const host = this.configService.get('API_PYTHON') || 'http://127.0.0.1'
		const port = this.configService.get('API_PYTHON_PORT') || '5000'
		console.log('host ==> ', host)
		console.log('port ==> ', port)
		let url = ''
		if (host) {
			url = `http://${host}`
		}

		try {
			const formData = new FormData()
			formData.append('file', createReadStream(file.path), {
				filename: file.originalname,
				contentType: file.mimetype
			})

			const config = {
				headers: {
					...formData.getHeaders()
				}
			}

			const response = await lastValueFrom(
				this.httpService.post(
					`${url}:${port}/processar-planilha`,
					formData,
					config
				)
			)

			return response.data
		} catch (error) {
			throw error
		}
	}

	async testToExternalApi(): Promise<string> {
		const host = this.configService.get('API_PYTHON') || 'http://127.0.0.1'
		const port = this.configService.get('API_PYTHON_PORT') || '5000'
		console.log('host ==> ', host)
		console.log('port ==> ', port)
		let url = ''
		if (host) {
			url = `http://${host}`
		}
		try {
			const response = await lastValueFrom(
				this.httpService.get(`${url}:${port}/test`)
			)

			return response.data
		} catch (error) {
			console.error('error ==>', error)
			throw error
		}
	}

	async createOrUpdate(castList: Cost[]) {
		if (castList) {
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
		} else {
			throw new Error('Lista vazia')
		}
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
