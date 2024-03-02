import { FC } from "react";

type NoteProps = {
  message: {
    id: number,
    userId: string,
    content: string,
  },
  userId: string,
};

const Message: FC<NoteProps> = ({message, userId}) => {

  return (
    <li className={message.userId === userId ? "chat__message user_message" : "chat__message"} id={(message.id).toString()}>
      <p className="chat__message_content">{message.content}</p>
    </li>
  );
}

export default Message;