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

export const SortingControls = ({ tableData, column, columnIsSortable, sorting, setSorting }) => {
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
        "cursor-pointer px-2",
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

export const FilteringControls = ({ data, column, filtering, setFiltering }) => {
  const [term, setTerm] = useState(filtering.key ? filtering.value : "")

  const columnIsFilterable = column.onFilter || (column.filters && column.filters?.length > 0)

  if (!columnIsFilterable) return <></>

  const handleFiltering = (value) => {
    if (!value) return

    const filter = {
      key: column.key,
      value: value,
      data: data.filter((r) => column.onFilter!(value, r)),
    }

    console.log("%cTable: Filtering", "color: goldenrod", filter)
    setFiltering(filter)
  }

  const clearFilter = () => {
    const filter = {
      key: null,
      value: "",
      data: [],
    }

    console.log("%cTable: Filtering", "color: goldenrod", filter)
    setTerm("")
    setFiltering(filter)
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
          <ScrollArea className="max-h-[200px] rounded-md px-2">
            {column.filters?.map(({ key, value }) => (
              <div
                key={key}
                className={cn(
                  "cursor-default px-1 py-1.5 text-sm hover:bg-base-100",
                  "capitalize",
                  filtering.value === value ? "text-primary" : ""
                )}
                onClick={() => handleFiltering(value)}
              >
                {value}
              </div>
            ))}
          </ScrollArea>
          <div className="flex flex-col items-end gap-4 p-2">
            <input
              type="text"
              placeholder="Search Filter"
              value={term}
              autoFocus={true}
              onChange={(e) => setTerm(e.target.value)}
              className="input input-sm w-full"
            />
            <Button size="sm" className="w-fit text-sm" onClick={() => handleFiltering(term)}>
              Submit
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const PageSizeDropdown = ({ change }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <MoreVertical size={18} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Page Size</DropdownMenuLabel>
      {[5, 10, 20, 50, 100]?.map((value, i) => (
        <DropdownMenuItem key={i} onClick={() => change(value)}>
          {value}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

export const Pagination = ({ tableData, pageSize, page, handlePageChange }) => {
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
          </div>
        )}
      </div>
    </>
  )
}
