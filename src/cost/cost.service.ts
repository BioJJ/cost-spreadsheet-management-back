import { Injectable } from '@nestjs/common'
import { Cost } from './entities/cost.entity'

@Injectable()
export class CostService {
	create(costData: Partial<Cost>) {
		return Cost.create(costData)
	}

	async findAll(): Promise<Cost[]> {
		return Cost.findAll()
	}

	async findOne(id: number): Promise<Cost | null> {
		return Cost.findByPk(id)
	}

	async update(id: number, CostData: Partial<Cost>): Promise<number> {
		const [affectedRows] = await Cost.update(CostData, { where: { id } })
		return affectedRows
	}

	async remove(id: number): Promise<number> {
		const result = await Cost.destroy({ where: { id } })
		return result
	}
}
