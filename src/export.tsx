import React, { FC, useContext, useRef } from "react";
import { DataStorageContext } from "./data-storage";
import styled from "styled-components";

const StyledExport = styled.a`
  display: block;
  margin: 10px 0;
  padding: 10px 15px;
  width: 100%;
  background-color: #03ffb7;
  color: #333;
  font-size: 1rem;
  text-decoration: none;
`;

export const Export: FC = () => {
  const dataStorage = useContext(DataStorageContext);

  const refA = useRef<null | HTMLAnchorElement>(null);

  return (
    <StyledExport
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
      Export localStorage
    </StyledExport>
  );
};
