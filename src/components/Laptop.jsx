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
} from "@chakra-ui/react";
import SideDrawer from "./layout/SideDrawer";

import Axios from "axios";

const Laptop = () => {
  const toast = useToast();
  const [laptop, setlaptop] = useState([]);
  const removefunc = async (id) => {
    await Axios.delete(`https://thetechhub-admin.herokuapp.com/laptop/delete/${id._id}`).then(
      () => {
        toast({
          title: "laptop deleted",
          description: `${id.name} Deleted`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
  };

  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/laptop/view")
      .then((response) => {
        setlaptop(response.data);
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
  }, [laptop]);
  return (
    <>
      <Flex>
        <SideDrawer />
        <Box overflow="auto" w="100%" h="90vh">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th>brand</Th>
                <Th>model</Th>
                <Th>processor</Th>
                <Th>ram</Th>
                <Th>storage</Th>
                <Th>graphics_card</Th>
                <Th>features</Th>
                <Th>image</Th>
                <Th>price</Th>

                <Th>delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {laptop.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.model}</Td>
                      <Td>{value.processor}</Td>
                      <Td>{value.ram}</Td>
                      <Td>{value.storage}</Td>
                      <Td>{value.graphics_card}</Td>
                      <Td>{value.features}</Td>
                      <Td>
                        <img src={value.image} alt="" />
                      </Td>
                      <Td>{value.price}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => removefunc(value)}
                        >
                          REMOVE
                        </Button>
                      </Td>
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
};

export default Laptop;
