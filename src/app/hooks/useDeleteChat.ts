import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { v4 } from "uuid";
import { chatType } from "@/components/Chat";

function deleteChat({ chatId }: { chatId: string }) {
  const data = fetchAxios.delete(`/deleteChat/${chatId}`);
  return data;
}

export function useDeleteChat() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["create-chat"],
    mutationFn: deleteChat,
    onMutate: ({ chatId }) => {
      queryClient.setQueryData(["chats"], (prev: any) => {
        const updatedChat = prev.filter((chat: chatType) => chat.id !== chatId);
        return updatedChat;
      });
    },
  });

  return mutate;
}
