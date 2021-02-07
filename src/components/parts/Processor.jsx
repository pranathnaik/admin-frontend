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
  CircularProgress,
  Spacer,
} from "@chakra-ui/react";

const Processor = () => {
  const [processor, setProcessor] = useState([]);
  const toast = useToast();
  const [submit, setsubmit] = useState(false);
  const [set, setval] = useState({
    name: "",
    brand: "",
    cores: "",
    model: "",
    speed: "",
    socket_type: "",
    image: "",
    price: "",
  });
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };
  const addprocessor = () => {
    setsubmit(true);

    Axios.post("https://thetechhub-admin.herokuapp.com/processor/add", {
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
          description: `${err.response.data.msg} `,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const removefunc = (id) => {
    Axios.delete(`https://thetechhub-admin.herokuapp.com/processor/delete/${id._id}`).then(
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
    Axios.get("https://thetechhub-admin.herokuapp.com/processor/view").then((response) => {
      setProcessor(response.data);
    });
  }, [processor]);

  return (
    <>
      <Flex>
        <Box overflow="auto" w="75%" h="90vh">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Brand</Th>
                <Th>cores</Th>
                <Th>model</Th>
                <Th>speed</Th>
                <Th>socket type</Th>
                <Th>Image</Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {processor ? (
                processor.map((value) => {
                  return (
                    <>
                      <Tr>
                        <Td>{value.name}</Td>
                        <Td>{value.brand}</Td>
                        <Td>{value.cores}</Td>
                        <Td>{value.model}</Td>
                        <Td>{value.speed}</Td>
                        <Td>{value.socket_type}</Td>
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
                })
              ) : (
                <>
                  <CircularProgress isIndeterminate color="green.300" />
                </>
              )}
            </Tbody>
          </Table>
        </Box>
        <Spacer />
        <Box w="20%">
          <FormControl enctype="multipart/form-data">
            <FormLabel>Add CPU</FormLabel>
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
              placeholder="Cores"
              name="cores"
              type="number"
              onChange={onchange}
            />
            <Input
              placeholder="Model"
              name="model"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="Speed"
              name="speed"
              type="number"
              onChange={onchange}
            />
            <Input
              placeholder="Socket Type"
              name="socket_type"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="image url"
              type="text"
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
              onClick={addprocessor}
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

export default Processor;
