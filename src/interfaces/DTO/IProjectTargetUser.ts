export interface IProjectTargetUser extends Document {
  userId?: Number;
  projectId?: Number;
  type?: Number;
  creationTime: Date;
}
