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
  save(value: Mood, note?: string) {
    const data: Data = {
      ...dataStorage.load(),
      // [] setzen den enthaltenen wert als key
      [Date.now()]: { feeling: { mood: value, note: note } }
    };
    // throw new Error("this is how I throw errors"); -> testing error
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  load(): Data {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  }
};

export const DataStorageContext = React.createContext(dataStorage);
