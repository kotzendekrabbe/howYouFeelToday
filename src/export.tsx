import React, { FC, useContext, useRef } from "react";
import { DataStorageContext } from "./data-storage";

export const Export: FC = () => {
  const dataStorage = useContext(DataStorageContext);

  const refA = useRef<null | HTMLAnchorElement>(null);

  return (
    <a
      href="#"
      download="meinedatei.csv"
      onClick={() => {
        if (refA.current) {
          const data = dataStorage.load();

          const lines = Object.keys(data).map(currentTimestamp => {
            const feeling = data[currentTimestamp].feeling;
            const date = new Date(parseInt(currentTimestamp, 10));

            // year-month-day hour:minutes:seconds
            return (
              date.getFullYear() +
              "-" +
              date.getMonth() +
              "-" +
              date.getDay() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds() +
              ";" +
              feeling.mood +
              ";" +
              feeling.note
            );
          });

          refA.current.href = `data:text/csv,${encodeURIComponent(
            "Date;Feeling;Note\n" + lines.join("\n")
          )}`;
        }
      }}
      ref={refA}
    >
      export
    </a>
  );
};
