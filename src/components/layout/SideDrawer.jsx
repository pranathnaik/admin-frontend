import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Axios from "axios";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [submit, setsubmit] = useState(false);
  const toast = useToast();
  const [set, setlap] = useState({
    name: "",
    brand: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    graphics_card: "",
    features: "",
    image: "",
    price: "",
  });

  const onchange = (event) => {
    setlap({ ...set, [event.target.name]: event.target.value });
  };

  const onsub = () => {
    setsubmit(true);
    Axios.post("https://thetechhub-admin.herokuapp.com/laptop/add", {
      ...set,
    })
      .then((res) => {
        setsubmit(false);
        toast({
          title: "laptop Added",
          description: "We've Added laptop in database",
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

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add Laptop
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Add New Laptop</DrawerHeader>

            <DrawerBody>
              <form onSubmit={onsub}>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="username">Name</FormLabel>
                    <Input
                      ref={firstField}
                      id="username"
                      onChange={onchange}
                      name="name"
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="brand">Brand</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="brand"
                        onChange={onchange}
                        name="brand"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="model">Model</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="model"
                        onChange={onchange}
                        name="model"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="processor">Processor</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="processor"
                        onChange={onchange}
                        name="processor"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="ram">ram</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="ram"
                        onChange={onchange}
                        name="ram"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="storage">storage</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="storage"
                        onChange={onchange}
                        name="storage"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="graphics_card">graphics_card</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="graphics_card"
                        name="graphics_card"
                        onChange={onchange}
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="features">features</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="features"
                        onChange={onchange}
                        name="features"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="image">image</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        id="image"
                        onChange={onchange}
                        name="image"
                      />
                    </InputGroup>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="price">price</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        id="price"
                        onChange={onchange}
                        name="price"
                      />
                    </InputGroup>
                  </Box>
                </Stack>
              </form>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={submit}
                loadingText="Submitting"
                onClick={onsub}
              >
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
