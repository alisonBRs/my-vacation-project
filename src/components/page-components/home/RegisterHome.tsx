"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
interface dataType {
  email: string;
  password: string;
}
export default function RegisterHome() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [registerPage, setRegisterPage] = useState(false);

  const {
    control,
    formState: { errors },
    register,
    handleSubmit: submit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();
  const handleSubmit = (data: dataType) => {
    console.log(getValues());
  };
  return (
    <Flex h={"100vh"} w={"100vw"} justify={"center"} alignItems={"center"}>
      <Flex
        h={"600px"}
        w={"450px"}
        border={"2px solid black"}
        rounded={"6px"}
        boxShadow={"lg"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {!registerPage ? (
          <Flex flexDir={"column"} gap={2} alignItems={"center"}>
            <Heading textAlign={"center"} mt={2}>
              Login
            </Heading>

            <Box w={"200px"} mt={8}>
              <label>
                <Text>Email:</Text>
                <Input
                  value={email}
                  type="text"
                  placeholder="Seu email..."
                  pl={2}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                <Text>Password:</Text>
                <Input
                  value={pass}
                  type="password"
                  placeholder="Sua senha..."
                  pl={2}
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
            </Box>

            <Button
              colorScheme={"green"}
              bg={"green.300"}
              px={"10px"}
              onClick={() => handleSubmit({ email, password: pass })}
            >
              Logar
            </Button>
          </Flex>
        ) : (
          <Flex flexDir={"column"} gap={2} alignItems={"center"}>
            <Heading textAlign={"center"} mt={2}>
              Registro
            </Heading>

            <Box w={"200px"} mt={8}>
              <FormControl isInvalid={!!errors?.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  borderColor={errors?.name?.message ? "red" : ""}
                  autoFocus
                  bg={"white"}
                  autoComplete={"off"}
                  {...register("name", {
                    required: "Campo obrigatório",
                  })}
                />
                <FormErrorMessage color={"red"}>
                  {errors?.name?.message as string}
                </FormErrorMessage>

                <FormLabel>Email</FormLabel>
                <Input
                  borderColor={errors?.name?.message ? "red" : ""}
                  autoFocus
                  bg={"white"}
                  autoComplete={"off"}
                  {...register("email", {
                    required: "Campo obrigatório",
                  })}
                />
                <FormErrorMessage color={"red"}>
                  {errors?.email?.message as string}
                </FormErrorMessage>

                <FormLabel>Senha</FormLabel>
                <Input
                  borderColor={errors?.name?.message ? "red" : ""}
                  autoFocus
                  bg={"white"}
                  type="password"
                  autoComplete={"off"}
                  {...register("password", {
                    required: "Campo obrigatório",
                  })}
                />
                <FormErrorMessage color={"red"}>
                  {errors?.password?.message as string}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Button
              colorScheme={"green"}
              bg={"green.300"}
              px={"10px"}
              onClick={() => submit(handleSubmit)()}
            >
              Registrar
            </Button>
          </Flex>
        )}

        <Flex gap={2} alignItems={"center"}>
          <Text>ou</Text>
          <Button
            as={Link}
            color={"purple"}
            onClick={() => {
              setRegisterPage(!registerPage);
              reset();
            }}
          >
            {registerPage ? "logar" : "registre-se"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
