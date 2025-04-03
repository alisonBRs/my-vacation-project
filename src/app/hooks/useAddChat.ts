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
      queryClient.setQueryData(["chats"], (prev: any) => {
        const newChat = {
          id: `fakeId-${v4()}`,
          message: [],
          userId: `fakeUserId-${v4()}`,
          name: `Chat #${prev.length + 1}`,
        };
        if (prev) {
          return [...prev, newChat];
        }

        return [newChat];
      });
    },
    onSuccess: ({ data }) => {
      console.log(data, "data");
      queryClient.setQueryData(["chats"], (prev: any) => {
        const updatedChat = prev.map((chat: any) => {
          if (
            chat.id.startsWith("fakeId") ||
            chat.userId.startsWith("fakeUserId")
          ) {
            return {
              ...chat,
              id: data.result.id,
              userId: data.result.userId,
              message: [],
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
