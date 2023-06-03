"use client"

import React, { useEffect, useMemo, useState } from "react"
import { handleRankColor } from "~/utils/handleRankColor"
import Pill from "./pills/Pill"

/**
 *  table data can include any properties but must include a unique _id
 */
interface TableData {
  _id: string
  [key: string]: any
}

/**
 *  the columns are where most the configuration for the table come from
 *  table columns are mapped to display the header and rows
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

/**
 *  table options are contols that apply conditaional logic within the table
 *  ? this interface is used to control key configurations within the rendering of the table
 *  ? if searchEnabled, pass searchKey prop to search on a  specific data key, default: name
 */
export interface TableOptions {
  paginationEnabled?: boolean
  hidePerPage?: boolean
  pageSize?: number
  searchEnabled?: boolean
  searchKey?: string
  searchTerm?: string
  rankEnabled?: boolean
  rankStyle?: boolean
  headerCn?: string
  rowCn?: string
}

/**
 *  table props, non-optionals
 */
interface TableProps extends TableOptions {
  data: Array<TableData>
  columns: Array<TableColumn>
}

const Table: React.FC<TableProps> = (props) => {
  const {
    hidePerPage = false,
    paginationEnabled = false,
    pageSize: pageSizeOption = 10,
    searchEnabled = false,
    searchKey = "name",
    searchTerm = "",
    rankEnabled = true,
    rankStyle = true,
    headerCn = "",
    rowCn = "",
  } = props

  /**
   * options: aggregation and composition of default and passed prop options
   *    establishes a structured object for the inner table logic to interface with
   *    the idea is for the table not to touch props, similary as data and columns
   */
  const options = useMemo(() => {
    return {
      rank: rankEnabled,
      search: searchEnabled,
      searchKey,
      rankStyle: rankStyle,
      cns: {
        header: headerCn,
        row: rowCn,
      },
    }
  }, [searchEnabled, searchKey, rankEnabled, rankStyle, headerCn, rowCn])

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizeOption)
  const [term, setTerm] = useState(searchTerm)

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
    return props.data
  }
  const data = manipulatedData()

  /** preps the columns for the table by applying options and props */
  const manipulatedColumns = (): TableColumn[] => {
    if (rankEnabled) {
      const rankColumn = {
        key: "_id",
        label: "Rank",
        render: (_id, row) => {
          const index = props.data.findIndex((d) => row._id === d._id)
          const rank = index + 1
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
    return (
      <th key={column.key} className={"py-4" + options.cns.header}>
        <div className={"flex max-h-[20px] min-h-[20px] items-center"}>{column.label}</div>
      </th>
    )
  })

  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = paginationEnabled ? data.slice(startIndex, endIndex) : data

  /** maps prepped data to table rows in respective column */
  const tableBodyData = paginatedData.length ? (
    paginatedData.map((row, rowIdx) => {
      return (
        <tr key={row._id}>
          {columns.map((column) => {
            const dataKey = column.key
            const renderer = column.render
            const value = row[dataKey]

            return (
              <td key={dataKey} className={` ${options.cns.row} p-0`}>
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

  const handlePageSizeChange = (pageSize) => {
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
            Page: {page + 1} / {Math.floor(data.length / pageSize)}
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
                disabled={page + 1 === Math.floor(data.length / pageSize)}
              >
                Next Page
              </button>
            </div>
            {!hidePerPage && (
              <select
                className="input input-sm"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(e.target.value)}
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
