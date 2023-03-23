import { useQuery } from "@tanstack/react-query";
import { BORED_ACTIVITY_KEY } from "../queryId";
import { BoredActivity } from "../../types/activity";

export const fetchActivity = (): Promise<BoredActivity> =>
    fetch("http://www.boredapi.com/api/activity/").then((res) => res.json());

export const useGetActivity = () =>
    useQuery({
        queryKey: [BORED_ACTIVITY_KEY],
        queryFn: fetchActivity,
    });
