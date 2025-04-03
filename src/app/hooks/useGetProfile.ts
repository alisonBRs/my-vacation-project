import { useQuery } from "react-query";
import { fetchAxios } from "../setup axios/axios";

const getProfile = async () => {
  const data = fetchAxios.get(`/getProfile/`);

  return data;
};

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const { data, ...useQueryData } = query;
  return { ...useQueryData, profile: query.data };
};
