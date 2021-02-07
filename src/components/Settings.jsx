import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Flex,
  Center,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
const Settings = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    displayName: "",
  });

  const toast = useToast();
  const [submit, setsubmit] = useState(false);
  const onsub = async () => {
    setsubmit(true);
    await Axios.post("https://thetechhub-admin.herokuapp.com/settings/register", user)
      .then((res) => {
        setsubmit(false);
        console.log(res);
        toast({
          title: "new admin added",
          description: `${res.data.displayName}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setsubmit(false);
        toast({
          title: "There was an error",
          description: `${err.response.data.msg}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const onChange = (event) => {
    setuser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Flex justify h="80vh" w="100%">
        <Center w="50%">
          <Box w="50%">
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={onChange}
                  isRequired
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={onChange}
                  isRequired
                />
              </FormControl>
              <FormControl id="passwordCheck">
                <FormLabel>password Check</FormLabel>
                <Input
                  type="password"
                  name="passwordCheck"
                  onChange={onChange}
                  isRequired
                />
              </FormControl>

              <FormControl id="displayName">
                <FormLabel>display Name</FormLabel>
                <Input
                  type="text"
                  name="displayName"
                  onChange={onChange}
                  isRequired
                />
              </FormControl>

              <Button
                isLoading={submit}
                onClick={onsub}
                loadingText="Submitting"
                colorScheme="teal"
                w="100%"
                type="submit"
              >
                Add Admin
              </Button>
            </Stack>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default Settings;
