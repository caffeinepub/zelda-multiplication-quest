import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type LevelState = bigint;
export interface backendInterface {
    getUnlockedLevels(): Promise<LevelState>;
    unlockNextLevel(level: LevelState): Promise<void>;
}
