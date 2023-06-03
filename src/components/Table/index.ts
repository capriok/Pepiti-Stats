import { TableData } from "./Table"

export enum SortDirection {
  None = "off",
  Ascending = "asc",
  Descending = "desc",
}

export const cycleSortingDirection = (dir: SortDirection): SortDirection => {
  switch (dir) {
    case "off":
      return SortDirection.Ascending
    case "asc":
      return SortDirection.Descending
    case "desc":
      return SortDirection.None
    default:
      return SortDirection.None
  }
}

export const sortDataByColumn = (
  data: Array<TableData>,
  key: string,
  dir: SortDirection
): Array<TableData> => {
  return data.sort((a, b) => {
    let res: number

    if (typeof a[key] === "string") {
      res = stringCompare(a[key] ?? "", b[key] ?? "")
    } else if (typeof a[key] === "number") {
      res = numberCompare(a[key] ?? 0, b[key] ?? 0)
    } else if (typeof a[key] === "boolean") {
      res = booleanCompare(a[key] ?? false, b[key] ?? false)
    } else {
      throw new Error("Invalid column type")
    }

    if (res === 0) res = data.indexOf(b) - data.indexOf(a)
    if (dir === "desc") res = -res

    return res
  })
  
}

const stringCompare = (a: string, b: string): number => a.localeCompare(b)
const numberCompare = (a: number, b: number): number => a - b
const booleanCompare = (a: boolean, b: boolean): number => (a ? 1 : 0) - (b ? 1 : 0)