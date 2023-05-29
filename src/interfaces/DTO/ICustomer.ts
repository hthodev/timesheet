import { Document } from "mongoose";

export interface ICustomer extends Document {
  id_customer: { Number; require: true; unique: true };
  name: { String; require: true };
  code?: { String };
  address?: { String };
  isDeleted?: { Boolean };
  projectstasksId?: { Number; ref: "projectTasks" };
  deleterUserId?: { Number; ref: "users" };
  deletionTime?: { Date };
  creatorUserId?: { Number; ref: "users" };
  creationTime?: { Date };
}
