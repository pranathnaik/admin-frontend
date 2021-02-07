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
import Axios from "axios";
import SideDrawer from "./layout/SideDrawer1";
const PreBuild = () => {
  const toast = useToast();
  const [laptop, setlaptop] = useState([]);
  const removefunc = async (id) => {
    await Axios.delete(`https://thetechhub-admin.herokuapp.com/prebuild/delete/${id._id}`).then(
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
    Axios.get("https://thetechhub-admin.herokuapp.com/prebuild/view")
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
                <Th>processor</Th>
                <Th>motherboard</Th>
                <Th>graphicscard:</Th>
                <Th>storage</Th>
                <Th>cabinet</Th>
                <Th>psu</Th>
                <Th>ram</Th>
                <Th>cooler</Th>
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
                      <Td>{value.processor}</Td>
                      <Td>{value.motherboard}</Td>
                      <Td>{value.graphicscard}</Td>
                      <Td>{value.storage}</Td>
                      <Td>{value.cabinet}</Td>
                      <Td>{value.psu}</Td>
                      <Td>{value.ram}</Td>
                      <Td>{value.cooler}</Td>
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

export default PreBuild;
