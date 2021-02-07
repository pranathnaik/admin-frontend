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

const Ram = () => {
  const toast = useToast();
  const [set, setval] = useState({
    name: "",
    brand: "",
    model: "",
    speed: "",
    memory: "",
    qty: "",
    type: "",
    image: "",
    price: "",
  });
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };
  const [Ram, setRam] = useState([]);
  const [submit, setsubmit] = useState(false);
  const addram = () => {
    setsubmit(true);
    Axios.post("https://thetechhub-admin.herokuapp.com/ram/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "Ram Card Added",
          description: "We've Added Ram card in database",
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
    console.log(id._id);
    Axios.delete(`https://thetechhub-admin.herokuapp.com/ram/delete/${id._id}`)
      .then((res) => {
        toast({
          title: "Ram deleted",
          description: "We've deleted Ram Card from db",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "There was an error",
          description: `${err} occured`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/ram/view").then((response) => {
      setRam(response.data);
    });
  }, [Ram]);

  return (
    <>
      <Flex>
        <Box overflow="auto" w="75%" h="90vh">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Brand</Th>
                <Th>model</Th>
                <Th>speed</Th>
                <Th>memory</Th>
                <Th>qty</Th>
                <Th>type</Th>
                <Th>image</Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Ram.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.model}</Td>
                      <Td>{value.speed}</Td>
                      <Td>{value.memory}</Td>
                      <Td>{value.qty}</Td>
                      <Td>{value.type}</Td>
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
            <FormLabel>Add GPU</FormLabel>

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
              placeholder="Speed"
              name="speed"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="Memory"
              name="memory"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="qty"
              name="qty"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="type"
              name="type"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="image"
              name="image"
              type="text"
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
              isLoading={submit}
              loadingText="Submitting"
              onClick={addram}
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

export default Ram;
