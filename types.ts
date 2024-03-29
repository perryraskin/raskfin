import { Color } from "@tremor/react"

export interface ICurrentMonthFilters {
  includePendingTransactions: boolean
}

export interface CategoryStatData {
  showInStatCard?: boolean
  name?: string
  icon?: React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
  >
  color?: Color
  numTransactions: number
  amount: number
}

export interface CategoryStat {
  date: Date
  name: string
  dataList: CategoryStatData[]
  data: {
    [key: string]: CategoryStatData
  }
}

export interface StatsMonthsResponse {
  month: string
  category: string
  count: string
  total_amount: string
}

export interface StatsResponse {
  months: CategoryStat[]
}

export interface Transaction {
  id: string
  name?: string
  notes?: string
  status?: string
  type?: string
  price: string
  category?: string
  date: Date
  tellerTxnId?: string
  accountId: string
  dateCreated?: Date
  dateUpdated?: Date
  userId?: string
  Account: Account
}

export interface MerchantSpendTotal {
  merchant: string
  totalSpent: number
}

export interface Account {
  id: string
  name: string
  lastFour: string
  institutionName?: string
  status?: string
  type?: string
  subtype?: string
  currency?: string
  enrollmentId?: string
  tellerAccountId?: string
}

export interface SignupBonus {
  id: string
  dateCreated: Date
  dateUpdated: Date
  Account: Account
  minSpend: number
  currentSpend: number
  spendByDate: Date
}
