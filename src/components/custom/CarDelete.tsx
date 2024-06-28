'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import BodyText from '@/components/custom/BodyText';

import { deleteCar } from '@/lib/api/garage';
import { deleteWinner } from '@/lib/api/winners';
import TrashIcon from '@/components/custom/TrashIcon';
import CarDeleteProps from '@/types/CarDeleteProps';

function CarDelete({ carId, name }: CarDeleteProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <TrashIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car ID: {carId}</DialogTitle>
          <DialogDescription className="flex flex-col items-center justify-center gap-4">
            <BodyText
              size="medium"
              center
            >
              Are you sure you want to delete {name}? <br />
              The car will be deleted from the garage and the winner will be
              deleted from the winners list.
            </BodyText>
            <Button
              variant="destructive"
              onClick={() => {
                deleteCar(carId);
                deleteWinner(carId);
              }}
            >
              Delete {name}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CarDelete;
