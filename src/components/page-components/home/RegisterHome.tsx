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

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { useCreateUser } from "@/app/hooks/useCreateUser";
import { useLogin } from "@/app/hooks/useLogin";

export default function RegisterHome() {
  const [registerPage, setRegisterPage] = useState(false);
  const { registerUser, isLoading: isLoadingRegisterUser } = useCreateUser();
  const { login, isLoading: isLoadingLogin } = useLogin();

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

  const handleSubmit = async () => {
    const data = getValues();
    const result = await registerUser(data);
    if (result.data.error === false) {
      toast.success("Usuário criado com sucesso!");
      setRegisterPage(false);
      reset();
    }

    console.log("resultado", result);
  };

  const handleLoginSubmit = async () => {
    const { email, password } = getValues();
    const result = await login({ email, password });
    console.log("result", result);

    if (result.status === 200 && result.data) {
      localStorage.setItem("token", `Bearer-${result.data.token}`);
      window.location.href = "http://localhost:3000/chats";
    }
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

            <FormControl isInvalid={!!errors?.name}>
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

            <Button
              colorScheme={"green"}
              bg={"green.300"}
              px={"10px"}
              onClick={() => handleLoginSubmit()}
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
