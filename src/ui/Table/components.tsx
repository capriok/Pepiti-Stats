import cn from "~/utils/cn"
import { Button } from "../Button"
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
import { SortDirection, cycleSortingDirection, sortDataByColumn } from "./utilities"

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

export const SortingControls = ({
  column,
  columnIsSortable,
  sorting,
  tableData,
  setSorting,
  SortDirection,
}) => {
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

export const FilteringControls = ({
  column,
  columnIsFilterable,
  data,
  filtering,
  setFiltering,
}) => {
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
    <div className="flex cursor-pointer items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Filter size={14} className={filtering.key === column.key ? "text-primary" : ""} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          {column.filters?.map(({ key, value }) => (
            <DropdownMenuItem
              key={key}
              className={cn("capitalize", filtering.value === value ? "text-primary" : "")}
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
            <span className="whitespace-nowrap">{`${tableData.length} Results`}</span>
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
