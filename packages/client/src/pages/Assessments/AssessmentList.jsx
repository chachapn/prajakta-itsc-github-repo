import React, { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: `ID`,
        accessor: `id`,
      },
      {
        Header: `Cat Name`,
        accessor: `catName`, // accessor is the "key" in the data
      },
      {
        Header: `Cat Date of Birth`,
        accessor: `catDateOfBirth`,
      },
      {
        Header: `Instrument Type`,
        accessor: `instrumentType`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },
      {
        Header: `Created By`,
        accessor: `createdAt`,
      },

    ],
    []
  );
  // const tableInstance = useTable({ columns, data });

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useSortBy);

  return (
    <table align="center" {...getTableProps()} style={{ border: `solid 1px blue` }}>
      <thead>
        {headerGroups.map(headerGroup =>
          <tr align="center" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column =>
              <th align="center"
                {...column.getHeaderProps()}
                style={{
                  background: `aliceblue`,
                  borderBottom: `solid 3px red`,
                  color: `black`,
                  fontWeight: `bold`,
                }}
              >
                {column.render(`Header`)}
              </th>)}
          </tr>)}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell =>
                <td
                  {...cell.getCellProps()}
                  style={{
                    background: `papayawhip`,
                    border: `solid 1px gray`,
                    padding: `10px`,
                  }}
                >
                  {cell.render(`Cell`)}
                </td>)}
            </tr>
          );
        })}
      </tbody>
    </table>

  );
};
