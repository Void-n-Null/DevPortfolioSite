import { imagineAppCaseStudy } from "./imagine-app";
import { godotGoapCaseStudy } from "./godot-goap";
import { rebangCaseStudy } from "./rebang";
import { ProjectCaseStudy } from "../schema";

export const projectCaseStudies: Record<string, ProjectCaseStudy> = {
  "imagine-app": imagineAppCaseStudy,
  "godot-goap": godotGoapCaseStudy,
  "rebang": rebangCaseStudy,
};

