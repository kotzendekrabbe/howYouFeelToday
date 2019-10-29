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

const STORAGE_KEY = "feeling-data";

export const dataStorage = {
  save(value: Mood) {
    const data: Data = {
      ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
      [Date.now()]: { feeling: { mood: value } }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const DataStorageContext = React.createContext(dataStorage);
