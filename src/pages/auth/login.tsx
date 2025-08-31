"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { UserIcon } from "lucide-react";
import { Link } from "react-router";
import { loginFormSchema } from "@/lib/schemas";
import { loginAction } from "../actions/auth";

const formSchema = loginFormSchema;

export default function LoginPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values);
			const login = await loginAction(values);
			console.log("login:", login);
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to login. Please try again.");
		}
	}

	return (
		<div className='flex flex-col min-h-[50vh] h-screen w-full items-center justify-center px-4'>
			<Card className='w-full mx-auto max-w-md'>
				<CardHeader>
					<div className='text-center mb-8'>
						<div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4'>
							<UserIcon className='w-8 h-8 text-secondary' />
						</div>
						<h1 className='text-2xl font-bold text-gray-900'>Welcome Back</h1>
						<p className='text-gray-600 mt-2'>Sign in to play Tic-Tac-Toe</p>
					</div>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<div className='grid gap-4'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem className='grid gap-2'>
											<FormLabel htmlFor='email'>Email</FormLabel>
											<FormControl className='h-14'>
												<Input
													id='email'
													placeholder='johndoe@mail.com'
													type='email'
													autoComplete='email'
													className='w-full px-4 py-3 rounded-lg'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem className='grid gap-2'>
											<div className='flex justify-between items-center'>
												<FormLabel htmlFor='password'>Password</FormLabel>
											</div>
											<FormControl className='h-14'>
												<PasswordInput
													id='password'
													placeholder='******'
													autoComplete='current-password'
													className='w-full px-4 py-3 rounded-lg'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type='submit' className='w-full h-14 cursor-pointer'>
									Login
								</Button>
							</div>
						</form>
					</Form>
					<div className='mt-4 text-center text-sm'>
						Don&apos;t have an account?
						<Link to='/sign-up'>
							<Button variant={"link"} className='cursor-pointer'>
								Sign up
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
