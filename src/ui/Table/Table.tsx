"use client"

import React, { useEffect, useState } from "react"
import {
  cycleSortingDirection,
  genId,
  sortDataByColumn,
  SortDirection,
  TableColumn,
  TableData,
  TableOptions,
} from "."
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Plus,
  Minus,
  Filter,
  X,
} from "lucide-react"
import { Button } from "../Button"
import RankTrophy from "~/components/pills/RankTrophy"
import cn from "~/utils/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../Dropdown"

interface TableProps extends TableOptions {
  data: Array<TableData>
  columns: Array<TableColumn>
}

const Table: React.FC<TableProps> = (props) => {
  const {
    paginationEnabled = false,
    jumpToEnabled = true,
    defaultPageSize = 10,
    sortingKeys = [],
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
  const [filtering, setFiltering] = useState<any>({
    key: null,
    data: [],
  })

  const [expandedRow, setExpandedRow] = useState<any>(
    expandable?.defaultExpandedId
      ? props.data.find((d) => d._id === expandable?.defaultExpandedId)
      : null
  )
  const isExpandable = expandable !== null && typeof expandable.render === "function"

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

    if (isExpandable) {
      const expandableColumn = {
        key: "_expandable",
        label: "",
        render: (_, row) => (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setExpandedRow(expandedRow?._id === row._id ? null : row)
              expandable.onExpand?.(expandedRow?._id === row._id ? null : row)
            }}
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
          const rank = data.find((d) => d._id === row._id)!.rank
          return (
            <div className="flex items-center justify-start">
              <RankTrophy rank={rank} />
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
          const columnIsSortable = sortingKeys.some((k) => k === column.key) && !isRankColumn
          const columnIsFilterable = column.filters && column.filters?.length > 0
          const SortingControls = () => {
            if (!columnIsSortable) return <></>

            const handleSorting = (key) => {
              const sortDirection =
                sorting.key === key ? cycleSortingDirection(sorting.dir) : SortDirection.Ascending
              const sortData = sortDataByColumn(tableData, key, sortDirection)

              const sort = {
                data: sortData,
                dir: sortDirection as SortDirection,
                key: sortDirection === SortDirection.None ? null : key,
              }
              console.log("%cTable: Sorting", "color: goldenrod", sort)
              setSorting(sort)
            }

            const isColumnSorting = sorting.key === column.key

            return (
              <div
                className={cn(
                  "cursor-pointer",
                  isColumnSorting ? "text-primary group-hover:scale-125" : "text-accent"
                )}
                onClick={() => handleSorting(column.key)}
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

          const FilteringControls = () => {
            if (!columnIsFilterable) return <></>

            const handleFiltering = (value) => {
              const filteredData = data.filter((record) => {
                const filter = column.filters?.find((f) => f.key === value)
                return column.onFilter!(filter?.value!, record)
              })

              const filter = {
                key: column.key,
                value: value,
                data: filteredData,
              }
              console.log("%cTable: Filtering", "color: goldenrod", filter)
              setFiltering(filter)
            }

            return (
              <div className={cn("flex cursor-pointer items-center")}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Filter
                      size={14}
                      className={filtering.key === column.key ? "text-primary" : ""}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filters</DropdownMenuLabel>
                    {column.filters?.map(({ key, value }) => (
                      <DropdownMenuItem
                        key={key}
                        className={cn(
                          "capitalize",
                          filtering.value === value ? "text-primary" : ""
                        )}
                        onClick={() => handleFiltering(value)}
                      >
                        {value}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem className="mt-2">
                      <div
                        onClick={() => setFiltering({ key: null, data: [] })}
                        className="group flex w-full cursor-pointer items-center justify-between"
                      >
                        <div>Clear</div>
                        <X size={14} className="group-hover:text-primary" />
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          }

          return (
            <th key={column.key} className={`group bg-base-200 p-0 py-4`}>
              <div
                className={cn(
                  "flex max-w-[40%] select-none items-center gap-4 px-2",
                  idx === 0 ? "pl-4" : "",
                  column.width
                )}
              >
                {column.label}
                <SortingControls />
                <FilteringControls />
              </div>
            </th>
          )
        })}
      </tr>
    )
  }

  /** maps prepped data to table rows in respective column */
  const TableRows = () => {
    if (!pageData.length)
      return (
        <tr>
          <td className="text-center" colSpan={columns.length}>
            No Results
          </td>
        </tr>
      )

    const ExpandedRow = ({ row }) => (
      <tr>
        {isExpandable && expandedRow?._id === row._id && (
          <td
            colSpan={columns.length}
            className="w-full whitespace-break-spaces bg-base-200 p-4 px-4"
          >
            {isExpandable && expandable?.render(row)}
          </td>
        )}
      </tr>
    )

    return (
      <>
        {pageData.map((row, i) => (
          <React.Fragment key={genId(row._id)}>
            <tr className="w-full">
              {columns.map((column, idx) => {
                const dataKey = column.key
                const renderer = column.render
                const value = row[dataKey]

                return (
                  <td
                    key={dataKey}
                    className={cn(
                      "max-w-[40%] rounded-none p-0 px-2",
                      idx === 0 ? "w-fit pl-4" : "",
                      i % 2 === 0 ? "bg-base-100" : "bg-base-200",
                      column.width
                    )}
                  >
                    <div className={"flex min-h-[45px] items-center font-medium"}>
                      {renderer ? renderer(value, row, i) : value.toLocaleString()}
                    </div>
                  </td>
                )
              })}
            </tr>
            <ExpandedRow row={row} />
          </React.Fragment>
        ))}
      </>
    )
  }

  const filteredData = filtering.key ? filtering.data : data
  const sortedData = sorting.dir !== SortDirection.None ? sorting.data : filteredData
  const tableData = sortedData

  const startIndex = page * pageSize
  const pageData = !paginationEnabled
    ? tableData.slice(startIndex, defaultPageSize)
    : paginationEnabled
    ? tableData.slice(startIndex, startIndex + pageSize)
    : tableData

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
    <div className="w-full overflow-x-auto">
      <div className="w-full overflow-x-auto rounded-lg">
        {searchEnabled && (
          <div className="flex justify-between bg-base-200 px-4 pt-4">
            <input
              value={term}
              placeholder={`Search by ${searchKey}...`}
              onChange={(e) => handleTermChange(e.target.value)}
              className="input input-sm mb-2 w-full border border-accent/40 bg-base-100 md:w-[400px]"
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
        <div className="my-4 flex items-center justify-between gap-2 px-3 text-sm">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="whitespace-nowrap">
              Page: {page + 1} / {Math.ceil(tableData.length / pageSize)}
            </div>
            {resultsEnabled && (
              <div className="flex flex-nowrap gap-[2px]">
                <span className="text-primary">(</span>
                <span className="whitespace-nowrap">{`${tableData.length} Results`}</span>
                <span className="text-primary">)</span>
              </div>
            )}
          </div>
          {tableData.length > pageSize && (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="join">
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(page > 0 ? page - 1 : page)}
                  disabled={page === 0}
                >
                  <ChevronLeft size={14} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handlePageChange(tableData.length ? page + 1 : page)}
                  disabled={(page + 1) * pageSize >= tableData.length}
                >
                  <ChevronRight size={14} />
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
          )}
        </div>
      )}
    </div>
  )
}

export default Table
