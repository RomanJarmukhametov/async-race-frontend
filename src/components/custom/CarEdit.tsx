'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import EditIcon from '@/components/custom/EditIcon';
import CarEditProps from '@/types/CarEditProps';
import CarEditForm from '@/components/custom/CarEditForm';

function CarEdit({ carId, name, color }: CarEditProps) {
  const handleSubmit = () => {};

  /* The code snippet `const [isDialogOpen, setIsDialogOpen] = useState(false);` is using the `useState`
 hook from React to manage the state of a dialog in a functional component. */
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car ID: {carId}</DialogTitle>
          <DialogDescription>
            <CarEditForm
              id={carId}
              name={name}
              color={color}
              onSubmit={handleSubmit}
              onClose={closeDialog}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CarEdit;
