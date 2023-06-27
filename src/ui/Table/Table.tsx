"use client"

import React, { useState } from "react"
import {
  cycleSortingDirection,
  genId,
  sortDataByColumn,
  SortDirection,
  TableColumn,
  TableData,
  TableOptions,
} from "."
import { ChevronsUpDown, ChevronUp, ChevronDown, Plus, Minus, Trophy } from "lucide-react"
import RankTicTac from "~/components/pills/RankTicTac"
import { Button } from "../Button"

interface TableProps extends TableOptions {
  data: Array<TableData>
  columns: Array<TableColumn>
}

const Table: React.FC<TableProps> = (props) => {
  const {
    paginationEnabled = false,
    miniControls = false,
    jumpToEnabled = true,
    defaultPageSize = 10,
    sortingKeys = [],
    sortingEnabled = false,
    searchEnabled = false,
    searchKey = "name",
    searchTerm = "",
    rankEnabled = true,
    resultsEnabled = true,
    expandable = null,
  } = props
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [term, setTerm] = useState(searchTerm)
  const [sorting, setSorting] = useState({
    data: props.data,
    dir: SortDirection.None,
    key: null,
  })
  const [expandedRow, setExpandedRow] = useState<any>(null)

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
    const cols: any = []

    if (expandable) {
      const expandableColumn = {
        key: "_expandable",
        label: "",
        render: (_, row) => (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpandedRow(expandedRow?._id === row._id ? null : row)}
          >
            {expandedRow?._id !== row._id ? <Plus size={14} /> : <Minus size={14} />}
          </Button>
        ),
      }
      cols.push(expandableColumn)
    }
    if (rankEnabled) {
      const rankColumn = {
        key: "_rank",
        label: "",
        render: (_, row) => {
          const rank = data.find((d) => row._id === d._id)!.rank
          return (
            <div className="flex items-center justify-start text-base font-medium">
              <RankTicTac rank={rank} />
              <div className="py-1">{rank}</div>
            </div>
          )
        },
      }
      cols.push(rankColumn)
    }

    return [...cols, ...props.columns]
  }
  const columns = manipulatedColumns()

  /** maps prepped columns to header row */
  const TableColumns = () => {
    return (
      <tr>
        {columns.map((column, idx) => {
          const isRankColumn = column.key === "_rank"
          const columnIsSortable =
            sortingKeys.some((k) => k === column.key) && !isRankColumn && sortingEnabled

          const handleHeaderClick = (key) => {
            if (!columnIsSortable) return

            const sortDirection =
              sorting.key === key ? cycleSortingDirection(sorting.dir) : SortDirection.Ascending
            const sortData = sortDataByColumn(data, key, sortDirection)

            const sort = {
              data: sortData,
              dir: sortDirection as SortDirection,
              key: sortDirection === SortDirection.None ? null : key,
            }

            console.log("%cTable: Sorting", "color: goldenrod", sort)
            setSorting(sort)
          }

          const SortingControls = () => {
            if (!columnIsSortable) return <></>

            const isColumnSorting = sorting.key === column.key

            return (
              <div
                className={isColumnSorting ? "text-primary group-hover:scale-125" : "text-accent"}
              >
                {!isColumnSorting || sorting.dir === SortDirection.None ? (
                  <ChevronsUpDown size={16} />
                ) : sorting.dir === SortDirection.Descending ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </div>
            )
          }

          const firstColCn = idx === 0 ? "pl-4" : ""
          const columnCn = `flex select-none items-center gap-4 px-2 max-w-[40%] ${firstColCn} ${column.width}`

          return (
            <th
              key={column.key}
              className={`group bg-base-200 p-0 py-4 ${columnIsSortable ? "cursor-pointer" : ""}`}
              onClick={() => handleHeaderClick(column.key)}
            >
              <div className={columnCn}>
                {column.label}
                <SortingControls />
              </div>
            </th>
          )
        })}
      </tr>
    )
  }

  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize
  const sortedData = sorting.dir !== SortDirection.None ? sorting.data : data
  const paginatedData = paginationEnabled ? sortedData.slice(startIndex, endIndex) : sortedData

  /** maps prepped data to table rows in respective column */
  const TableRows = () => {
    if (!paginatedData.length)
      return (
        <tr>
          <td className="text-center" colSpan={columns.length}>
            No Results
          </td>
        </tr>
      )

    const ExpandedRow = ({ row }) => (
      <>
        {expandable && expandedRow?._id === row._id && (
          <td
            colSpan={columns.length}
            className="w-full whitespace-break-spaces bg-base-200 p-4 px-4"
          >
            {expandable && expandable?.render(row)}
          </td>
        )}
      </>
    )

    return (
      <>
        {paginatedData.map((row, i) => (
          <>
            <tr key={genId(row._id)} className="w-full">
              {columns.map((column, idx) => {
                const dataKey = column.key
                const renderer = column.render
                const value = row[dataKey]

                const firstColCn = idx === 0 ? "pl-4 w-fit" : ""
                const isLightRow = i % 2 === 0 ? "bg-base-100" : "bg-base-200"
                const rowCn = `rounded-none p-0 px-2 max-w-[40%] ${firstColCn} ${isLightRow} ${column.width}`

                return (
                  <td key={dataKey} className={rowCn}>
                    <div className={"flex min-h-[45px] items-center font-medium"}>
                      {renderer ? renderer(value, row) : value.toLocaleString()}
                    </div>
                  </td>
                )
              })}
            </tr>
            <ExpandedRow row={row} />
          </>
        ))}
      </>
    )
  }

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
      <div className="w-full overflow-x-auto rounded-lg">
        {searchEnabled && (
          <div className="flex justify-between bg-base-200 pl-4 pt-4">
            <input
              value={term}
              placeholder={`Search by ${searchKey}...`}
              onChange={(e) => handleTermChange(e.target.value)}
              className=" input input-sm mb-2 w-full border border-accent/40 bg-base-100 md:w-[400px]"
            />
          </div>
        )}
        <table className="my-0 table w-full">
          <thead className="bg-base-200 text-xs uppercase">
            <TableColumns />
          </thead>
          <tbody>
            <TableRows />
          </tbody>
        </table>
      </div>
      {paginationEnabled && (
        <div className="mt-4 flex items-center justify-between gap-2 px-3 text-sm">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="whitespace-nowrap">
              Page: {page + 1} / {Math.ceil(data.length / pageSize)}
            </div>
            {resultsEnabled && (
              <div className="flex flex-nowrap gap-[2px]">
                <span className="text-primary">(</span>
                <span className="whitespace-nowrap">{`${data.length} Results`}</span>
                <span className="text-primary">)</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="join">
              <Button
                variant="ghost"
                onClick={() => handlePageChange(page > 0 ? page - 1 : page)}
                disabled={page === 0}
              >
                {miniControls ? "-" : "Prev Page"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => handlePageChange(paginatedData.length ? page + 1 : page)}
                disabled={(page + 1) * pageSize >= data.length}
              >
                {miniControls ? "+" : "Next Page"}
              </Button>
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
