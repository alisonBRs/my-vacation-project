import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { chatType } from "@/components/Chats";
import { v4 } from "uuid";

interface dataType {
  name?: string;
  openned?: boolean;
}

function updateChat({ id, data }: { id: string; data: dataType }) {
  const result = fetchAxios.put(`/atualizaChat/${id}`, {
    data,
  });
  return result;
}

export function useUpdateChat() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-chat"],
    mutationFn: updateChat,
    onMutate: ({ id, data }) => {
      const fakeId = v4();

      queryClient.setQueryData(["chats"], (prev: any) => {
        const updatedChats = prev.map((chat: chatType) => {
          if (chat.id === id) {
            return {
              id: `fakeId-${fakeId}`,
              data,
            };
          }
          return chat;
        });

        return updatedChats;
      });
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["chats"], (prev: any) => {
        const updatedChatsWithId = prev.map((chat: chatType) => {
          if (chat.id.startsWith("fakeId")) {
            return {
              ...chat,
              id: data.id,
            };
          }

          return chat;
        });

        return updatedChatsWithId;
      });
    },
  });

  return mutation;
}
