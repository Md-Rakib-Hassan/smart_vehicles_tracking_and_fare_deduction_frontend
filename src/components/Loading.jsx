import ReactLoading from "react-loading";
const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#1189ff"}
          height={"7%"}
          width={"7%"}
        />
      </div>
    );
};

export default Loading;