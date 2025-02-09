import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { v4 } from "uuid";

function addChat() {
  const data = fetchAxios.post("/criaChat");
  return data;
}

export function useAddChat() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["create-chat"],
    mutationFn: addChat,
    onMutate: () => {
      const newChat = {
        id: `fakeId-${v4()}`,
        message: [],
      };
      queryClient.setQueryData(["chats"], (prev: any) => [...prev, newChat]);
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["chats"], (prev: any) => {
        const updatedChat = prev.map((chat: any) => {
          if (chat.id.startsWith("fakeId")) {
            return {
              id: data.result.id,
              message: [],
            };
          }
          return chat;
        });

        return updatedChat;
      });
    },
  });

  return mutate;
}
