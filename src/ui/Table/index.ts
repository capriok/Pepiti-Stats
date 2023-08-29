/**
 *  table data can include any properties but must include unique _id
 */
export interface TableData {
  _id: string
  [key: string]: any
}

/**
 *  columns are simple; key used under the hood | label for header text | render for custom styling
 *
 *  ? key: when the table maps data to columns, this is used to match data keys to columns by column keys
 *  ? label: when the table maps the columns, this is used as the header label text for the column
 *  ? render?:(optional) custom column style, fn called when rendering the table data rows
 *     if passed the table will return
 *     value: the rows data key value
 *     row: the full row data
 */
export interface TableColumn {
  key: string
  label: string | JSX.Element
  filters?: Array<{ key: string; value: string }>
  onFilter?: (value: any, row: TableData) => boolean
  render?: (value: any, row: TableData, i: number) => any
  width?: string
}

/**
 *  table options are controls that apply conditional logic within the table
 *  ? this interface is used to control key configurations within the rendering of the table
 *  ? if searchEnabled, pass searchKey prop to search on a  specific data key, default: name
 */
export interface TableOptions {
  defaultPageSize?: number
  sortingKeys?: string[]
  searchKey?: string
  searchTerm?: string
  searchEnabled?: boolean
  rankEnabled?: boolean
  resultsEnabled?: boolean
  jumpToEnabled?: boolean
  paginationEnabled?: boolean
  expandable?: {
    render: (record: TableData) => JSX.Element
    defaultExpandedId?: string
    onExpand?: (record: TableData) => void
    filter?: (record: TableData) => boolean // ! not implemented yet, all rows will be expandable for now
  }
}
export enum SortDirection {
  None = "off",
  Ascending = "asc",
  Descending = "desc",
}

const stringCompare = (a: string, b: string): number => a.localeCompare(b)
const numberCompare = (a: number, b: number): number => a - b
const booleanCompare = (a: boolean, b: boolean): number => (a ? 1 : 0) - (b ? 1 : 0)

export const genId = (id: string): string => {
  return id + Math.random().toString(36).substr(2, 12)
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

import Table from "./Table"
export default Table
