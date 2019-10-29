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
      ...dataStorage.load(),
      [Date.now()]: { feeling: { mood: value } }
    };
    // throw new Error("this is how I throw errors"); -> testing error
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  load(): Data {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }
};

export const DataStorageContext = React.createContext(dataStorage);
