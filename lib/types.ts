import { EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { ReactNode } from "react";

export interface CosAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface HomeProps {}
export interface SearchProps {}

export interface SearchBarProps {}
export interface AppBarProps {}
export interface LayoutProps {
  children: ReactNode;
}
