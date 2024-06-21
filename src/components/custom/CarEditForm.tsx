import React from 'react';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { updateCar } from '@/lib/api/garage';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  color: z.string(),
});

interface CarEditFormProps {
  id: number;
  name: string;
  color: string;
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  onClose: () => void;
}

function CarForm({ id, name, color, onSubmit, onClose }: CarEditFormProps) {
  const router = useRouter();

  // Add closing the dialog and refreshing the /garage page on submit
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    await updateCar(id, data.name, data.color);
    onSubmit(data);
    onClose();
    router.refresh();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name,
      color,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter car name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Color</FormLabel>
              <FormControl>
                <Input
                  type="color"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default CarForm;
