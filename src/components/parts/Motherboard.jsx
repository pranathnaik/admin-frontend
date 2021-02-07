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
const Motherboard = () => {
  const [set, setval] = useState({
    name: "",
    brand: "",
    form_factor: "",
    chipset: "",
    socket_type: "",
    memory_slot: "",
    image: "",
    price: "",
  });
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };
  const [motherboard, setmotherboard] = useState([]);
  const toast = useToast();
  const [submit, setsubmit] = useState(false);
  const addmotherboard = () => {
    setsubmit(true);
    Axios.post("https://thetechhub-admin.herokuapp.com/motherboard/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "Processor Added",
          description: "We've Added processor in database",
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
    Axios.delete(`https://thetechhub-admin.herokuapp.com/motherboard/delete/${id._id}`).then(
      () => {
        toast({
          title: "Processor deleted",
          description: `${id.name} Deleted`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
  };

  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/motherboard/view").then((response) => {
      setmotherboard(response.data);
    });
  }, [motherboard]);

  return (
    <>
      <Flex>
        <Box overflow="auto" w="75%" h="90vh">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Brand</Th>
                <Th>formFactor</Th>
                <Th>chipset</Th>
                <Th>socketType</Th>
                <Th>memorySlot </Th>
                <Th>image </Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {motherboard.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.form_factor}</Td>
                      <Td>{value.chipset}</Td>
                      <Td>{value.socket_type}</Td>
                      <Td>{value.memory_slot}</Td>
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
          <FormControl>
            <FormLabel>Add Motherboard</FormLabel>
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
              placeholder="Form Factor"
              name="form_factor"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="Chipset"
              name="chipset"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="Socket Type"
              name="socket_type"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="Memory Slot"
              name="memory_slot"
              type="number"
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
              onClick={addmotherboard}
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

export default Motherboard;
