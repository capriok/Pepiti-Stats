import { useEffect, useState } from "react"
import cn from "~/utils/cn"
import { Button } from "../Button"
import { SortDirection, cycleSortingDirection, sortDataByColumn } from "./utilities"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../Dropdown"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Filter,
  MoreVertical,
  X,
} from "lucide-react"
import { ScrollArea } from "../ScrollArea"

export const SearchBox = ({ term, handleTermChange, searchKey }) => {
  return (
    <input
      value={term}
      placeholder={`Search by ${searchKey}...`}
      onChange={(e) => handleTermChange(e.target.value)}
      className="input input-sm w-full border border-accent/40 bg-base-100 md:w-[400px]"
    />
  )
}

export const SortingControls = ({ column, sorting, handleSortingChange }) => {
  const isColumnSorting = sorting.key === column.key

  return (
    <div
      className={cn(
        "cursor-pointer px-2",
        isColumnSorting ? "text-primary group-hover:scale-125" : "text-accent"
      )}
      onClick={() => handleSortingChange(column.key)}
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

export const FilteringControls = ({
  column,
  filtering,
  handleFilteringChange,
  handleClearFilter,
}) => {
  const [term, setTerm] = useState(filtering.key ? filtering.value : "")

  const columnIsFilterable = column.onFilter || (column.filters && column.filters?.length > 0)

  if (!columnIsFilterable) return <></>

  const clearFilter = () => {
    setTerm("")
    handleClearFilter()
  }

  return (
    <div className="flex cursor-pointer items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="px-2">
          <Filter size={14} className={filtering.key === column.key ? "text-primary" : ""} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center justify-between">
            <div>{column.filters && column.filters?.length ? "Filters" : "Filter"}</div>
            {filtering.key && (
              <div
                className="flex w-full cursor-pointer justify-end hover:text-primary"
                onClick={clearFilter}
              >
                <X size={14} />
              </div>
            )}
          </DropdownMenuLabel>
          {column.filters && column.filters?.length && (
            <ScrollArea className="mb-2 max-h-[200px] rounded-md px-2">
              {column.filters?.map(({ key, value }) => (
                <div
                  key={key}
                  className={cn(
                    "cursor-default px-1 py-1.5 text-sm hover:bg-base-100",
                    "capitalize",
                    filtering.value === value ? "text-primary" : ""
                  )}
                  onClick={() => handleFilteringChange(value)}
                >
                  {value}
                </div>
              ))}
            </ScrollArea>
          )}
          <div className="flex flex-col items-end gap-4 p-2">
            <input
              type="text"
              placeholder="Search Filter"
              value={term}
              autoFocus={true}
              onChange={(e) => setTerm(e.target.value)}
              className="input input-sm w-full"
            />
            <Button size="sm" className="w-fit text-sm" onClick={() => handleFilteringChange(term)}>
              Submit
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const OptionsDropdown = ({
  pageSize,
  pageSizeEnabled,
  dataCap,
  dataCapEnabled,
  onPageSizeChange,
  onDataCapChange,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <MoreVertical size={18} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      {pageSizeEnabled && (
        <>
          <DropdownMenuLabel>Page Size</DropdownMenuLabel>
          <select
            value={pageSize}
            className="select select-sm w-full border-none"
            onChange={(e) => onPageSizeChange(e.target.value)}
          >
            {[5, 10, 20, 50, 100].map((page, i) => (
              <option key={i} value={page}>
                {page}
              </option>
            ))}
          </select>
        </>
      )}

      {dataCapEnabled && (
        <>
          <DropdownMenuLabel>Table Size</DropdownMenuLabel>
          <select
            value={dataCap}
            className="select select-sm w-full border-none"
            onChange={(e) => onDataCapChange(e.target.value)}
          >
            {[100, 250, 500, 1000].map((cap, i) => (
              <option key={i} value={cap}>
                {cap}
              </option>
            ))}
          </select>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
)

export const Pagination = ({ tableData, pageSize, page, onChange }) => {
  return (
    <>
      <div className="my-4 flex items-center justify-between gap-2 px-3 text-sm">
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="whitespace-nowrap">
            Page: {page + 1} / {Math.ceil(tableData.length / pageSize)}
          </div>
          <div className="flex flex-nowrap gap-[2px]">
            <span className="text-primary">(</span>
            <span className="whitespace-nowrap">{`${tableData.length} Rows`}</span>
            <span className="text-primary">)</span>
          </div>
        </div>
        {tableData.length > pageSize && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="join">
              <Button
                variant="ghost"
                onClick={() => onChange(page > 0 ? page - 1 : page)}
                disabled={page === 0}
              >
                <ChevronLeft size={14} />
              </Button>
              <Button
                variant="ghost"
                onClick={() => onChange(tableData.length ? page + 1 : page)}
                disabled={(page + 1) * pageSize >= tableData.length}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
