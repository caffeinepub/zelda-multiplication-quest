import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  type LevelState = Nat;

  let progressMap = Map.empty<Principal, LevelState>();

  public query ({ caller }) func getUnlockedLevels() : async LevelState {
    switch (progressMap.get(caller)) {
      case (null) { 1 }; // Start with Level 1 unlocked by default
      case (?state) { state };
    };
  };

  public shared ({ caller }) func unlockNextLevel(level : LevelState) : async () {
    let currentLevel = switch (progressMap.get(caller)) {
      case (null) { 1 }; // Default to level 1
      case (?l) { l };
    };
    if (level > currentLevel) {
      // Only allow progressing to higher levels
      progressMap.add(caller, level);
    };
  };
};
