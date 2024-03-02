import { FC } from "react";
import Message from "./Message";

type HistoryProps = {
  list: {
    id: number,
    userId: string,
    content: string,
  }[],
  userId: string,
};

const History: FC<HistoryProps> = ({list, userId}) => {

  return (
    <ul className="chat__history">
      {list.map(item => (
        <Message message={item} userId={userId} key={item.id} />
      ))}
    </ul>
  );
}

export default History;