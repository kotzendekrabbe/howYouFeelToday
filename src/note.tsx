import React, { FC, useState } from "react";
import { Mood } from "./data-storage";

export interface NoteProps {
  readonly placeholder?: string;
  readonly value?: string;
  onChangeNote(noteValue: string): void;
}

export const Note: FC<NoteProps> = ({ placeholder, value, onChangeNote }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => {
        onChangeNote(e.target.value);
      }}
    ></textarea>
  );
};
