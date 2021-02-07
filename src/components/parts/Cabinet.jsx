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

const Cabinet = () => {
  const [cabinet, setcabinet] = useState([]);
  const [set, setval] = useState({
    name: "",
    brand: "",
    side_panel: "",
    model: "",
    type: "",
    color: "",
    image: "",
    price: "",
  });
  const toast = useToast();
  const [submit, setsubmit] = useState(false);
  const onchange = (event) => {
    setval({ ...set, [event.target.name]: event.target.value });
  };

  const addcabinet = async () => {
    setsubmit(true);
    await Axios.post("https://thetechhub-admin.herokuapp.com/cabinet/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "cabinet Added",
          description: "We've Added cabinet in database",
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

  const removefunc = async (id) => {
    await Axios.delete(`https://thetechhub-admin.herokuapp.com/cabinet/delete/${id._id}`).then(
      () => {
        toast({
          title: "cabinet deleted",
          description: `${id.name} Deleted`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    );
  };

  useEffect(() => {
    Axios.get("https://thetechhub-admin.herokuapp.com/cabinet/view").then((response) => {
      setcabinet(response.data);
    });
  }, [cabinet]);

  return (
    <>
      <Flex>
        <Box overflow="auto" w="75%" h="90vh">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>name</Th>
                <Th>brand</Th>
                <Th>side_panel</Th>
                <Th>model</Th>
                <Th>type</Th>
                <Th>color</Th>
                <Th>image</Th>
                <Th>price</Th>
                <Th>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cabinet.map((value) => {
                return (
                  <>
                    <Tr>
                      <Td>{value.name}</Td>
                      <Td>{value.brand}</Td>
                      <Td>{value.side_panel}</Td>
                      <Td>{value.model}</Td>
                      <Td>{value.type}</Td>
                      <Td>{value.color}</Td>
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
            <FormLabel>Add CPU</FormLabel>
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
              placeholder="sidepanel"
              type="text"
              name="side_panel"
              onChange={onchange}
            />
            <Input
              placeholder="Model"
              type="text"
              name="model"
              onChange={onchange}
            />
            <Input
              placeholder="type"
              type="text"
              name="type"
              onChange={onchange}
            />
            <Input
              placeholder="color "
              type="text"
              name="color"
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
              type="number"
              name="price"
              onChange={onchange}
            />

            <Button
              width="100%"
              colorScheme="green"
              borderColor="green.500"
              onClick={addcabinet}
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

export default Cabinet;
