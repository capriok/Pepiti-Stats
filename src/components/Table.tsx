"use client"

import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { handleRankColor } from "~/utils/handleRankColor"

/**
 *  table data can include any properties but must include unique _id
 */
interface TableData {
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

interface TableColumn {
  key: string
  label: string | JSX.Element
  render?: (value: any, row: TableData) => any
}

interface TableProps extends TableOptions {
  data: Array<TableData>
  columns: Array<TableColumn>
}

/**
 *  table options are controls that apply conditional logic within the table
 *  ? this interface is used to control key configurations within the rendering of the table
 *  ? if searchEnabled, pass searchKey prop to search on a  specific data key, default: name
 */
export interface TableOptions {
  paginationEnabled?: boolean
  jumpToEnabled?: boolean
  defaultPageSize?: number
  searchEnabled?: boolean
  searchKey?: string
  searchTerm?: string
  rankEnabled?: boolean
  rankStyle?: boolean
  headerCn?: string
  rowCn?: string
}

const Table: React.FC<TableProps> = (props) => {
  const {
    paginationEnabled = false,
    jumpToEnabled = true,
    defaultPageSize = 10,
    searchEnabled = false,
    searchKey = "name",
    searchTerm = "",
    rankEnabled = true,
    rankStyle = true,
  } = props

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [term, setTerm] = useState(searchTerm)
  const [sorting, setSorting] = useState({
    data: props.data,
    dir: SortDirection.None,
    key: null,
  })

  console.log("%cTable: Original", "color: steelblue", { data: props.data })

  /** preps the data for the table to use */
  const manipulatedData = () => {
    if (term) {
      /** * filter data by record[searchKey] search term */
      return props.data.filter((record) => {
        if (typeof record[searchKey] === "string") {
          return record[searchKey].toLowerCase().includes(term.toLowerCase())
        }
        if (typeof record[searchKey] === "number") {
          return record[searchKey].toString().includes(term)
        }
        return
      })
    }
    return props.data.map((d, i) => ({ ...d, rank: i + 1 }))
  }
  const data = manipulatedData()

  /** preps the columns for the table by applying options and props */
  const manipulatedColumns = (): TableColumn[] => {
    if (rankEnabled) {
      const rankColumn = {
        key: "rank",
        label: "Rank",
        render: (_id, row) => {
          const rank = data.find((d) => row._id === d._id)!.rank
          return (
            <div className="flex items-center justify-start text-base font-medium">
              <div className={`ml-2 mr-4 h-5 w-2 ${rankStyle && handleRankColor(rank)}`} />
              <div className="py-1">{rank}</div>
            </div>
          )
        },
      }
      return [rankColumn, ...props.columns]
    }
    return [...props.columns]
  }
  const columns = manipulatedColumns()

  /** maps prepped columns to header row */
  const tableColumns = columns.map((column) => {
    const handleHeaderClick = (key) => {
      const sortDirection =
        sorting.key === key ? cycleSortingDirection(sorting.dir) : SortDirection.Ascending
      const sortData = sortByColumn(data, key, sortDirection)

      const sort = {
        data: sortData,
        dir: sortDirection as SortDirection,
        key: sortDirection === SortDirection.None ? null : key,
      }

      console.log("%cTable: Sorting", "color: goldenrod", { sort })
      setSorting(sort)
    }
    const isColumnSorting = sorting.key === column.key

    return (
      <th key={column.key} className="group py-4" onClick={() => handleHeaderClick(column.key)}>
        <div className="flex max-h-[20px] min-h-[20px] cursor-pointer select-none items-center gap-4">
          {column.label}
          <span
            className={isColumnSorting ? "text-secondary group-hover:scale-125" : "text-accent"}
          >
            {!isColumnSorting || sorting.dir === SortDirection.None ? (
              <ChevronsUpDown size={16} />
            ) : sorting.dir === SortDirection.Descending ? (
              // <ArrowUp size={16} />
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </span>
        </div>
      </th>
    )
  })

  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize
  const sortedData = sorting.dir !== SortDirection.None ? sorting.data : data
  const paginatedData = paginationEnabled ? sortedData.slice(startIndex, endIndex) : sortedData

  /** maps prepped data to table rows in respective column */
  const tableBodyData = paginatedData.length ? (
    paginatedData.map((row) => {
      return (
        <tr key={row._id}>
          {columns.map((column) => {
            const dataKey = column.key
            const renderer = column.render
            const value = row[dataKey]

            return (
              <td key={dataKey} className="p-0">
                <div className={"flex min-h-[45px] items-center pl-2 font-medium"}>
                  {renderer ? renderer(value, row) : value}
                </div>
              </td>
            )
          })}
        </tr>
      )
    })
  ) : (
    <tr>
      <td className="text-center" colSpan={columns.length}>
        No Results
      </td>
    </tr>
  )

  const handleTermChange = (term) => {
    setTerm(term)
    setPage(0)
  }

  const handlePageChange = (page) => {
    setPage(page)
  }

  const handleJumpToChange = (pageSize) => {
    setPageSize(parseInt(pageSize))
    setPage(0)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {searchEnabled && (
          <input
            value={term}
            placeholder={`Search by ${searchKey}...`}
            onChange={(e) => handleTermChange(e.target.value)}
            className="input-bordered input input-sm my-2 w-full bg-base-200 md:w-[400px]"
          />
        )}
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-zebra table-compact my-0 table w-full">
          <thead className="bg-base-200 text-xs uppercase">
            <tr>{tableColumns}</tr>
          </thead>
          <tbody>{tableBodyData}</tbody>
        </table>
      </div>
      {paginationEnabled && (
        <div className="mt-4 flex flex-col items-center justify-between px-3 text-sm md:flex-row">
          <div className="mb-2 mr-5 md:mb-0">
            Page: {page + 1} / {Math.floor(data.length / pageSize) + 1}
          </div>
          <div className="flex items-center gap-2">
            <div className="btn-group">
              <button
                className="btn-ghost btn-xs btn bg-base-100"
                onClick={() => handlePageChange(page > 0 ? page - 1 : page)}
                disabled={page === 0}
              >
                Prev Page
              </button>
              <button
                className="btn-ghost btn-xs btn bg-base-100"
                onClick={() => handlePageChange(paginatedData.length ? page + 1 : page)}
                disabled={paginatedData.length < pageSize}
              >
                Next Page
              </button>
            </div>
            {jumpToEnabled && (
              <select
                className="input input-sm"
                value={pageSize}
                onChange={(e) => handleJumpToChange(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Table

const cycleSortingDirection = (dir: SortDirection): SortDirection => {
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

enum SortDirection {
  None = "off",
  Ascending = "asc",
  Descending = "desc",
}

function sortByColumn(
  data: Array<TableData>,
  column: string,
  sortDirection: SortDirection
): Array<TableData> {
  return data.sort((a, b) => {
    let compareResult: number

    // Compare the values based on the column
    if (typeof a[column] === "string") {
      compareResult = a[column].localeCompare(b[column])
    } else if (typeof a[column] === "number") {
      compareResult = a[column] - b[column]
    } else if (typeof a[column] === "boolean") {
      const aValue = a[column] ? 1 : 0
      const bValue = b[column] ? 1 : 0
      compareResult = aValue - bValue
    } else {
      throw new Error("Invalid column type")
    }

    // If the values are the same, sort based on the index in the original source
    if (compareResult === 0) {
      compareResult = data.indexOf(b) - data.indexOf(a) // Adjusted the order here
    }

    // Apply the sort direction
    if (sortDirection === "desc") {
      compareResult = -compareResult
    }

    return compareResult
  })
}
