import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    AssessmentService.getList()
      .then(a => setAssessments(a));
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

  function editUser()
  {

    global.console.log(`Inside selectUser function`);
  }

  function deleteUser()
  {
    global.console.log(` inside function delete user`);
  }

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useSortBy);

  return (
    <Table align="center" {...getTableProps()} striped bordered hover>
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
              <tr>
                <td>
                  <button onClick={editUser} > Update </button>
                  <button onClick={deleteUser}> Delete </button>

                </td>
              </tr>
            </tr>
          );
        })}
      </tbody>
    </Table>

  );
};
