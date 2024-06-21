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
  const handleSubmit = (data: { name: string; color: string }) => {
    // Handle form submission
    console.log('Form submitted:', data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car ID: {carId}</DialogTitle>
          <DialogDescription>
            <CarEditForm
              name={name}
              color={color}
              onSubmit={handleSubmit}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CarEdit;
