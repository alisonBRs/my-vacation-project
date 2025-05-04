"use client";
import { Chats } from "@/components/Chat";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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
      : false
  );
  const { isError, error } = useGetProfile();

  useEffect(() => {
    if (isError && error) {
      console.log("error", error);
      //@ts-ignore
      const { jwtExpired, unauthorized } = error?.response?.data;

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
      >
        <Heading>Teste page</Heading>
        <Flex gap={2} mr={2}>
          <Text>Abrir/Fechar todos os chats: </Text>
          <Switch
            colorPalette={"blue"}
            checked={toggleAllChats}
            onCheckedChange={() => {
              setToggleAllChats(!toggleAllChats);
              localStorage.setItem(
                "setToggleChats",
                storageChats === "true" ? "false" : "true"
              );
            }}
          />
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
