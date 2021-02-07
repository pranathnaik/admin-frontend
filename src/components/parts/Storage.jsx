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
const Storage = () => {
  const [set, setval] = useState({
    name: "",
    brand: "",
    model: "",
    rpm: "",
    cache: "",
    type: "",
    interface: "",
    image: "",
    price: "",
  });
  const [storage, setstorage] = useState([]);
  console.log(storage);
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };
  const toast = useToast();
  const [submit, setsubmit] = useState(false);
  const addstorage = () => {
    setsubmit(true);
    Axios.post("https://thetechhub-admin.herokuapp.com/storage/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "Storage Added",
          description: "We've Added Storage in database",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setsubmit(false);
        toast({
          title: "There was an error",
          description: `${err.response.data.msg} occured`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };
  const removefunc = (id) => {
    Axios.delete(
      `https://thetechhub-admin.herokuapp.com/storage/delete/${id._id}`
    ).then(() => {
      toast({
        title: "Storage deleted",
        description: `${id.name} Deleted`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/storage/view").then(
      (response) => {
        setstorage(response.data);
      }
    );
  }, [storage]);

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
                <Th>rpm</Th>
                <Th>cache</Th>
                <Th>type </Th>
                <Th>interface</Th>
                <Th>image</Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {storage.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.model}</Td>
                      <Td>{value.rpm}</Td>
                      <Td>{value.cache}</Td>
                      <Td>{value.type}</Td>
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
          <FormControl>
            <FormLabel>Add storage</FormLabel>
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
              name="model"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="rpm"
              name="rpm"
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
              placeholder="interface"
              name="interface"
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
              onClick={addstorage}
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

export default Storage;
