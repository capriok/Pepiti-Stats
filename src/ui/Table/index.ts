/**
 *  table data can include any properties but must include unique _id
 */
export interface TableData {
  _id: string
  [key: string]: any
}

/**
 *  columns are simple; key used under the hood | label for header text | render for custom styling
 *  ? key: when the table maps data to columns, this is used to match data keys to columns by column keys
 *  ? label: when the table maps the columns, this is used as the header label text for the column
 *  ? render?:(optional) custom column renderer, fn called when rendering the table data rows
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
 */
export interface TableOptions {
  defaultPageSize?: number
  sortingKeys?: string[]
  searchKey?: string
  searchTerm?: string
  rankEnabled?: boolean
  searchEnabled?: boolean
  pageSizeEnabled?: boolean
  paginationEnabled?: boolean
  expandable?: {
    render: (record: TableData) => JSX.Element
    defaultExpandedId?: string
    onExpand?: (record: TableData) => void
  }
}

import Table from "./Table"
export default Table
