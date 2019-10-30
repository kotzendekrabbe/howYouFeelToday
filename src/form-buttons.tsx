import React, { useState, useContext, useCallback } from "react";
import { ToggleButtons } from "./toggle-buttons";
import { Button } from "./button";
import { DataStorageContext, Mood } from "./data-storage";
import { Note } from "./note";

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
        <Button label="good" value="good" />
        <Button label="bad" value="bad" />
      </ToggleButtons>

      <Note
        placeholder="please insert here"
        value={note}
        onChangeNote={onChangeNote}
      />

      <button
        type="button"
        // ! means - I'm sure that you are wrong compiler ;)
        onClick={onFormButtonSubmit}
        disabled={!Boolean(buttonName)}
      >
        Submit
      </button>
    </form>
  );
}
