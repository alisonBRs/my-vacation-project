import { useMutation, useQueryClient } from "react-query";
import { fetchAxios } from "../setup axios/axios";
import { toast } from "react-toastify";

interface CreateUserType {
  email: string;
  password: string;
}

function loginUser(data: CreateUserType) {
  console.log(data);
  const result = fetchAxios.post("/login", data);
  return result;
}

export function useLogin() {
  const mutate = useMutation({
    mutationKey: ["user-login"],
    mutationFn: loginUser,
    onSuccess: ({ data }) => {
      return data;
    },
    onError: ({ data }) => {
      toast.error("Email ou senha inválidos!");
      return data;
    },
  });

  return { ...mutate, login: mutate.mutateAsync };
}
