export interface payBudgetDiffInfo{
  all: {
    budget: number[],
    payment: number[]
  },
  food: {
    budget: number[],
    payment: number[]
  },
  hotel: {
    budget: number[],
    payment: number[]
  },
  other: {
    budget: number[],
    payment: number[]
  },
  vehicle: {
    budget: number[],
    payment: number[]
  }
}