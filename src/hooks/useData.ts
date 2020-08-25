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
  // const [notification, setNotification] = useTimeoutState<NotificationType>(null, 3000);
  const [notification, setNotification] = useObjectState<NotificationType | null>(null);
  const [stats, setStats] = useObjectState<StatsState>({ data: null, loading: false });
  const [updates, setUpdates] = useObjectState<UpdatesState>({ data: null, loading: false });

  const isInitialised = stats.data != null && updates.data != null;

  const onUpdatesSuccess = (data: UpdateType[]) => {
    if (isInitialised) {
      setTimeout(() => {
        setUpdates({ data, loading: false });
      }, 1000);
    } else {
      setUpdates({ data, loading: false });
    }

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
      console.log(`[UPDATES CHANGED]`);
      setNotification({ counts: updatedCitiesCount, total: updatedTotal });
      setNotification(
        (a) =>
          ({ ...(a || {}), counts: updatedCitiesCount, total: updatedTotal } as NotificationType)
      );
    }
  };

  const onStatsSuccess = (data: StatsType) => {
    setStats({ data, loading: false });

    const [prevCases, prevDelta] = stats.data?.overview?.current || [0, 0];
    const [cases, delta] = data?.overview?.current || [0, 0];
    const isChanged = prevCases != cases || prevDelta != delta;

    if (isChanged && isInitialised) {
      console.log(`[STATS CHANGED] before: ${prevCases}|${prevDelta}, after: ${cases}|${delta}`);
      setNotification(
        (a) =>
          ({
            ...(a || {}),
            current: cases - prevCases,
            delta: delta - prevDelta,
          } as NotificationType)
      );
    }
  };

  const { mutate: mutateUpdates, isValidating: updatesValidating } = useSWR(
    `${API_ROOT}/updates.json`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnReconnect: true,
      onSuccess: onUpdatesSuccess,
    }
  );

  const { mutate: mutateStats, isValidating: statsValidating } = useSWR(
    `${API_ROOT}/stats.json`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnReconnect: true,
      onSuccess: onStatsSuccess,
    }
  );

  useEffect(() => {
    if (updatesValidating || statsValidating) {
      setUpdates((a) => ({ ...a, loading: true }));
    }
  }, [updatesValidating, statsValidating]);

  const mutateData = async () => {
    setStats((a) => ({ ...a, loading: true }));
    setUpdates((a) => ({ ...a, loading: true }));

    await sleep(2000);
    mutateUpdates();
    mutateStats();
  };

  const isLoading = stats.loading || updates.loading;

  const removeNotification = () => setNotification(null);

  return {
    updatesData: updates.data,
    statsData: stats.data,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  };
};
