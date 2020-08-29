import { useState, useEffect, useRef } from "react";
import useSWR, { mutate } from "swr";

import { API_ROOT } from "@consts";
import { fetcher, jsonCompare, sleep } from "@utils";
import { StatsType, UpdateType, NotificationType } from "@types";
import { useTimeoutState } from "./useTimeoutState";
import { useObjectState } from "./useObjectState";

interface StatsState {
  data: StatsType | null;
  loading: boolean;
}
interface UpdatesState {
  data: UpdateType[] | null;
  loading: boolean;
}

export const useData = () => {
  const [notification, setNotification] = useObjectState<NotificationType | null>(null);
  const [stats, setStats] = useObjectState<StatsState>({ data: null, loading: false });
  const [updates, setUpdates] = useObjectState<UpdatesState>({ data: null, loading: false });

  const isInitialised = stats.data != null && updates.data != null;

  const onUpdatesSuccess = (data: UpdateType[]) => {
    if (!updates.data) setUpdates({ data });
    const isChanged = jsonCompare(data, updates.data) == false;
    if (isChanged && isInitialised) {
      const newUpdates = data.filter(
        (newUpdate) => !updates.data?.find((update) => jsonCompare(newUpdate, update))
      );
      let updatedTotal = 0;
      const updatedCitiesCount = newUpdates.reduce((count, { city, cases }) => {
        if (!count[city]) count[city] = 0;
        count[city] += cases;
        updatedTotal += cases;
        return count;
      }, {});
      console.log(`[UPDATES CHANGED]`, { old: updates.data, new: data });
      setNotification({ counts: updatedCitiesCount, total: updatedTotal });
      setUpdates({ data });
    }
  };

  const onStatsSuccess = (data: StatsType) => {
    if (!stats.data) setStats({ data });
    const [prevCases, prevDelta] = stats.data?.overview?.current || [0, 0];
    const [cases, delta] = data?.overview?.current || [0, 0];
    const isChanged =
      prevCases != cases ||
      prevDelta != delta ||
      data.announcements.length != stats.data?.announcements.length;

    if (isChanged && isInitialised) {
      // console.log(`[STATS CHANGED] before: ${prevCases}|${prevDelta}, after: ${cases}|${delta}`);
      // setNotification({
      //   current: cases - prevCases,
      //   delta: delta - prevDelta,
      // });
      setStats({ data });
    }
  };

  const { mutate: mutateUpdates, isValidating: updatesValidating } = useSWR(
    `${API_ROOT}/updates.json`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnReconnect: true,
      revalidateOnMount: false,
      onSuccess: onUpdatesSuccess,
    }
  );

  const { mutate: mutateStats, isValidating: statsValidating } = useSWR(
    `${API_ROOT}/stats.json`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnReconnect: true,
      revalidateOnMount: false,
      onSuccess: onStatsSuccess,
    }
  );

  useEffect(() => {
    if (updatesValidating == true) {
      setUpdates({ loading: !!notification ? false : true });
    } else {
      setTimeout(() => {
        setUpdates({ loading: updatesValidating });
      }, 2000);
    }
  }, [updatesValidating, statsValidating]);

  const mutateData = async () => {
    setStats({ loading: true });
    setUpdates({ loading: true });

    mutateUpdates();
    mutateStats();
  };

  const isLoading = updates.loading;

  useEffect(() => {
    console.log({ isInitialised, isLoading });
    if (!isInitialised && !isLoading) mutateData();
  }, [isInitialised]);

  const removeNotification = () => setNotification(null, true);

  return {
    updatesData: updates.data,
    statsData: stats.data,

    mutateData,
    isLoading,
    notification,
    removeNotification,
  };
};
