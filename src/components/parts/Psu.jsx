import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  Box,
  Spacer,
} from "@chakra-ui/react";

const Psu = () => {
  const toast = useToast();
  const [submit, setsubmit] = useState(false);
  const [psu, setpsu] = useState([]);
  const [set, setval] = useState({
    name: "",
    brand: "",
    model: "",
    power: "",
    efficiency: "",
    image: "",
    price: "",
  });
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };
  const addpsu = () => {
    setsubmit(true);

    Axios.post("https://thetechhub-admin.herokuapp.com/psu/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "Psu Added",
          description: "We've Added Psu in database",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setsubmit(false);
        toast({
          title: "There was an error",
          description: `${err} occured`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const removefunc = (id) => {
    Axios.delete(`https://thetechhub-admin.herokuapp.com/psu/delete/${id._id}`).then(() => {
      toast({
        title: "Psu deleted",
        description: `${id.name} Deleted`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/psu/view").then((response) => {
      setpsu(response.data);
    });
  }, [psu]);

  return (
    <>
      <Flex>
        <Box overflow="auto" w="75%" h="90vh">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th>brand</Th>
                <Th>model</Th>
                <Th>power</Th>
                <Th>efficiency</Th>
                <Th>image</Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {psu.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.model}</Td>
                      <Td>{value.power}</Td>
                      <Td>{value.efficiency}</Td>
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
        <Spacer />
        <Box w="20%">
          <FormControl enctype="multipart/form-data">
            <FormLabel>Add PSU</FormLabel>
            <Input
              placeholder="Name"
              name="name"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="Brand"
              name="brand"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="model"
              name="model"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="power"
              name="power"
              type="number"
              onChange={onchange}
            />
            <Input
              placeholder="efficiency"
              name="efficiency"
              type="text"
              onChange={onchange}
            />
            <Input
              type="text"
              placeholder="image"
              name="image"
              onChange={onchange}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              onChange={onchange}
            />

            <Button
              width="100%"
              colorScheme="green"
              borderColor="green.500"
              onClick={addpsu}
              isLoading={submit}
              loadingText="Submitting"
            >
              Add
            </Button>
          </FormControl>
        </Box>
        <Spacer />
      </Flex>
    </>
  );
};

export default Psu;
