import { EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { NextRouter } from "next/router";
import { ReactNode } from "react";

export interface CosAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface HomeProps {
  router: NextRouter;
}

export interface LayoutProps {
  children: ReactNode;
}

export interface SearchBarProps {}
