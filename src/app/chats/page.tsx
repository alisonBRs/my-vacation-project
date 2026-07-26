"use client";
import { Chats } from "@/components/Chats";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useGetProfile } from "../hooks/useGetProfile";

export default function Principal() {
  const storageChats = localStorage?.getItem("setToggleChats");
  const [toggleAllChats, setToggleAllChats] = useState(
    storageChats && storageChats === "true"
      ? !storageChats
        ? false
        : true
      : false,
  );
  const { isError, error } = useGetProfile();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000";
  };

  useEffect(() => {
    if (isError && error) {
      //@ts-ignore

      const jwtExpired = error?.response?.data?.jwtExpired;
      //@ts-ignore

      const unauthorized = error?.response?.data?.unauthorized;

      if (jwtExpired || unauthorized) {
        redirect("/");
      }
    }
  }, [isError, error]);

  return (
    <Flex flexDirection={"column"} alignItems={"center"} h={"100vh"}>
      <Flex
        justifyContent={"space-between"}
        w={"full"}
        border={"1px solid red"}
        paddingX={4}
        paddingY={2}
      >
        <Heading>Teste page</Heading>
        <Flex gap={4}>
          <Flex gap={2} mr={2} alignItems={"center"}>
            <Text>Abrir/Fechar todos os chats: </Text>
            <Switch
              colorPalette={"blue"}
              checked={toggleAllChats}
              onCheckedChange={() => {
                setToggleAllChats(!toggleAllChats);
                localStorage.setItem(
                  "setToggleChats",
                  storageChats === "true" ? "false" : "true",
                );
              }}
            />
          </Flex>

          <Button padding={1} onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Flex>
      <Flex
        w={"full"}
        border={"1px solid red"}
        flex={1}
        flexDirection={"column"}
        h={"full"}
      >
        <Box flex={1}>
          <Text>Meu projeto</Text>
        </Box>
        <Chats setToggleAllChats={toggleAllChats} />
      </Flex>
      <Box w={"full"} border={"1px solid red"}>
        <Text>Footer</Text>
      </Box>
    </Flex>
  );
}
