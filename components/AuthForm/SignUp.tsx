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
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { SocialLoginButton } from "../Button/SocialLoginButton";
import { SocialMediaList } from "@/lib/constants";
import { signup } from "@/actions/signup";
import { useUserStore } from "@/store/store";
import { FormError } from "../ui/form-error";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const { data } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { updateEmail, updateIsLoggedIn } = useUserStore();

  useEffect(() => {
    if (data && data.user) {
      const { email } = data.user;
      updateEmail(email || "");
      updateIsLoggedIn(true);
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signup(values).then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          updateEmail(values.email);
          updateIsLoggedIn(true);
          setError(undefined);
          router.push('/dashboard')
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel=''
      footerLabel={
        <div className='flex flex-col gap-2'>
          <p className='text-md'>
            Already have an account ? Login{" "}
            <Link
              className='text-blue-800 font-semibold underline'
              href='/auth/login'
            >
              here
            </Link>
          </p>
        </div>
      }
    >
      <ul className='flex flex-col gap-3 mb-4'>
        {SocialMediaList.map((provider) => (
          <SocialLoginButton
            provider={provider}
            action={"signup"}
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
                  <Button
                    size='sm'
                    variant='link'
                    asChild
                    className='px-0 font-normal'
                  ></Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error ? <FormError message={error} /> : null}
          <Button type='submit' className='w-full text-xl' disabled={isPending}>
            Sign up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
