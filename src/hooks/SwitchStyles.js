import { makeStyles } from "@material-ui/core/styles";

const switchStyles = makeStyles((theme) => ({
  root: {
    width: 80,
    height: 45,
    padding: 8,
  },
  switchBase: {
    padding: 11,
    color: "#ff6a00",
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
  },
  track: {
    background: "linear-gradient(to right, #B2912A, #FFD03D)",
    opacity: "1 !important",
    borderRadius: 15,
    position: "relative",
    "&:before, &:after": {
      display: "inline-block",
      position: "absolute",
      top: "50%",
      width: "50%",
      transform: "translateY(-50%)",
      color: "#fff",
      textAlign: "center",
    },
    "&:before": {
      content: '"α"',
      left: 4,
      opacity: 0,
    },
    "&:after": {
      content: '"ƒ"',
      right: 4,
    },
  },
  checked: {
    "&$switchBase": {
      color: "#185a9d",
      transform: "translateX(33px)",
      "&:hover": {
        backgroundColor: "rgba(24,90,257,0.08)",
      },
    },
    "& $thumb": {
      backgroundColor: "#fff",
    },
    "& + $track": {
      background: "linear-gradient(to right, #37B24C, #1F652B)",
      "&:before": {
        opacity: 1,
      },
      "&:after": {
        opacity: 0,
      },
    },
  },
}));

export default switchStyles;
