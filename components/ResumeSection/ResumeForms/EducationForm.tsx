"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { EducationArraySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUserStore } from "@/store/store";
import { useEffect } from 'react';

const defaultValues = {
  educations: [
    {
      institution: "",
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
  const { selectedResume, isUploadWithAI } = useUserStore();
  const initialValues = selectedResume && selectedResume.education 
  ? {
      educations: selectedResume.education.map((education) => ({
        ...education,
        description: isUploadWithAI ? education.enhancedDescription : education.description,
        currentlyStudyingHere: education.currentlyStudyingHere === "True",
    }))
  } : defaultValues;
  const educationForm = useForm<FormValues>({
    resolver: zodResolver(EducationArraySchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (selectedResume && selectedResume.education) {
      educationForm.reset({
        educations: selectedResume.education.map((education) => ({
          ...education,
          description: isUploadWithAI ? education.enhancedDescription : education.description,
          currentlyStudyingHere: education.currentlyStudyingHere === "True",
        }))
      });
    }
  }, [selectedResume, educationForm]);

  const { fields, append, remove } = useFieldArray({
    name: "educations",
    control: educationForm.control,
  });

  const output = useWatch({
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
          <div key={field.id}>
            {index > 0 ? (
              <hr className='my-3 border-[1px] border-slate-400 mx-2' />
            ) : null}
            <div key={field.id} className='flex justify-between items-center'>
              <div className='flex flex-col gap-3 w-[90%] pl-1'>
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
                  {!output[index]?.["currentlyStudyingHere"] ? (
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
                  ) : null}
                </div>
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.institution`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label id={`educations.${index}.institution`}>
                        Institution
                      </Label>
                      <FormControl>
                        <Input
                          {...educationForm.register(
                            `educations.${index}.institution`
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
                    <FormItem className="w-full">
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
                <div className='flex gap-2'>
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
                  
                </div>
                <FormField
                  control={educationForm.control}
                  name={`educations.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label id={`educations.${index}.description`}>
                        Description
                      </Label>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          placeholder=''
                          {...field}
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
          onClick={() => append(defaultValues.educations[0])}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};
