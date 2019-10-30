import React, { useState, useContext, useCallback } from "react";
import { ToggleButtons } from "./toggle-buttons";
import { Button } from "./button";
import { DataStorageContext, Mood } from "./data-storage";
import { Note } from "./note";
import styled from "styled-components";

const StyledSubmit = styled.button`
  display: block;
  width: auto;
  border: 0;
  text-align: right;
  font-size: 1rem;
  padding: 10px 15px;
  margin: 20px 0 10px auto;
  background-color: #03ffb7;
  color: #333;
  box-shadow: none;
`;

export interface FormButtonsProps {
  sentForm(formStatus: "sent" | "error"): void;
}

export function FormButtons({ sentForm }: FormButtonsProps) {
  const [buttonName, setButtonName] = useState<Mood | undefined>(undefined);
  const [note, setNote] = useState<string | undefined>(undefined);

  const dataStorage = useContext(DataStorageContext);

  const onActiveButtonChange = useCallback(
    (value: Mood) => setButtonName(value),
    [setButtonName]
  );

  const onChangeNote = useCallback((value: string) => setNote(value), [
    setNote
  ]);

  //useCallback : we want to avoid that there will be rerenderings if nothing changed here
  const onFormButtonSubmit = useCallback(() => {
    try {
      dataStorage.save(buttonName!, note);
      sentForm("sent");
    } catch (e) {
      console.error(e);
      sentForm("error");
    }
  }, [sentForm, dataStorage, buttonName, note]);

  return (
    <form>
      <ToggleButtons onActiveButtonChange={onActiveButtonChange}>
        <Button label="Angst" value="Angst" />
        <Button label="Ärger" value="Ärger" />
        <Button label="Abneigung" value="Abneigung" />
        <Button label="Nieder-Geschlagenheit" value="Nieder-Geschlagenheit" />
        <Button label="Zuneigung" value="Zuneigung" />
        <Button label="Freude" value="Freude" />
        <Button label="Scham" value="Scham" />
        <Button label="Trauer" value="Trauer" />
      </ToggleButtons>

      <Note
        placeholder="please insert here"
        value={note}
        onChangeNote={onChangeNote}
      />

      <StyledSubmit
        type="button"
        // ! means - I'm sure that you are wrong compiler ;)
        onClick={onFormButtonSubmit}
        disabled={!Boolean(buttonName)}
      >
        Submit
      </StyledSubmit>
    </form>
  );
}
