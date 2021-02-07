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

const GraphicsCard = () => {
  const toast = useToast();
  const [graphics, setgraphics] = useState([]);
  const [submit, setsubmit] = useState(false);
  const [set, setval] = useState({
    name: "",
    brand: "",
    model: "",
    chipset: "",
    memory: "",
    clock_speed: "",
    interface: "",
    image: "",
    price: "",
  });
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };
  const addgraphics = () => {
    setsubmit(true);
    Axios.post("https://thetechhub-admin.herokuapp.com/graphicscard/add", { ...set })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "Graphics Card Added",
          description: "We've Added Graphics card in database",
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
    Axios.delete(`https://thetechhub-admin.herokuapp.com/graphicscard/delete/${id._id}`)
      .then((res) => {
        toast({
          title: "Graphics deleted",
          description: "We've deleted Graphics Card from db",
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
    Axios.get("https://thetechhub-admin.herokuapp.com/graphicscard/view").then((response) => {
      setgraphics(response.data);
    });
  }, [graphics]);

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

                <Th>memory</Th>
                <Th>clock speed</Th>
                <Th>interface</Th>
                <Th>image</Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {graphics.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.model}</Td>

                      <Td>{value.memory}</Td>
                      <Td>{value.clock_speed}</Td>
                      <Td>{value.interface}</Td>
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
              type="text"
              name="name"
              onChange={onchange}
            />
            <Input
              placeholder="Brand"
              type="text"
              name="brand"
              onChange={onchange}
            />
            <Input
              placeholder="model"
              type="text"
              name="model"
              onChange={onchange}
            />

            <Input
              placeholder="Memory"
              type="text"
              name="memory"
              onChange={onchange}
            />
            <Input
              placeholder="Clock Speed"
              type="text"
              name="clock_speed"
              onChange={onchange}
            />
            <Input
              placeholder="Interface"
              type="text"
              name="interface"
              onChange={onchange}
            />
            <Input
              placeholder="image"
              type="text"
              name="image"
              onChange={onchange}
            />
            <Input
              placeholder="Price"
              type="number"
              name="price"
              onChange={onchange}
            />

            <Button
              width="100%"
              colorScheme="green"
              borderColor="green.500"
              isLoading={submit}
              loadingText="Submitting"
              onClick={addgraphics}
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

export default GraphicsCard;
