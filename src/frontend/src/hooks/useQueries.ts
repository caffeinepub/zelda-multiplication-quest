import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LevelState } from "../backend";
import { useActor } from "./useActor";

export function useGetUnlockedLevels() {
  const { actor, isFetching } = useActor();

  return useQuery<LevelState>({
    queryKey: ["unlockedLevels"],
    queryFn: async () => {
      if (!actor) return BigInt(1);
      return actor.getUnlockedLevels();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUnlockNextLevel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (level: LevelState) => {
      if (!actor) return;
      await actor.unlockNextLevel(level);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unlockedLevels"] });
    },
  });
}
