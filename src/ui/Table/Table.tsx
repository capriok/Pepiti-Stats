"use client"

import React, { useState } from "react"
import cn from "~/utils/cn"
import { TableProps } from "."
import { SortDirection, manipulatedColumns, manipulatedData } from "./utilities"
import { FilteringControls, OptionsDropdown, Pagination, SortingControls } from "./components"

const Table: React.FC<TableProps> = (props) => {
  const {
    defaultPageSize = 10,
    defaultDataCap = 1000,
    sortingKeys = [],
    rankEnabled = true,
    paginationEnabled = false,
    pageSizeEnabled = false,
    dataCapEnabled = false,
    expandable = null,
    onDataCapChange = () => {},
  } = props

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [dataCap, setDataCap] = useState(defaultDataCap)

  const [sorting, setSorting] = useState({
    key: null,
    dir: SortDirection.None,
    data: props.data,
  })
  const [filtering, setFiltering] = useState<any>({
    key: null,
    value: null,
    data: [],
  })

  const [expandedRow, setExpandedRow] = useState<any>(
    expandable?.defaultExpandedId
      ? props.data.find((d) => d._id === expandable?.defaultExpandedId)
      : null
  )
  const isExpandable = expandable !== null && typeof expandable.render === "function"

  /** preps the data for the table to use */
  const data = manipulatedData(props.data)

  /** preps the columns for the table by applying options and props */
  const columns = manipulatedColumns(
    data,
    props.columns,
    rankEnabled,
    expandable,
    isExpandable,
    expandedRow,
    setExpandedRow
  )

  /** maps prepped columns to header row */
  const TableColumns = () => {
    return (
      <tr className="bg-base-200 text-xs uppercase">
        {columns.map((column, idx) => {
          const isRankColumn = column.key === "_rank"
          const columnIsSortable = sortingKeys.some((k) => k === column.key) && !isRankColumn

          return (
            <th key={column.key} className="group p-0 py-4">
              <div
                className={cn(
                  "flex max-w-[40%] select-none items-center px-2",
                  idx === 0 ? "pl-2" : "",
                  column.width
                )}
              >
                <div className="pr-2">{column.label}</div>
                <SortingControls
                  tableData={tableData}
                  column={column}
                  sorting={sorting}
                  setSorting={setSorting}
                  columnIsSortable={columnIsSortable}
                />
                <FilteringControls
                  data={data}
                  column={column}
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
                      {renderer ? renderer(value, row, i) : value?.toLocaleString()}
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

  const handlePageChange = (page) => {
    setPage(page)
  }

  const handlePageSizeChange = (pageSize) => {
    setPageSize(parseInt(pageSize))
    setPage(0)
  }

  const handleDataCapChange = (cap) => {
    console.log("%cTable: DataCapChange", "color: goldenrod", { cap })

    setDataCap(cap)
    onDataCapChange(cap)
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg">
      {pageSizeEnabled && (
        <div className="flex justify-between gap-4 rounded-tr-lg bg-base-200 p-4 pb-0">
          <div />
          {pageSizeEnabled && (
            <OptionsDropdown
              pageSize={pageSize}
              pageSizeEnabled={pageSizeEnabled}
              dataCap={dataCap}
              dataCapEnabled={dataCapEnabled}
              onPageSizeChange={handlePageSizeChange}
              onDataCapChange={handleDataCapChange}
            />
          )}
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
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default Table
