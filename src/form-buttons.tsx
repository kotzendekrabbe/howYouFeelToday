import React, { useState, useContext, useCallback } from "react";
import { ToggleButtons } from "./toggle-buttons";
import { Button } from "./button";
import { DataStorageContext, Mood } from "./data-storage";

export interface FormButtonsProps {
  sentForm(formStatus: "sent" | "error"): void;
}

export function FormButtons({ sentForm }: FormButtonsProps) {
  const [buttonName, setButtonName] = useState<Mood | undefined>(undefined);
  const dataStorage = useContext(DataStorageContext);

  const onActiveButtonChange = useCallback(value => setButtonName(value), [
    setButtonName
  ]);

  //useCallback : we want to avoid that there will be rerenderings if nothing changed here
  const onFormButtonSubmit = useCallback(() => {
    try {
      dataStorage.save(buttonName!);
      sentForm("sent");
    } catch (e) {
      console.error(e);
      sentForm("error");
    }
  }, [sentForm, dataStorage, buttonName]);

  return (
    <form>
      <ToggleButtons onActiveButtonChange={onActiveButtonChange}>
        <Button label="good" value="good" />
        <Button label="bad" value="bad" />
      </ToggleButtons>

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
