import React, { FC } from "react";

export interface FeedbackProps {
  readonly formFeedback: "sent" | "error";
}

export const Feedback: FC<FeedbackProps> = ({ formFeedback }) => {
  return <div>{formFeedback}</div>;
};
