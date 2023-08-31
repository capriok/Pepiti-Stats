"use client"

import React, { useState } from "react"
import cn from "~/utils/cn"
import { TableColumn, TableData, TableOptions } from "."
import {
  FilteringControls,
  PageSizeDropdown,
  Pagination,
  SearchBox,
  SortingControls,
} from "./components"
import { SortDirection, manipulatedColumns, manipulatedData } from "./utilities"

interface TableProps extends TableOptions {
  data: Array<TableData>
  columns: Array<TableColumn>
}

const Table: React.FC<TableProps> = (props) => {
  const {
    defaultPageSize = 10,
    sortingKeys = [],
    searchKey = "name",
    searchTerm = "",
    rankEnabled = true,
    searchEnabled = false,
    paginationEnabled = false,
    pageSizeEnabled = false,
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
  const data = manipulatedData(props.data, term, searchKey)

  /** preps the columns for the table by applying options and props */
  const columns = manipulatedColumns(
    data,
    props.columns,
    expandable,
    expandedRow,
    isExpandable,
    rankEnabled,
    setExpandedRow
  )

  /** maps prepped columns to header row */
  const TableColumns = () => {
    return (
      <tr className="bg-base-200 text-xs uppercase">
        {columns.map((column, idx) => {
          const isRankColumn = column.key === "_rank"
          const columnIsSortable = sortingKeys.some((k) => k === column.key) && !isRankColumn
          const columnIsFilterable = column.filters && column.filters?.length > 0

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
                <SortingControls
                  column={column}
                  sorting={sorting}
                  setSorting={setSorting}
                  SortDirection={SortDirection}
                  columnIsSortable={columnIsSortable}
                  tableData={tableData}
                />
                <FilteringControls
                  column={column}
                  columnIsFilterable={columnIsFilterable}
                  data={data}
                  filtering={filtering}
                  setFiltering={setFiltering}
                />
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
          <React.Fragment key={row._id}>
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

  const handlePageSizeChange = (pageSize) => {
    setPageSize(parseInt(pageSize))
    setPage(0)
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      {(searchEnabled || pageSizeEnabled) && (
        <div className="flex items-center justify-between gap-4 rounded-tr-lg bg-base-200 p-4">
          {searchEnabled && (
            <SearchBox term={term} handleTermChange={handleTermChange} searchKey={searchKey} />
          )}
          {pageSizeEnabled && <PageSizeDropdown change={handlePageSizeChange} />}
        </div>
      )}

      <table className="my-0 table w-full">
        <thead>
          <TableColumns />
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>

      {paginationEnabled && (
        <Pagination
          tableData={tableData}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Table
