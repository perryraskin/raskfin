/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ClerkLoading, SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import React from "react"

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  Grid,
  List,
  ListItem,
  Flex,
  Icon,
  Button,
  Bold,
  Metric,
  BarChart,
  Color,
  DeltaBar,
  DonutChart,
  Dropdown,
  DropdownItem,
  Col,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  DeltaType,
  MultiSelectBox,
  MultiSelectBoxItem,
  DateRangePicker,
  DateRangePickerValue,
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react"
import {
  BriefcaseIcon,
  ComputerDesktopIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
  BoltIcon,
  HomeIcon,
  TruckIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  ShoppingCartIcon,
  TvIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/solid"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
dayjs.extend(utc)
dayjs.extend(timezone)
import numeral from "numeral"
import {
  Account,
  CategoryStat,
  CategoryStatData,
  StatsResponse,
  Transaction,
} from "@/types"
import { categoryIconDict } from "@/constants/category-icons"
import { capitalize, classNames, valueFormatter } from "@/helpers"
import TransactionDialog from "@/components/TransactionDialog"
import OpenAI from "openai"

const Home = () => {
  const { user } = useUser()
  const [loadingSummary, setLoadingSummary] = React.useState(true)
  const [loadingData, setLoadingData] = React.useState(true)
  const [selectedView, setSelectedView] = React.useState("Summary")
  const [currentMonth, setCurrentMonth] = React.useState<CategoryStat>()
  const [currentMonthCategories, setCurrentMonthCategories] = React.useState<
    CategoryStatData[]
  >([])
  React.useEffect(() => {
    setCurrentMonthCategories(currentMonth?.dataList || [])
    console.log(currentMonth)
  }, [currentMonth])

  const [months, setMonths] = React.useState<CategoryStat[]>([])
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [categories, setCategories] = React.useState<string[]>([])
  const [transactions, setTransactions] = React.useState<Transaction[]>([])

  async function getAccounts() {
    const res = await fetch("/api/accounts")
    const data = await res.json()
    setAccounts(data)
  }

  async function getCategories() {
    const res = await fetch("/api/categories")
    const data = await res.json()
    setCategories(data)
  }

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
      }),
    })
    const data = await res.json()
    console.log(data)
    setTransactions(data)
    setLoadingData(false)
  }

  React.useEffect(() => {
    const getMonths = async () => {
      setLoadingSummary(true)
      const statsRes = await fetch("/api/stats")
      const stats: StatsResponse = await statsRes.json()
      const _currentMonth = stats.months[stats.months.length - 1]
      _currentMonth.dataList.forEach((category) => {
        // @ts-ignore
        // console.log(category)

        // @ts-ignore
        category.icon = categoryIconDict[category.name || "uncategorized"]?.icon
        // @ts-ignore
        category.color =
          categoryIconDict[category.name || "uncategorized"]?.color
      })
      console.log(_currentMonth)
      setCurrentMonth(_currentMonth)

      const _months = JSON.parse(JSON.stringify(stats.months)) as CategoryStat[]
      _months.forEach((month) => {
        const _3rdAmount = month.dataList[2]?.amount || 0
        month.dataList.forEach((category, i) => {
          if (category.amount < _3rdAmount) category.showInStatCard = false
          else category.showInStatCard = true
          // @ts-ignore
          // console.log(category)
          // @ts-ignore
          category.icon =
            categoryIconDict[category.name || "uncategorized"]?.icon
          // @ts-ignore
          category.color =
            categoryIconDict[category.name || "uncategorized"]?.color
        })
      })

      console.log(_months)
      setMonths(_months)
      setLoadingSummary(false)
    }

    async function init() {
      await getAccounts()
      await getCategories()
      await getMonths()
      await getTransactions()
    }
    if (user) {
      console.log("user:", user)
      init()
    }
  }, [user])

  const [dateRangeValue, setDateRangeValue] =
    React.useState<DateRangePickerValue>([
      dayjs().startOf("month").toDate(),
      dayjs().toDate(),
    ])
  const [selectedDateFrom, setSelectedDateFrom] = React.useState<string>(
    dayjs().startOf("month").format("YYYY-MM-DD")
  )
  const [selectedDateTo, setSelectedDateTo] = React.useState<string>(
    dayjs().format("YYYY-MM-DD")
  )
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<
    string[]
  >([])
  const [selectedAccountIds, setSelectedAccountIds] = React.useState<string[]>(
    []
  )
  React.useEffect(() => {
    async function getMerchantName(transaction: string): Promise<any> {
      const apiKey = "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"
      const prompt = `Given the transaction: "${transaction}", provide the merchant name.`
      const apiUrl = "https://api.openai.com/v1/chat/completions"
      const maxTokens = 15 // You can adjust the value based on your desired response length

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant. You only return one word string: the name of the merchant that was asked for by the user. Use your judgment and knowledge to capitalize the merchant name appropriately.",
              },
              { role: "user", content: prompt },
            ],
          }),
        })

        const data = await response.json()
        console.log(data)
        return data
      } catch (error) {
        console.error("Error:", error)
        return null
      }
    }

    // Usage
    const transaction = "STARBUCKS 800-782-7282 800-782-7282"
    getMerchantName(transaction)
      .then((data) => {
        console.log("Merchant Name:", data.choices[0].message.content)
      })
      .catch((error) => {
        console.error("Error:", error)
      })

    if (user) {
      getTransactions(
        selectedDateFrom,
        selectedDateTo,
        selectedCategoryIds,
        selectedAccountIds
      )
    }
  }, [
    user,
    selectedDateFrom,
    selectedDateTo,
    selectedCategoryIds,
    selectedAccountIds,
  ])

  React.useEffect(() => {
    console.log(dateRangeValue)
    setSelectedDateFrom(dayjs(dateRangeValue[0]).format("YYYY-MM-DD"))
    setSelectedDateTo(
      dateRangeValue[1]
        ? dayjs(dateRangeValue[1]).format("YYYY-MM-DD")
        : dayjs(dateRangeValue[0]).format("YYYY-MM-DD")
    )
  }, [dateRangeValue])

  const [openTransactionDialog, setOpenTransactionDialog] =
    React.useState(false)
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction>({
      id: "",
      price: "0",
      date: new Date(),
      accountId: "",
      Account: {
        id: "",
        name: "",
        lastFour: "",
      },
    })

  if (!user) return <></>
  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 xl:px-0 bg-slate-100">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <TabList
        defaultValue="Summary"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab
          value="Summary"
          text="Summary"
          className="text-gray-800 border-gray-800"
        />
        <Tab
          value="Transactions"
          text="Transactions"
          className="text-gray-800 border-gray-800"
        />
        <Tab
          value="Merchants"
          text="Merchants"
          className="text-gray-800 border-gray-800"
        />
      </TabList>

      <TransactionDialog
        open={openTransactionDialog}
        setOpen={setOpenTransactionDialog}
        categories={categories}
        selectedTransaction={selectedTransaction}
        refreshData={() =>
          getTransactions(
            selectedDateFrom,
            selectedDateTo,
            selectedCategoryIds,
            selectedAccountIds
          )
        }
      />

      {selectedView === "Summary" ? (
        <div className="mt-4 pb-20 bg-slate-100">
          {loadingSummary ? (
            <Card>
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-12 bg-slate-300 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-12 bg-slate-300 rounded"></div>
                    <div className="h-12 bg-slate-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="shadow-md">
              <div className="hidden sm:block">
                <Flex
                  className="space-x-4"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Title className="truncate">
                    Spendings by Category - {currentMonth?.name}
                  </Title>
                  <Dropdown
                    onValueChange={(value) =>
                      setCurrentMonth(
                        months.find((month) => month.name === value)
                      )
                    }
                    placeholder={currentMonth?.name}
                    className="max-w-xs absolute right-4"
                  >
                    {months.map((month) => (
                      <DropdownItem
                        key={month.name}
                        value={month.name}
                        text={month.name}
                      />
                    ))}
                  </Dropdown>
                </Flex>
              </div>
              {/* --- Same code snippet as above but with no flex to optmize mobile view --- */}
              <div className="sm:hidden">
                <Title className="truncate">
                  Spendings by Category - {currentMonth?.name}
                </Title>
                <Dropdown
                  onValueChange={(value) =>
                    setCurrentMonth(
                      months.find((month) => month.name === value)
                    )
                  }
                  placeholder={currentMonth?.name}
                  className="max-w-full mt-2"
                >
                  {months.map((month) => (
                    <DropdownItem
                      key={month.name}
                      value={month.name}
                      text={month.name}
                    />
                  ))}
                </Dropdown>
              </div>
              <Grid numColsLg={2} className="mt-8 gap-y-10 gap-x-14">
                <Flex>
                  <DonutChart
                    colors={
                      currentMonthCategories.map((category) => {
                        return category.color
                      }) as Color[]
                    }
                    data={currentMonth?.dataList || []}
                    category="amount"
                    index="name"
                    variant="donut"
                    valueFormatter={(value) => {
                      return numeral(value).format("$0,0")
                    }}
                    className="h-72 sm:h-96"
                  />
                </Flex>
                <Col numColSpan={1} numColSpanLg={1}>
                  <div className="hidden sm:block">
                    <List className="h-96 overflow-scroll">
                      {currentMonthCategories.map((category) => {
                        return (
                          <ListItem key={category.name}>
                            <Flex
                              justifyContent="start"
                              className="truncate space-x-4"
                            >
                              <Icon
                                variant="light"
                                icon={category.icon || QuestionMarkCircleIcon}
                                size="md"
                                color={category.color}
                              />
                              <div className="truncate">
                                <Text className="truncate">
                                  <Bold className="text-gray-700">
                                    {capitalize(
                                      category.name || "uncategorized"
                                    )}
                                  </Bold>
                                </Text>
                                <Text className="truncate">
                                  {`${category.numTransactions} transactions`}
                                </Text>
                              </div>
                            </Flex>
                            <Text
                              className={classNames(
                                category.amount < 0 ? "text-green-600" : ""
                              )}
                            >
                              {numeral(category.amount)
                                .format("$0,0.00")
                                .replace("-", "")}
                            </Text>
                          </ListItem>
                        )
                      })}
                    </List>
                  </div>

                  <div className="sm:hidden">
                    <List className="h-96 overflow-scroll">
                      {currentMonthCategories.map((category) => {
                        return (
                          <ListItem key={category.name}>
                            <Flex
                              justifyContent="start"
                              className="truncate space-x-4"
                            >
                              <Icon
                                variant="light"
                                icon={category.icon || QuestionMarkCircleIcon}
                                size="md"
                                color={category.color}
                              />
                              <div className="truncate">
                                <Text className="truncate">
                                  <Bold className="text-gray-700">
                                    {capitalize(
                                      category.name || "uncategorized"
                                    )}
                                  </Bold>
                                </Text>
                                <Text className="truncate">
                                  {`${category.numTransactions} transactions`}
                                </Text>
                              </div>
                            </Flex>
                            <Text
                              className={classNames(
                                category.amount < 0 ? "text-green-600" : ""
                              )}
                            >
                              {numeral(category.amount)
                                .format("$0,0.00")
                                .replace("-", "")}
                            </Text>
                          </ListItem>
                        )
                      })}
                    </List>
                  </div>
                </Col>
              </Grid>
            </Card>
          )}

          <div className="mt-6">
            <Grid numColsSm={2} numColsLg={3} className="gap-6 mt-4">
              {loadingSummary
                ? [1, 2, 3].map((i) => (
                    <Card key={i} className="shadow-md">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-slate-300 rounded"></div>
                            <div className="h-4 bg-slate-300 rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                : [months[0], months[1], months[2]].map((item) => {
                    if (item) {
                      return (
                        <Card key={item.name} className="shadow-md">
                          <Title>{item.name}</Title>
                          {/* <Text>{item.name}</Text> */}
                          <List>
                            {item.dataList.map((category) => {
                              if (category.showInStatCard) {
                                return (
                                  <ListItem key={category.name}>
                                    <Flex
                                      justifyContent="start"
                                      className="truncate space-x-4"
                                    >
                                      <Icon
                                        variant="light"
                                        icon={
                                          category.icon ||
                                          QuestionMarkCircleIcon
                                        }
                                        size="md"
                                        color={category.color}
                                      />
                                      <div className="truncate">
                                        <Text className="truncate">
                                          <Bold className="text-gray-700">
                                            {capitalize(
                                              category.name || "uncategorized"
                                            )}
                                          </Bold>
                                        </Text>
                                        <Text className="truncate">
                                          {`${category.numTransactions} transactions`}
                                        </Text>
                                      </div>
                                    </Flex>
                                    <Text
                                      className={classNames(
                                        category.amount < 0
                                          ? "text-green-600"
                                          : ""
                                      )}
                                    >
                                      {numeral(category.amount)
                                        .format("$0,0.00")
                                        .replace("-", "")}
                                    </Text>
                                  </ListItem>
                                )
                              }
                            })}
                          </List>
                          <Button
                            size="xs"
                            variant="light"
                            icon={ArrowSmallRightIcon}
                            iconPosition="right"
                            className="mt-4 text-gray-800 hover:text-gray-500"
                          >
                            Browse {item.name}
                          </Button>
                        </Card>
                      )
                    }
                  })}
            </Grid>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <Card>
            <div className="sm:flex space-y-2 sm:space-y-0 sm:space-x-2 space-x-0 justify-end">
              <MultiSelectBox
                onValueChange={(value) => setSelectedCategoryIds(value)}
                value={selectedCategoryIds}
                placeholder="All categories"
                className="sm:max-w-[10rem]"
              >
                {categories.map((category) => (
                  <MultiSelectBoxItem
                    key={category}
                    value={category}
                    text={capitalize(category || "uncategorized")}
                  />
                ))}
              </MultiSelectBox>
              <MultiSelectBox
                onValueChange={(value) => setSelectedAccountIds(value)}
                value={selectedAccountIds}
                placeholder="All accounts"
                className="sm:max-w-[16rem]"
              >
                {accounts.map((account) => (
                  <MultiSelectBoxItem
                    key={account.id}
                    value={account.id}
                    text={`${account.name} (${account.lastFour})`}
                  />
                ))}
              </MultiSelectBox>
              <DateRangePicker
                className="sm:max-w-md mx-auto"
                value={dateRangeValue}
                onValueChange={setDateRangeValue}
                dropdownPlaceholder="Select range"
              />
            </div>

            {/* ACCORDION LIST FOR MOBILE */}
            {/* <AccordionList className="mt-4 mx-auto sm:hidden">
              {loadingData ? (
                <div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Accordion key={i}>
                      <AccordionHeader>
                        <div className="animate-pulse flex space-x-4">
                          <div className="flex-1 space-y-4 py-1"></div>
                        </div>
                        <AccordionBody>
                          <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                              <div className="h-4 bg-slate-300 rounded w-3/4"></div>
                              <div className="space-y-2">
                                <div className="h-4 bg-slate-300 rounded"></div>
                                <div className="h-4 bg-slate-300 rounded w-5/6"></div>
                              </div>
                            </div>
                          </div>
                        </AccordionBody>
                      </AccordionHeader>
                    </Accordion>
                  ))}
                </div>
              ) : (
                <div>
                  {transactions.map((transaction) => (
                    <Accordion key={transaction.id}>
                      <AccordionHeader className="text-xs text-left">
                        {transaction.name}
                        <span className="ml-4 text-gray-500">
                          {numeral(transaction.price).format("$0,0.00")}
                        </span>
                      </AccordionHeader>
                      <AccordionBody>
                        {numeral(transaction.price).format("$0,0.00")}
                        <br />
                        {capitalize(transaction.category || "uncategorized")}
                        <br />
                        {dayjs(transaction.date).utc().format("MM/DD/YYYY")}
                        <br />
                        {transaction.Account.lastFour}
                        <br />
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction)
                            setOpenTransactionDialog(true)
                          }}
                          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit
                        </button>
                      </AccordionBody>
                    </Accordion>
                  ))}
                </div>
              )}
            </AccordionList> */}

            {/* TABLE FOR DESKTOP */}
            <Table className="mt-6">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell className="text-right">
                    Amount
                  </TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Account</TableHeaderCell>
                </TableRow>
              </TableHead>

              {loadingData ? (
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      {[1, 2, 3, 4, 5].map((j) => (
                        <TableCell key={j}>
                          <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                              <div className="h-6 bg-slate-300 rounded w-3/4"></div>
                            </div>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
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
                      <TableCell className="text-gray-800 max-w-[10rem] sm:max-w-none truncate sm:whitespace-normal">
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
              )}
            </Table>
          </Card>
        </div>
      )}
    </main>
  )
}

export default Home
