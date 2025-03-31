import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";

interface CreateUserType {
  name: string;
  email: string;
  password: string;
}

function createUser(data: CreateUserType) {
  const result = fetchAxios.post("/createUser", data);
  return result;
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
    onSuccess: ({ data }) => {
      return data;
    },
    onError: ({ data }) => {
      return data;
    },
  });

  return { ...mutate, registerUser: mutate.mutateAsync };
}
