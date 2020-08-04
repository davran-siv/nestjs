import { SortResultDto } from '../decorators/sort.decorator'

export interface SortAndFilters<F> {
  sort?: SortResultDto,
  filters?: F
}
