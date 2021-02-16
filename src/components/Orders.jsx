import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  useToast,
  Box,
  Grid,
  chakra,
} from "@chakra-ui/react";
import Axios from "axios";

import { Text } from "@chakra-ui/react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";

import { Stack, HStack, VStack, StackDivider } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
function Orders() {
  const toast = useToast();
  const [order, setorder] = useState([]);
  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/order/view")
      .then((response) => {
        setorder(response.data);
      })
      .catch((err) => {
        toast({
          title: "there was an error",
          description: `${err.response.data.msg}`,
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);
  const data = React.useMemo(() => order, [order]);
  const columns = React.useMemo(
    () => [
      {
        Header: "User",
        accessor: "userid",
      },
      {
        Header: "productname",
        accessor: "productname",
      },
      {
        Header: "amount",
        accessor: "amount",
      },
      {
        Header: "address",
        accessor: "address",
      },
      {
        Header: "date",
        accessor: "date",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {/* <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Select placeholder="By Month">
          <option value="option1">january</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>s
        </Select>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Grid> */}
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </VStack>
  );
}

export default Orders;
