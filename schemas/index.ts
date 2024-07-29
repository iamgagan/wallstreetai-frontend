import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Please enter a valid email",
    })
    .optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
});

export const WorkSchema = z.object({
  company: z.string().optional(),
  position: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  currentlyWorkingHere: z.boolean().optional(),
});

export const EducationSchema = z.object({
  institution: z.string().optional(),
  degree: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  currentlyStudyingHere: z.boolean().optional(),
});

export const QualificationSchema = z.object({
  qualification: z.string().optional(),
  awardedDate: z.string().optional(),
  institution: z.string().optional(),
});

export const SkillsSchema = z.array(z.string().optional());

export const EducationArraySchema = z.array(EducationSchema);
export const SkillsArraySchema = z.array(SkillsSchema);
export const QualificationsArraySchema = z.array(QualificationSchema);
export const WorkArraySchema = z.array(WorkSchema);

export const LinkedInURLSchema = z.object({
  linkedInURL: z.string().min(1, {
    message: "Please enter a valid LinkedIn username",
  }),
});