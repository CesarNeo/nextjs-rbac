type BillingAmountType = {
  amount: number
  unit: number
  price: number
}

interface IBilling {
  seats: BillingAmountType
  projects: BillingAmountType
  total: number
}

export type { IBilling, BillingAmountType }
