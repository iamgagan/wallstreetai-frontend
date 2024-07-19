"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { QualificationsArraySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";

const defaultValues = {
  qualifications: [
    {
      qualification: "",
      awardedDate: "",
      institution: "",
    },
  ],
};

type FormValues = typeof defaultValues;

export const QualificationForm = () => {
  const qualificationForm = useForm<FormValues>({
    resolver: zodResolver(QualificationsArraySchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "qualifications",
    control: qualificationForm.control,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <Form {...qualificationForm}>
      <form
        onSubmit={qualificationForm.handleSubmit(onSubmit)}
        className='space-y-6 flex flex-col'
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            {index > 0 ? (
              <hr className='my-3 border-[1px] border-slate-400 mx-2' />
            ) : null}
            <div key={field.id} className='flex justify-between items-center'>
              <div className='flex flex-col gap-2 w-[90%] pl-1'>
                <FormField
                  control={qualificationForm.control}
                  name={`qualifications.${index}.qualification`}
                  render={({ field }) => (
                    <FormItem className='sm:w-[80vw] lg:w-[45vw]'>
                      <Label id={`qualifications.${index}.qualification`}>
                        Qualification
                      </Label>
                      <FormControl>
                        <Input
                          {...qualificationForm.register(
                            `qualifications.${index}.qualification`
                          )}
                          type='text'
                          placeholder='CFA'
                          autoComplete='qualification'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={qualificationForm.control}
                  name={`qualifications.${index}.awardedDate`}
                  render={({ field }) => (
                    <FormItem className='sm:w-[80vw] lg:w-[45vw]'>
                      <Label id={`qualifications.${index}.awardedDate`}>
                        Date
                      </Label>
                      <FormControl>
                        <Input
                          {...qualificationForm.register(
                            `qualifications.${index}.awardedDate`
                          )}
                          type='text'
                          placeholder='June 2020'
                          autoComplete='awardedDate'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={qualificationForm.control}
                  name={`qualifications.${index}.institution`}
                  render={({ field }) => (
                    <FormItem className='sm:w-[80vw] lg:w-[45vw]'>
                      <Label id={`qualifications.${index}.institution`}>
                        Awarding Institution
                      </Label>
                      <FormControl>
                        <Input
                          {...qualificationForm.register(
                            `qualifications.${index}.institution`
                          )}
                          type='text'
                          placeholder='CFA Institute'
                          autoComplete='institution-name'
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
          onClick={() => append(defaultValues.qualifications[0])}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};
