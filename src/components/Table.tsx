'use client'

import React, { useMemo, useState } from 'react'
import { handleRankColor } from '~/utils/handleRankColor'

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
  searchEnabled?: boolean
  searchKey?: string
  rankEnabled?: boolean
  rankStyle?: boolean
  resultsEnabled?: boolean
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
    searchEnabled = false,
    searchKey = 'name',
    rankEnabled = true,
    rankStyle = true,
    resultsEnabled = false,
    headerCn = '',
    rowCn = '',
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

  const [term, setTerm] = useState('')

  /** preps the data for the table to use */
  const manipulatedData = () => {
    if (term) {
      /** * filter data by record[searchKey] search term */
      console.log(searchKey)

      return props.data.filter((record) => {
        if (typeof record[searchKey] === 'string') {
          return record[searchKey].toLowerCase().includes(term.toLowerCase())
        }
        if (typeof record[searchKey] === 'number') {
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
        key: '_id',
        label: 'Rank',
        render: (_id, row) => {
          const index = props.data.findIndex((d) => row._id === d._id)
          const rank = index + 1
          return (
            <div className="flex justify-start items-center font-medium text-base sticky left-0">
              <div className={`w-2 h-5 ml-2 mr-4 ${rankStyle && handleRankColor(rank)}`} />
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
      <th key={column.key} scope="col" className={options.cns.header}>
        <span>{column.label}</span>
      </th>
    )
  })

  /** maps prepped data to table rows in respective column */
  const tableBodyData = data.map((row) => {
    return (
      <tr key={row._id}>
        {columns.map((column, colIdx) => {
          let fixed = colIdx === 0 ? 'sticky left-0' : ''
          const dataKey = column.key
          const renderer = column.render
          const value = row[dataKey]

          return (
            <td key={dataKey} className={options.cns.row + fixed}>
              <div>{renderer ? renderer(value, row) : value}</div>
            </td>
          )
        })}
      </tr>
    )
  })

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {searchEnabled && (
          <div>
            <label className="label">
              <span className="label-text">
                {searchKey.charAt(0).toUpperCase() + searchKey.slice(1)}
              </span>
            </label>
            <input
              value={term}
              placeholder={`Search by ${searchKey}...`}
              onChange={(e) => setTerm(e.currentTarget.value)}
              className="input input-bordered mb-3 w-full md:w-[400px]"
            />
          </div>
        )}
        {resultsEnabled && <div className="self-end pb-2">Results: {data.length}</div>}
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full table table-compact my-0">
          <thead className="text-xs uppercase bg-neutral-800/40 text-neutral-500 dark:bg-neutral-800/40/50 dark:text-gray-400">
            <tr>{tableColumns}</tr>
          </thead>
          <tbody>{tableBodyData}</tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
