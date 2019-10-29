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

export const dataStorage = {
  save(value: Mood) {
    const dataSample: DataSample = { feeling: { mood: value } };
    const dataTimestamp = Date.now();
    const data: Data = { [dataTimestamp]: dataSample };

    const storageData = localStorage.getItem("test-data");
    const dataJSON = JSON.parse(storageData === null ? "{}" : storageData);

    const newDataJSON = {
      ...dataJSON,
      ...data
    };

    localStorage.setItem("test-data", JSON.stringify(data));
  }
};

export const DataStorageContext = React.createContext(dataStorage);
