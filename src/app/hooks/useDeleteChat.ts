import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { v4 } from "uuid";
import { chatType } from "@/components/Chats";

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
      queryClient.setQueryData(["profile"], (prev: any) => {
        const updatedChat = prev.chats.filter(
          (chat: chatType) => chat.id !== chatId
        );
        return { ...prev, chats: updatedChat };
      });
    },
  });

  return mutate;
}
