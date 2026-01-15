import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import type { Activity } from "../types";

// custom hooks by convention start with "use"
// custom hook for managing activities
export const useActivities = (id?: string) => {
  // get the query client instance for invalidating queries
  const queryClient = useQueryClient();
  const location = useLocation();

  // Call the server side api using react query instead of a useEffect hook
  // We get the 'data' back and name it 'activities' in the destructuring assignment
  // This will now handle the loading state and caching of activities, instead of storing them in local state
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && location.pathname === '/activities', // only run this query if id is not provided and we are on the activities page
  });

  // get the individual activity by id. The id will be supplied by the route id param
  // then passed into the hook as an argument
  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id, // only run this query if id is provided
  })

  // useMutation when we need to create, update or delete data on the server

  // update mutation
  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      // Invalidate the activities query and refetch by passing the query key
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  // create mutation
  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      // Invalidate the activities query and refetch by passing the query key
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      // Invalidate the activities query and refetch by passing the query key
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity
  };
};
