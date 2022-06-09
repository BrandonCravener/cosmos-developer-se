import { EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

// Helpers
export interface CosAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface ElevationScrollProps {
  children: ReactElement<any>;
}

// Pages
export interface HomeProps {}
export interface SearchProps {}

// Components
export interface LayoutProps {
  children: ReactNode;
}
export interface NavBarProps {}
export interface SearchEngineProps {
  cseURI: string;
}
export interface SearchEngineState {
  page: number;
  totalPages: number;
  pagination: HTMLCollection | null;
  searchResults: SearchResult[];
}
export interface SearchInputProps {
  size?: "small" | "medium" | undefined;
  margin?: "none" | "normal" | "dense" | undefined;
}

// Global
export interface SearchResult {
  title: string;
  url: string;
  description: string;
}
