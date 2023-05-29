import { Schema, model } from "mongoose";
import { IProjectTargetUser } from "../interfaces/DTO/IProjectTargetUser";

const projectTargetUserSchema = new Schema<IProjectTargetUser>({
  userId: { type: Number, ref: "Users" },
  projectId: { type: Number, ref: "Projects" },
  type: { type: Number },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});
projectTargetUserSchema.set("toObject", { virtuals: true });
projectTargetUserSchema.set("toJSON", { virtuals: true });

projectTargetUserSchema.virtual("projects", {
  ref: "Projects",
  localField: "projectId",
  foreignField: "id_project",
});
projectTargetUserSchema.virtual("users", {
  ref: "Users",
  localField: "userId",
  foreignField: "id",
});

export const ProjectTargetUserModel = model(
  "ProjectTargetUsers",
  projectTargetUserSchema
);
