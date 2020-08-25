import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";

import { API_ROOT } from "@consts";
import { fetcher } from "@utils";
import { StatsType, UpdateType } from "@types";

export const useData = () => {
  const [stats, setStats] = useState<{
    data: StatsType | null;
    loading: boolean;
  }>({ data: null, loading: false });

  const [updates, setUpdates] = useState<{
    data: UpdateType[] | null;
    loading: boolean;
  }>({ data: null, loading: false });

  const onUpdatesSuccess = (data: UpdateType[]) => {
    console.log(`[UPDATES] before: ${(updates.data || []).length}, after: ${data.length}`);
    setUpdates({ data, loading: false });
  };

  const onStatsSuccess = (data: StatsType) => {
    console.log(
      `[STATS] before: ${stats.data?.overview?.confirmed}, after: ${data?.overview?.confirmed}`
    );
    setStats({ data, loading: false });
  };

  const { mutate: mutateUpdates } = useSWR(`${API_ROOT}/updates.json`, fetcher, {
    refreshInterval: 20000,
    revalidateOnReconnect: true,
    onSuccess: onUpdatesSuccess,
  });

  const { mutate: mutateStats } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    refreshInterval: 20000,
    revalidateOnReconnect: true,
    onSuccess: onStatsSuccess,
  });

  // useEffect(() => {
  //   console.log({ updatesLoading, statsLoading });
  // }, [updatesLoading, statsLoading]);

  const mutateData = () => {
    mutateUpdates();
    mutateStats();

    setStats((a) => ({ ...a, loading: true }));
    setUpdates((a) => ({ ...a, loading: true }));
  };

  const isUpdating = stats.loading || updates.loading;

  return { updatesData: updates.data, statsData: stats.data, mutateData, isUpdating };
};
