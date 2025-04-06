import { useMutation, useQuery } from "react-query";
import { fetchAxios } from "../setup axios/axios";

const getProfile = async () => {
  const result = await fetchAxios.get(`/getProfile`);
  return result.data;
};

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { data, ...useQueryData } = query;
  return {
    ...useQueryData,
    profile: query.data,
  };
};
