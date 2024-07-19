"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { EducationArraySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";

const defaultValues = {
  educations: [
    {
      institutionName: "",
      degree: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyStudyingHere: false,
    },
  ],
};

type FormValues = typeof defaultValues;

export const EducationForm = () => {
  const educationForm = useForm<FormValues>({
    resolver: zodResolver(EducationArraySchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "educations",
    control: educationForm.control,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <Form {...educationForm}>
      <form
        onSubmit={educationForm.handleSubmit(onSubmit)}
        className='space-y-8 flex flex-col'
      >
        {fields.map((field, index) => (
          <>
            {index > 0 ? (
              <hr className='my-3 border-[1px] border-slate-400 mx-2' />
            ) : null}
            <div key={field.id} className='flex justify-between items-center'>
              <div className='flex flex-col gap-2 w-[90%] pl-1'>
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.institutionName`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`educations.${index}.institutionName`}>
                        Institution
                      </Label>
                      <FormControl>
                        <Input
                          {...educationForm.register(
                            `educations.${index}.institutionName`
                          )}
                          type='text'
                          placeholder='University of ABC'
                          autoComplete='institution-name'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`educations.${index}.degree`}>Degree</Label>
                      <FormControl>
                        <Input
                          {...educationForm.register(
                            `educations.${index}.degree`
                          )}
                          type='text'
                          placeholder='June 2020'
                          autoComplete='degree'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`educations.${index}.city`}>City</Label>
                      <FormControl>
                        <Input
                          {...educationForm.register(
                            `educations.${index}.city`
                          )}
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
                  control={educationForm.control}
                  name={`educations.${index}.country`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`educations.${index}.country`}>Country</Label>
                      <FormControl>
                        <Input
                          {...educationForm.register(
                            `educations.${index}.country`
                          )}
                          type='text'
                          placeholder='United States'
                          autoComplete='country'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex gap-2'>
                  <FormField
                    control={educationForm.control}
                    name={`educations.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <Label id={`educations.${index}.startDate`}>
                          Start date
                        </Label>
                        <FormControl>
                          <Input
                            {...educationForm.register(
                              `educations.${index}.startDate`
                            )}
                            type='text'
                            placeholder='June 2016'
                            autoComplete='start-date'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={educationForm.control}
                    name={`educations.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <Label id={`educations.${index}.endDate`}>
                          End date
                        </Label>
                        <FormControl>
                          <Input
                            {...educationForm.register(
                              `educations.${index}.endDate`
                            )}
                            type='text'
                            placeholder='June 2019'
                            autoComplete='end-date'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <Label id={`educations.${index}.description`}>
                        Description
                      </Label>
                      <FormControl>
                        <Textarea
                          {...educationForm.register(
                            `educations.${index}.description`
                          )}
                          placeholder=''
                          autoComplete='description'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.currentlyStudyingHere`}
                  render={({ field }) => (
                    <FormItem className='flex gap-2 items-end'>
                      <Label id={`educations.${index}.currentlyStudyingHere`}>
                        Currently studying here
                      </Label>
                      <FormControl>
                        <Checkbox
                          {...educationForm.register(
                            `educations.${index}.currentlyStudyingHere`
                          )}
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
          </>
        ))}
        <Button
          className='w-[10%]'
          type='button'
          onClick={() => append(defaultValues.educations[0])}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};
