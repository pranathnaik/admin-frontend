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

const Cooler = () => {
  const toast = useToast();
  const [set, setval] = useState({
    name: "",
    brand: "",
    model: "",
    fan_rpm: "",
    noise_level: "",
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
    Axios.post("https://thetechhub-admin.herokuapp.com/cooler/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "accesories  Added",
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
    Axios.delete(
      `https://thetechhub-admin.herokuapp.com/cooler/delete/${id._id}`
    )
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
    Axios.get("https://thetechhub-admin.herokuapp.com/cooler/view").then(
      (response) => {
        setRam(response.data);
      }
    );
  }, [Ram]);

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
                <Th>fan_rpm</Th>
                <Th>noise_level</Th>
                <Th>image</Th>
                <Th>price</Th>
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
                      <Td>{value.fan_rpm}</Td>
                      <Td>{value.noise_level}</Td>
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
            <FormLabel>Add Cooler</FormLabel>

            <Input
              placeholder="name"
              name="name"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="brand"
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
              placeholder="fan_rpm"
              name="fan_rpm"
              type="text"
              onChange={onchange}
            />
            <Input
              placeholder="noise_level"
              name="noise_level"
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
              placeholder="price"
              name="price"
              type="text"
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

export default Cooler;
