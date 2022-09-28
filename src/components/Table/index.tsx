import {SlipObject} from 'App';
import React, {useMemo} from 'react';
import {Column, usePagination, useTable} from 'react-table';
// import  'react-table';

interface Props {
  data: SlipObject[];
}

function Table({data}: Props) {
  const columns = useMemo(
    () =>
      [
        {
          Header: 'Last Advices',
          accessor: 'advice',
        },
      ] as any,
    [],
  );

  const {getTableProps, getTableBodyProps, rows, prepareRow, headerGroups} = useTable({columns, data}, usePagination);

  return (
    <table
      {...getTableProps()}
      className='border-separate border border-slate-400 rounded-md divide-y lg:divide-y-0 divide-slate-400                            '
    >
      <thead>
        {headerGroups.map((headerGroup, idx) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={'tb_header_row_' + idx}>
            {headerGroup.headers.map((col, i) => (
              <th {...col.getHeaderProps()} key={'tb_header_' + i} className='border-b-{}'>
                {col.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <div className='max-h-64 overflow-auto lg:max-h-full'>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} key={'tb_row' + idx}>
                {row.cells.map((cell, i) => (
                  <td
                    className='border border-slate-400 rounded-md p-6 md:p-3 text-center'
                    {...cell.getCellProps()}
                    key={'tb_row_cell_' + i}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </div>
    </table>
  );
}

export default Table;
