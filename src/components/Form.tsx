import React from "react";
import { FC } from "react";

const Form: FC<{ handleSubmit: (event: React.FormEvent) => void }> = ({ handleSubmit }) => {

  return (
    <form className="chat__form" onSubmit={handleSubmit}>
      <input name="content" className="chat__form_input" required />
      <button className="chat__form_btn"></button>
    </form>
  );
}

export default Form;