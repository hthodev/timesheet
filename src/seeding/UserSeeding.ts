import { UserModel } from "../model/users";

const admin = new UserModel({
  userName: "admin",
  password: "$2b$10$3/HMBDjJpUHrvSvB4eTHkevLmy4gWXTJeRRPO.Zhrb76gKO/9OYIm",
  name: "Admin",
  surname: "User",
  emailAddress: "admin@example.com",
  phoneNumber: "0123456789",
  address: "123 Main St, Anytown USA",
  isActive: true,
  roleNames: ["ADMIN1"],
  type: 1,
  salary: 100000,
  salaryAt: new Date(),
  startDateAt: new Date(),
  allowedLeaveDay: 20,
  userCode: "AD001",
  jobTitle: "Administrator",
  level: 1,
  registerWorkDay: "Monday - Friday",
  managerId: null,
  branchId: null,
  sex: 1,
  avatarPath: "path/to/avatar",
  morningWorking: 4,
  morningStartAt: "08:00",
  morningEndAt: "12:00",
  afternoonWorking: 4,
  afternoonStartAt: "13:00",
  afternoonEndAt: "17:00",
  isWorkingTimeDefault: true,
  isStopWork: false,
  projectId: null,
  fullName: "Admin User",
  projectUsers: [],
  branchDisplayName: null,
  managerName: null,
});

// Save the instance to the database
admin
  .save()
  .then((result) => {
    console.log("Successfully seeded the admin user:", result);
  })
  .catch((error) => {
    console.error("Failed to seed the admin user:", error);
  });
