import React, { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { Dropdown, DropdownItem } from "@tremor/react"
import { capitalize, classNames } from "@/helpers"
import { Transaction } from "@/types"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  categories: string[]
  selectedTransaction: Transaction
  refreshData: () => void
}
export default function TransactionDialog({
  open,
  setOpen,
  categories,
  selectedTransaction,
  refreshData,
}: Props) {
  const closeButtonRef = React.useRef(null)
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >(selectedTransaction.category)
  const [name, setName] = React.useState<string | undefined>(
    selectedTransaction.name
  )
  const [amount, setAmount] = React.useState<string>(
    parseFloat(selectedTransaction.price).toFixed(2)
  )
  const [date, setDate] = React.useState<string>(
    dayjs(selectedTransaction.date).utc().format("YYYY-MM-DD")
  )

  React.useEffect(() => {
    setSelectedCategory(selectedTransaction.category)
    setName(selectedTransaction.name)
    setAmount(parseFloat(selectedTransaction.price).toFixed(2))
    setDate(dayjs(selectedTransaction.date).utc().format("YYYY-MM-DD"))
  }, [selectedTransaction])

  const [saving, setSaving] = useState(false)
  async function handleSave() {
    setSaving(true)
    const transaction = {
      category: selectedCategory,
      name,
      price: amount,
      date,
    }
    await fetch(`/api/transaction/${selectedTransaction.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
    setSaving(false)
    setOpen(false)
    refreshData()
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <CurrencyDollarIcon
                      className="h-6 w-6 text-slate-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Edit Transaction
                    </Dialog.Title>
                    <div className="mt-8">
                      <div className="grid grid-cols-1 gap-y-10 border-b border-gray-900/10 pb-12">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                          <div className="col-span-full">
                            <label className="text-left block text-sm font-medium leading-6 text-gray-900">
                              Category
                            </label>
                            <div className="mt-2">
                              <Dropdown
                                className="mt-2"
                                placeholder="Uncategorized"
                                value={selectedCategory}
                                onValueChange={(value) =>
                                  setSelectedCategory(value)
                                }
                              >
                                {categories.map((category) => (
                                  <DropdownItem
                                    key={category}
                                    value={category}
                                    text={capitalize(
                                      category || "uncategorized"
                                    )}
                                  />
                                ))}
                              </Dropdown>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="name"
                              className="text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                id="name"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-800 sm:text-sm sm:leading-6"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="first-name"
                              className="text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Amount
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-800 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                  $
                                </span>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  className="focus:outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  value={amount}
                                  onChange={(e) =>
                                    setAmount(
                                      parseFloat(
                                        e.target.value.replace(/\D/g, "") || "0"
                                      ).toFixed(2)
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="date"
                              className="text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Date
                            </label>
                            <div className="mt-2">
                              <input
                                type="date"
                                id="date"
                                className="block w-full rounded-md border-0 py-1 h-9 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-2 focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-800 sm:text-sm sm:leading-6"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    disabled={saving}
                    type="button"
                    className={classNames(
                      "inline-flex w-full justify-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2",
                      saving ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition-all shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={closeButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
