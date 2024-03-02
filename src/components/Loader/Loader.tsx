import "./Loader.css";

const Loading = () => {

  return (
    <div className="modal">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Loading;