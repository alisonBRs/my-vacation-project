"use client";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import { CloseButton } from "./ui/close-button";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { v4 } from "uuid";
import { VscSend } from "react-icons/vsc";
import { useGetChats } from "@/app/hooks/useGetChats";
import { useAddChat } from "@/app/hooks/useAddChat";
import { useDeleteChat } from "@/app/hooks/useDeleteChat";
import { useSendMessage } from "@/app/hooks/useSendMessage";
import { io } from "socket.io-client";
import { useGetProfile } from "@/app/hooks/useGetProfile";
import { AddChatModal } from "./modal/AddChatModal";

const socket = io("http://localhost:3080");
export interface messageType {
  id?: string;
  chatId?: string;
  message?: string;
  messageInput?: string;
}
export interface chatType {
  name: string;
  id: string;
  openned: boolean;
  userId: string;
  message: messageType[];
}
export const Chats = ({
  setToggleAllChats,
}: {
  setToggleAllChats: boolean;
}) => {
  interface sendChatMessageType {
    chatId: string;
    message: string[];
  }

  const { mutate: deleteChat } = useDeleteChat();
  const { mutateAsync: successSendMessage } = useSendMessage();
  const { profile, isLoading } = useGetProfile();
  const [chatListCopy, setChatListCopy] = useState<chatType[]>([]);
  const [sendTextMessage, setSendTextMessage] = useState("");
  const [message, setMessage] = useState<messageType[] | []>([]);
  const { mutate: addChat } = useAddChat();
  const { open, onOpen, onClose } = useDisclosure();
  const handleCloseChat = (selectedChat: chatType) => {
    deleteChat({ chatId: selectedChat.id });
    setChatListCopy(
      chatListCopy.filter((chat: chatType) => chat.id !== selectedChat.id)
    );
  };
  const handleAddChat = (email: string) => {
    addChat(email);
    const id = v4();

    setMessage([
      ...message,
      {
        chatId: id,
        message: "",
      },
    ]);
  };

  const handleOpenChat = (data: chatType) => {
    const selectedChat = chatListCopy.find(
      (chat: chatType) => chat.id === data.id
    );

    const chatAlreadyOpen = chatListCopy.find(
      (chat: chatType) => chat.id === data.id && chat.openned
    );

    if (chatAlreadyOpen) {
      const closeChat = chatListCopy.map((chat: chatType) => {
        if (chat.id === chatAlreadyOpen.id && chat.openned) {
          return { ...chat, openned: false };
        }
        return chat;
      });
      setChatListCopy(closeChat);
      return;
    }
    if (selectedChat) {
      const updatedToggleChat = chatListCopy.map((toggleChat: chatType) => {
        if (toggleChat.id === data.id) {
          return {
            ...toggleChat,
            openned: true,
          };
        }
        return toggleChat;
      });
      setChatListCopy(updatedToggleChat);
    }
  };

  const sendMessage = async ({
    chatId,
    textMessage,
    userId,
  }: {
    chatId: string;
    textMessage: string;
    userId: string;
  }) => {
    const chatAwaysOpen = profile?.chats.map(
      (chat: chatType, index: number) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            openned: true,
            name: chat.name || `Chat #${index + 1}`,
          };
        }
        return chat;
      }
    );

    setChatListCopy(chatAwaysOpen);
    if (textMessage.trim()) {
      await successSendMessage({
        chatId,
        message: textMessage,
      });

      const messageObj = {
        chatId,
        message: textMessage,
      };

      socket.emit("sendMessage", messageObj);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const formatedChats = profile?.chats?.map((chat: any, index: number) => {
        return {
          ...chat,
          name: chat?.name || `Chat #${index + 1}`,
          openned: setToggleAllChats,
          message: profile?.message.filter(
            (msg: any) => msg.chatId === chat.id
          ),
        };
      });

      const formatedChatMessage = profile?.chats?.map((msg: any) => {
        return {
          ...msg,
          messageInput:
            message.find((msgSetted) => msg.id === msgSetted.id)
              ?.messageInput || "",
        };
      });

      setChatListCopy(formatedChats);
      setMessage(formatedChatMessage);
    }
  }, [profile, isLoading, setToggleAllChats]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log("Nova mensagem recebida:", message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Flex
      justifyContent={"flex-end"}
      gap={2}
      w={"full"}
      alignItems={"flex-end"}
    >
      {chatListCopy?.map((chat: chatType, index: number) => (
        <Box key={`chat-container-${chat.id}`}>
          <Flex
            onClick={() => handleOpenChat(chat)}
            p={1}
            cursor={"pointer"}
            border={"1px dotted gray"}
            w={"211px"}
            justifyContent={"space-between"}
            _hover={{
              bg: "gray.300",
              transition: "all 0.3s",
            }}
          >
            <Text>{chat.name}</Text>

            <CloseButton
              size={"2xs"}
              _hover={{ bg: "red.300" }}
              onClick={(e) => {
                e.stopPropagation();
                handleCloseChat(chat);
              }}
            />
          </Flex>

          {chatListCopy.map((chatBox: chatType) => {
            if (!chatBox.openned) {
              return;
            }
            let focusedInput = message.find((msg) => msg.id === chatBox.id);

            return (
              <Flex
                key={`chat-input-${chatBox.id}`}
                flexDir={"column"}
                border={"1px solid black"}
                w={"211px"}
                p={1}
                display={
                  chatBox.openned && chatBox.id === chat.id ? "flex" : "none"
                }
              >
                <Flex
                  h={"250px"}
                  overflowY={"auto"}
                  alignItems={"flex-end"}
                  justifyContent={"flex-end"}
                  p={4}
                  flexDir={"column"}
                  gap={2}
                >
                  {chatBox?.message?.length
                    ? chatBox?.message?.map((data, index) => (
                        <Text
                          key={`message-${data.chatId}-${index}`}
                          bg={"green.300"}
                          p={1}
                          rounded={"6px"}
                        >
                          {data.message}
                        </Text>
                      ))
                    : null}
                </Flex>
                <Flex gap={"0.5rem"}>
                  <Input
                    placeholder="Digite aqui..."
                    value={focusedInput?.messageInput}
                    onChange={(e) => {
                      setSendTextMessage(e.target.value);
                      setMessage((prev: messageType[]) => {
                        const updatedMessage = prev.map((msg) => {
                          if (msg.id === chatBox.id) {
                            return { ...msg, messageInput: e.target.value };
                          }
                          return msg;
                        });
                        return updatedMessage;
                      });
                    }}
                    onKeyDown={({ key }) => {
                      if (key === "Enter") {
                        sendMessage({
                          chatId: chat.id,
                          textMessage: focusedInput?.messageInput || "",
                          userId: chat.userId,
                        });

                        const clearFocusedInput = message.map((msg) => {
                          if (msg.id === chatBox.id) {
                            return { ...msg, messageInput: "" };
                          }
                          return msg;
                        });
                        setMessage(clearFocusedInput);
                      }
                    }}
                  />
                  <Flex
                    alignItems={"center"}
                    p={2}
                    _hover={{
                      bg: "green.300",
                    }}
                    rounded={"6px"}
                    cursor={"pointer"}
                    onClick={() => {
                      sendMessage({
                        chatId: chat.id,
                        textMessage: focusedInput?.messageInput || "",
                        userId: chat.userId,
                      });
                      const clearFocusedInput = message.map((msg) => {
                        if (msg.id === chatBox.id) {
                          return { ...msg, messageInput: "" };
                        }
                        return msg;
                      });

                      setMessage(clearFocusedInput);
                    }}
                  >
                    <VscSend />
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Box>
      ))}
      <AddChatModal
        isOpen={open}
        onClose={onClose}
        handleAddChat={handleAddChat}
      />
      <Box
        onClick={onOpen}
        cursor={"pointer"}
        rounded={"6px"}
        p={0.5}
        _hover={{
          bg: "green.400",
          transition: "all 0.5s",
        }}
        as={IoMdAddCircleOutline}
        h={8}
        w={6}
        mr={8}
      />
    </Flex>
  );
};
