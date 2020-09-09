import { useEffect } from "react";
import useSWR from "swr";

import { API_ROOT, SECOND } from "@consts";
import { fetcher } from "@utils";
import { StatsType, UpdateType, NotificationType } from "@types";
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

  const removeNotification = () => setNotification(null, true);

  const isInitialised = stats.data != null && updates.data != null;

  const onUpdatesFetched = (newUpdates: UpdateType[]) => {
    if (updates.data == null) setUpdates({ data: newUpdates });

    const newCases = newUpdates.filter(
      (newUpdate) =>
        !updates.data?.find((oldUpdate) => {
          return newUpdate.datetime == oldUpdate.datetime;
        })
    );

    if (newCases.length > 0 && isInitialised) {
      let addedCases = 0;

      const casesCountByCity = newCases.reduce((obj, { city, cases }) => {
        obj[city] = obj[city] ? obj[city] + cases : cases;
        addedCases += cases;
        return obj;
      }, {});

      if (addedCases > 0) setNotification({ casesCountByCity, addedCases });
      setUpdates({ data: newUpdates });
    }
  };

  const onStatsFetched = (newStats: StatsType) => {
    if (stats.data == null) setStats({ data: newStats });

    const [prevCases, prevDelta] = stats.data?.overview?.current || [0, 0];
    const [newCases, newDelta] = newStats?.overview?.current || [0, 0];

    const isChanged =
      prevCases != newCases ||
      prevDelta != newDelta ||
      newStats.announcements.length != stats.data?.announcements.length;

    if (isChanged && isInitialised) {
      setStats({ data: newStats });
    }
  };

  const { mutate: mutateUpdates, isValidating: updatesLoading } = useSWR(
    `${API_ROOT}/updates.json`,
    fetcher,
    {
      refreshInterval: SECOND * 30,
      revalidateOnReconnect: true,
      revalidateOnMount: false,
      onSuccess: onUpdatesFetched,
    }
  );

  const { mutate: mutateStats } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    refreshInterval: SECOND * 30,
    revalidateOnReconnect: true,
    revalidateOnMount: false,
    onSuccess: onStatsFetched,
  });

  useEffect(() => {
    if (updatesLoading == true) {
      setUpdates({ loading: !!notification ? false : true });
    } else {
      setTimeout(() => {
        setUpdates({ loading: updatesLoading });
      }, 2000);
    }
  }, [updatesLoading]);

  const mutateData = async () => {
    setStats({ loading: true });
    setUpdates({ loading: true });

    mutateUpdates();
    mutateStats();
  };

  const isLoading = updates.loading;

  useEffect(() => {
    if (!isInitialised && !isLoading) mutateData();
  }, [isInitialised]);

  return {
    updatesData: updates.data,
    statsData: stats.data,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  };
};
