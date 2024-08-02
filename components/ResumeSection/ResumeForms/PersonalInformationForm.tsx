'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { useForm } from 'react-hook-form';
import { ProfileSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Label } from '../../ui/label';
import { useUserStore } from '@/store/store';
import { useEffect } from 'react';

const defaultValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  postalCode: '',
};

export const PersonalInformationForm = () => {
  const { selectedResume } = useUserStore();
  const profileForm = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (selectedResume && selectedResume.personalInfo) {
      profileForm.reset(selectedResume.personalInfo);
    }
  }, [profileForm.reset]);

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    console.log(values);
  };
  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        <div className="gap-4 flex">
          <FormField
            control={profileForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <Label id="firstName">First name</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Adam"
                    autoComplete="first-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={profileForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <Label id="lastName">Last name</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Smith"
                    autoComplete="last-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="gap-4 flex">
          <FormField
            control={profileForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <Label id="phoneNumber">Phone number</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="+1 123 456 7890"
                    autoComplete="phone-number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={profileForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label id="email">Email address</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="abc@abc.com"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Address</Label>
          <div className="gap-4 flex">
            <FormField
              control={profileForm.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <Label id="addressLine1" className="text-xs">
                    Address Line 1
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="123 Main St"
                      autoComplete="address-line1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <Label id="addressLine1" className="text-xs">
                    Address Line 2
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Apt 123"
                      autoComplete="address-line2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="gap-4 flex">
            <FormField
              control={profileForm.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <Label id="postalCode" className="text-xs">
                    Postal
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="11111"
                      autoComplete="postal-code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Label id="country" className="text-xs">
                    Country
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="United States"
                      autoComplete="country"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
