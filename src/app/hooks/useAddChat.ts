import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { v4 } from "uuid";

async function addChat() {
  const data = await fetchAxios.post("/criaChat");

  return data;
}

export function useAddChat() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["create-chat"],
    mutationFn: addChat,
    onMutate: () => {
      queryClient.setQueryData(["profile"], (prev: any) => {
        const newChat = {
          id: `fakeId-${v4()}`,
          userId: `fakeUserId-${v4()}`,
          name: `Chat #${prev.chats.length + 1}`,
        };
        return { ...prev, chats: [...prev.chats, { ...newChat }] };
      });
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["profile"], (prev: any) => {
        const updatedChat = prev.chats.map((chat: any) => {
          if (
            chat.id.startsWith("fakeId") ||
            chat.userId.startsWith("fakeUserId")
          ) {
            return {
              ...chat,
              id: data.result.id,
              userId: data.result.userId,
            };
          }
          return chat;
        });

        return { ...prev, chats: updatedChat };
      });
    },
    onError: () => {
      queryClient.invalidateQueries(["chats"]);
    },
  });

  return mutate;
}
