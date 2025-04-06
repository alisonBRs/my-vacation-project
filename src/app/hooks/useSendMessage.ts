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
      queryClient.setQueryData(["profile"], (prev: any) => {
        const copyMessages = [...prev.message];

        const fakeMessage = {
          id: `fakeId-${v4()}`,
          chatId,
          message,
        };

        return {
          ...prev,
          message: [...copyMessages, fakeMessage],
        };
      });
    },

    onSuccess: ({ data }) => {
      queryClient.setQueryData(["profile"], (prev: any) => {
        const updatedChat = prev.message.map((message: chatType) => {
          if (
            message?.id?.startsWith("fakeId") ||
            message?.userId?.startsWith("fakeUserId")
          ) {
            return {
              ...message,
              id: data.result.id,
              userId: data.result.userId,
              openned: true,
            };
          }
          return message;
        });

        return { ...prev, message: updatedChat };
      });
    },
    onError: () => {
      queryClient.invalidateQueries(["chats"]);
    },
  });

  return mutate;
}
