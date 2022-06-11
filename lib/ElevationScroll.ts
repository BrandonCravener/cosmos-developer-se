import { useScrollTrigger } from "@mui/material";
import { cloneElement } from "react";
import { ElevationScrollProps } from "./types";

export const ElevationScroll = (props: ElevationScrollProps) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    color: trigger ? "primary" : "transparent",
    elevation: trigger ? 1 : 0,
  });
};
