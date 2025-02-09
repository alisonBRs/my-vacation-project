import { useQuery } from "react-query";
import { fetchAxios } from "../setup axios/axios";

async function getChats() {
  const { data } = await fetchAxios.get("/");
  return data;
}

export function useGetChats() {
  const query = useQuery({
    queryFn: getChats,
    queryKey: ["chats"],
  });

  return query;
}
