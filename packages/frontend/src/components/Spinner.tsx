import { styled } from "#styled-system/jsx";
export const Spinner = () => {
  return (
    <div className="preloader">
      <div className="loader"></div>
    </div>
    // <styled.div position="fixed" top="0" left="0" width="100%" height="100%">
    //   <styled.div
    //     display="block"
    //     position="relative"
    //     top="50%"
    //     left="50%"
    //     border="4px solid transparent"
    //     borderTopColor="#000091"
    //     borderRadius="50%"
    //     width="150px"
    //     height="150px"
    //     margin="-75px 0 0 -75px"
    //     animation="spin 2s linear infinite"
    //     {...{
    //       "&::before": {
    //         content: "",
    //         position: "absolute",
    //         top: "5px",
    //         left: "5px",
    //         right: "5px",
    //         bottom: "5px",
    //         borderRadius: "50%",
    //         border: "4px solid transparent",
    //         borderTopColor: "#6A6AF4",
    //         animation: "spin 3s linear infinite",
    //       },
    //       "&::after": {
    //         content: "",
    //         position: "absolute",
    //         top: "15px",
    //         left: "15px",
    //         right: "15px",
    //         bottom: "15px",
    //         borderRadius: "50%",
    //         border: "4px solid transparent",
    //         borderTopColor: "#ADADF9",
    //         animation: "spin 1.5s linear infinite",
    //       },
    //     }}
    //   ></styled.div>
    // </styled.div>
  );
};
