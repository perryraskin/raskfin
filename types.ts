import { Color } from "@tremor/react"

export interface CategoryStatData {
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
  name: string | null
  notes: string | null
  status: string | null
  type: string | null
  price: number
  category: string | null
  date: Date
  tellerTxnId: string | null
  accountId: string | null
  dateCreated: Date
  dateUpdated: Date
  userId: string | null
}
