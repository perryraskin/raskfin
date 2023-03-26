export const capitalize = (str: string | null | undefined) => {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(" ")

export const valueFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString()
