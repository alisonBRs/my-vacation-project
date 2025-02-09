"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterHome() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  interface dataType {
    email: string;
    password: string;
  }
  const router = useRouter();
  const handleSubmit = (data: dataType) => {
    if (
      data.email === "alison.teste@teste.com" &&
      data.password === "teste123"
    ) {
      return router.push("/chats");
    }
    toast.error("Email ou senha incorreto", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
      style: { background: "#fbc5c5" },
    });
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
      >
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
        <Box>
          <Button onClick={() => handleSubmit({ email, password: pass })}>
            Logar
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
