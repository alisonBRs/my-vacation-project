import { useMutation, useQuery } from "react-query";
import { fetchAxios } from "../setup axios/axios";

const getProfile = async () => {
  const result = await fetchAxios.get(`/getProfile`);
  return result.data;
};

export const useGetProfile = () => {
  const mutation = useMutation({
    mutationKey: ["profile"],
    mutationFn: getProfile,
  });
  const { data, mutate, ...useQueryData } = mutation;
  return {
    ...useQueryData,
    profile: mutation.data,
    resolveProfile: mutation.mutate,
  };
};
