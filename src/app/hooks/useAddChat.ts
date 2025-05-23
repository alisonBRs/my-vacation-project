import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { v4 } from "uuid";
import { toast } from "react-toastify";

async function addChat(email: String) {
  const data = await fetchAxios.post("/criaChat", { email });

  return data;
}

export function useAddChat() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["create-chat"],
    mutationFn: (email: String) => addChat(email),
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
    onError: ({ response }) => {
      queryClient.setQueryData(["profile"], (prev: any) => ({
        ...prev,
        chats: prev.chats.filter((chat: any) => !chat.id.startsWith("fakeId")),
      }));

      toast.error(response.data.message);
    },
  });

  return mutate;
}
