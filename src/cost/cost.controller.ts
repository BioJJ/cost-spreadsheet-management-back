import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { CostService } from './cost.service'
import { CreateCostDto } from './dto/create-cost.dto'
import { UpdateCostDto } from './dto/update-cost.dto'
import { Cost } from './entities/cost.entity'

@Controller('cost')
export class CostController {
	constructor(private readonly costService: CostService) {}

	@Post()
	async create(@Body() createCostDto: CreateCostDto): Promise<Cost> {
		return this.costService.create(createCostDto)
	}

	@Get()
	async findAll(): Promise<Cost[]> {
		return await this.costService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Cost> {
		return await this.costService.findOne(+id)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateCostDto: UpdateCostDto
	): Promise<number> {
		return await this.costService.update(+id, updateCostDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<number> {
		return await this.costService.remove(+id)
	}
}
