import useSWR, { mutate } from "swr";
import { API_ROOT } from "@consts";
import { fetcher } from "@utils";

export const useData = () => {
  const { data: updatesData } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 20000,
  });

  const { data: statsData } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 20000,
  });

  const mutateData = () => {
    mutate(`${API_ROOT}/updates.json`);
    mutate(`${API_ROOT}/stats.json`);
  };

  return [updatesData, statsData, mutateData];
};
