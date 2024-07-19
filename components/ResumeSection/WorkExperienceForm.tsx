"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { WorkArraySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect } from "react";

const defaultValues = {
  work: [
    {
      companyName: "",
      position: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorkingHere: false,
    },
  ],
};

type FormValues = typeof defaultValues;

export const WorkExperienceForm = () => {
  const workForm = useForm<FormValues>({
    resolver: zodResolver(WorkArraySchema),
    defaultValues,
  });
  const output = useWatch({
    control: workForm.control,
    name: "work",
  });

  const { fields, append, remove } = useFieldArray({
    name: "work",
    control: workForm.control,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...workForm}>
      <form
        onSubmit={workForm.handleSubmit(onSubmit)}
        className='space-y-6 flex flex-col'
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            {index > 0 ? (
              <hr className='my-3 border-[1px] border-slate-400 mx-2' />
            ) : null}
            <div
              key={field.id}
              className='flex justify-between items-center pt-3'
            >
              <div className='flex flex-col gap-3 w-[90%] pl-1'>
                <FormField
                  control={workForm.control}
                  name={`work.${index}.currentlyWorkingHere`}
                  render={({ field }) => (
                    <FormItem className='flex gap-2 items-end'>
                      <Label id={`work.${index}.currentlyWorkingHere`}>
                        Currently working here
                      </Label>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex gap-2'>
                  <FormField
                    control={workForm.control}
                    name={`work.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <Label id={`work.${index}.startDate`}>Start date</Label>
                        <FormControl>
                          <Input
                            {...workForm.register(`work.${index}.startDate`)}
                            type='text'
                            placeholder='June 2016'
                            autoComplete='start-date'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!output[index]?.["currentlyWorkingHere"] ? (
                    <FormField
                      control={workForm.control}
                      name={`work.${index}.endDate`}
                      render={({ field }) => (
                        <FormItem>
                          <Label id={`work.${index}.endDate`}>End date</Label>
                          <FormControl>
                            <Input
                              {...workForm.register(`work.${index}.endDate`)}
                              type='text'
                              placeholder='June 2019'
                              autoComplete='end-date'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}
                </div>
                <FormField
                  control={workForm.control}
                  name={`work.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`work.${index}.companyName`}>Company</Label>
                      <FormControl>
                        <Input
                          {...workForm.register(`work.${index}.companyName`)}
                          type='text'
                          placeholder='Bank of ABC'
                          autoComplete='company-name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={workForm.control}
                  name={`work.${index}.position`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`work.${index}.position`}>Position</Label>
                      <FormControl>
                        <Input
                          {...workForm.register(`work.${index}.position`)}
                          type='text'
                          placeholder='June 2020'
                          autoComplete='position'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={workForm.control}
                  name={`work.${index}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`work.${index}.city`}>City</Label>
                      <FormControl>
                        <Input
                          {...workForm.register(`work.${index}.city`)}
                          type='text'
                          placeholder='New York'
                          autoComplete='city'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={workForm.control}
                  name={`work.${index}.country`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`work.${index}.country`}>Country</Label>
                      <FormControl>
                        <Input
                          {...workForm.register(`work.${index}.country`)}
                          type='text'
                          placeholder='United States'
                          autoComplete='country'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={workForm.control}
                  name={`work.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`work.${index}.description`}>
                        Description
                      </Label>
                      <FormControl>
                        <Textarea
                          {...workForm.register(`work.${index}.description`)}
                          placeholder=''
                          autoComplete='description'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-1 justify-center'>
                <Button
                  variant='ghost'
                  className='rounded-full h-25 w-25'
                  onClick={() => remove(index)}
                >
                  <RiDeleteBin6Line size={25} color={"#f05252"} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          className='w-[10%]'
          type='button'
          onClick={() => append(defaultValues.work[0])}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};
