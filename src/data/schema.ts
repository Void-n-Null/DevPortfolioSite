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
  imageGallery?: {
    images: {
      src: string;
      alt: string;
      caption?: string;
    }[];
    columns?: 1 | 2 | 3;
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

export interface TechItem {
  name: string;
  icon?: SectionIcon;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  sections: {
    id: string;
    title: string;
    content: string;
    image?: {
      src: string;
      alt: string;
      caption?: string;
    };
    gallery?: {
      src: string;
      alt: string;
      caption?: string;
    }[];
  }[];
}

