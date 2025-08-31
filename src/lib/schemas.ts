import { z } from "zod";

export const loginFormSchema = z.object({
	password: z.string().min(5),
	email: z.email(),
});

export const signupFormSchema = z.object({
	password: z.string().min(5),
	email: z.email(),
	name: z.string().min(5),
});
