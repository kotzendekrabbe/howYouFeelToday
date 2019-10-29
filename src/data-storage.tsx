import React from "react";

export type Mood = "good" | "bad";

interface Feeling {
  readonly mood: Mood;
  readonly note?: string;
}

interface DataSample {
  readonly feeling: Feeling;
}

interface Data {
  [timestamp: string]: DataSample;
}

const STORAGE_KEY = "test-data";

export const dataStorage = {
  save(value: Mood) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
        [Date.now()]: { feeling: { mood: value } }
      })
    );
  }
};

export const DataStorageContext = React.createContext(dataStorage);
