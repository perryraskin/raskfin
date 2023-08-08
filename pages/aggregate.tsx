import React from 'react'
import { Title, Text, TabList, Tab, Card, Flex, Button, Bold, List, ListItem, Dropdown, DropdownItem, MultiSelectBox, MultiSelectBoxItem, DateRangePicker, AccordionList, Accordion, AccordionHeader, AccordionBody, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell } from '@components'
import { Transaction, Category, Account, Month } from '@types'
import { useUser } from '@lib'
import { capitalize, classNames, numeral, dayjs } from '@helpers'
import TransactionDialog from '@components/TransactionDialog'

const Aggregate = () => {
  // ...rest of the copied code from index.tsx...

  async function getTransactions(
    dateFrom: string | undefined = dayjs()
      .startOf("month")
      .format("YYYY-MM-DD"),
    dateTo: string | undefined = dayjs().format("YYYY-MM-DD"),
    category: string[] | undefined = undefined,
    accountId: string[] | undefined = undefined
  ) {
    setLoadingData(true)
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateFrom,
        dateTo,
        category,
        accountId,
        groupByName: true,
      }),
    })
    const data = await res.json()
    setTransactions(data)
    setLoadingData(false)
  }

  // ...rest of the copied code from index.tsx...

  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 xl:px-0 bg-slate-100">
      {/* ...rest of the copied code from index.tsx... */}
      <Table className="mt-6 hidden sm:block">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Total Amount
            </TableHeaderCell>
            <TableHeaderCell>Number of Transactions</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Account</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              className={classNames(
                "transition-all cursor-pointer",
                parseFloat(transaction.price) < 0
                  ? "hover:bg-green-50"
                  : "hover:bg-slate-50"
              )}
              onClick={() => {
                setSelectedTransaction(transaction)
                setOpenTransactionDialog(true)
              }}
            >
              <TableCell className="text-gray-800">
                {transaction.name}
              </TableCell>
              <TableCell
                className={classNames(
                  "text-right",
                  parseFloat(transaction.price) < 0
                    ? "text-green-600 font-medium"
                    : "text-gray-800"
                )}
              >
                {numeral(transaction.price)
                  .format("$0,0.00")
                  .replace("-", "")}
              </TableCell>
              <TableCell className="text-right">
                {transaction.numTransactions}
              </TableCell>
              <TableCell className="text-gray-800">
                {capitalize(transaction.category || "uncategorized")}
              </TableCell>
              <TableCell className="text-gray-800">
                {dayjs(transaction.date).utc().format("MM/DD/YYYY")}
              </TableCell>
              <TableCell className="text-gray-800">
                {transaction.Account.lastFour}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* ...rest of the copied code from index.tsx... */}
    </main>
  )
}

export default Aggregate