import { Button } from "../Button"
import RankTrophy from "~/components/pills/RankTrophy"
import { TableData, TableColumn } from "."
import { Minus, Plus } from "lucide-react"

export const manipulatedData = (data: TableData[]) => {
  return data.map((d, i) => ({ ...d, rank: i + 1 }))
}

export const manipulatedColumns = (
  data: TableData[],
  columns: TableColumn[],
  rankEnabled: boolean,
  expandable: any,
  isExpandable: boolean,
  expandedRow: TableData | null,
  setExpandedRow: (row: TableData) => void
): TableColumn[] => {
  const cols: any = []

  if (isExpandable) {
    const expandableColumn = {
      key: "_expandable",
      label: "",
      render: (_, row) =>
        !row._id.includes("_empty") && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const expanded = expandedRow?._id === row._id ? null : row
              setExpandedRow(expanded)
              expandable.onExpand?.(expanded)
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
        const rowIdx = data.find((d) => d._id === row._id)
        const rank = rowIdx ? rowIdx.rank : ""
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

  return [...cols, ...columns]
}

export enum SortDirection {
  None = "off",
  Ascending = "asc",
  Descending = "desc",
}

export const cycleSortingDirection = (dir: SortDirection): SortDirection => {
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

export const sortDataByColumn = (
  data: Array<TableData>,
  key: string,
  dir: SortDirection
): Array<TableData> => {
  const stringCompare = (a: string, b: string): number => a.localeCompare(b)
  const numberCompare = (a: number, b: number): number => a - b
  const booleanCompare = (a: boolean, b: boolean): number => (a ? 1 : 0) - (b ? 1 : 0)

  return data.sort((a, b) => {
    let res: number

    if (typeof a[key] === "string") {
      res = stringCompare(a[key] ?? "", b[key] ?? "")
    } else if (typeof a[key] === "number") {
      res = numberCompare(a[key] ?? 0, b[key] ?? 0)
    } else if (typeof a[key] === "boolean") {
      res = booleanCompare(a[key] ?? false, b[key] ?? false)
    } else {
      throw new Error("Invalid column type")
    }

    if (res === 0) res = data.indexOf(b) - data.indexOf(a)
    if (dir === "desc") res = -res

    return res
  })
}
