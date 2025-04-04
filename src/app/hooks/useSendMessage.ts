import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { v4 } from "uuid";
import { chatType, messageType } from "@/components/Chat";

function sendMessage({ chatId, message }: { chatId: string; message: string }) {
  const data = fetchAxios.post("/addMensagem", {
    chatId,
    message,
  });
  return data;
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["message"],
    mutationFn: sendMessage,
    onMutate: ({ message, chatId }) => {
      queryClient.setQueryData(["chats"], (prev: any) => {
        console.log("prev", prev);
        const updatedChatMessage = prev.map((chat: chatType) => {
          if (chat.id === chatId) {
            const messageCopy = chat?.message.length ? [...chat.message] : [];
            messageCopy.push({ message, chatId });
            return {
              ...chat,
              message: messageCopy,
              id: `fakeId-${v4()}`,
              userId: `fakeUserId-${v4()}`,
            };
          }
          return chat;
        });
        return updatedChatMessage;
      });
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["chats"], (prev: any) => {
        const updatedChat = prev.map((chat: chatType) => {
          if (
            chat?.id?.startsWith("fakeId") ||
            chat?.userId?.startsWith("fakeUserId")
          ) {
            return {
              ...chat,
              id: data.result.id,
              userId: data.result.userId,
              openned: true,
            };
          }
          return chat;
        });

        return updatedChat;
      });
    },
    onError: () => {
      queryClient.invalidateQueries(["chats"]);
    },
  });

  return mutate;
}
