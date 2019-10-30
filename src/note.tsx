import React, { FC } from "react";
import styled from "styled-components";

const StyledNote = styled.textarea`
  display: block;
  width: 100%;
  padding: 15px;

  border: 1px solid #4502da;
  font-size: 1rem;
`;

export interface NoteProps {
  readonly placeholder?: string;
  readonly value?: string;
  onChangeNote(noteValue: string): void;
}

export const Note: FC<NoteProps> = ({ placeholder, value, onChangeNote }) => {
  return (
    <StyledNote
      placeholder={placeholder}
      value={value}
      onChange={e => {
        onChangeNote(e.target.value);
      }}
    ></StyledNote>
  );
};
