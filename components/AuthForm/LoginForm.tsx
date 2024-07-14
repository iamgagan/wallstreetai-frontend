"use client";
import { CardWrapper } from "@/components/CardWrapper/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schemas/index";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import Link from "next/link";
import { SocialLoginButton } from "../Button/SocialLoginButton";
import { SocialMediaList } from "@/lib/constants";
import { FormError } from "../ui/form-error";
import { useUserStore } from "@/store/store";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const { updateEmail, updateIsLoggedIn } = useUserStore();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          updateEmail(values.email);
          updateIsLoggedIn(true);
          setError(undefined);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel=''
      footerLabel={
        <p className='text-md'>
          Don&apos;t have an account ? Sign up{" "}
          <Link
            className='underline text-blue-800 font-semibold'
            href='/auth/signup'
          >
            here
          </Link>
        </p>
      }
    >
      <ul className='flex flex-col gap-3 mb-4'>
        {SocialMediaList.map((provider) => (
          <SocialLoginButton
            provider={provider}
            action='login'
            key={provider}
          />
        ))}
      </ul>
      <div className='text-center pb-2'>
        <p>or</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='email'
                      autoComplete='email'
                      disabled={isPending}
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
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='password'
                      autoComplete='password'
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size='sm'
              variant='link'
              asChild
              className='px-0 font-normal'
            >
              <Link className='text-lg' href=''>
                Forgot password?
              </Link>
            </Button>
          </div>
          {error ? <FormError message={error} /> : null}
          <Button type='submit' className='w-full text-xl' disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
