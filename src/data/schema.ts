import type { SimpleIcon } from "simple-icons";
import React from "react";

export interface Link {
  text: string;
  href: string;
}

export interface FeaturedContent {
  video?: {
    src: string;
    poster?: string;
  };
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  videoCaption?: string;
  videoCaptionLinks?: Link[];
  additionalContent?: string;
}

export interface ContentEntry {
  id: string;
  content: string;
  layout?: "full" | "half";
  links?: Link[];
  featured?: FeaturedContent;
  metadata?: {
    date?: string;
    label?: string;
    badge?: string;
  };
}

export type SectionIcon =
  | { kind: "simple"; icon: SimpleIcon; style?: React.CSSProperties }
  | { kind: "image"; src: string; alt: string };

export interface ContentSection {
  id: string;
  title: string;
  icon: SectionIcon;
  entries: ContentEntry[];
  accentColor?: "primary" | "secondary" | string;
}

