import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import BodyText from '@/components/custom/BodyText';

import EditIcon from '@/components/custom/EditIcon';

interface CarEditProps {
  carId: number;
  name: string;
}

function CarEdit({ carId, name }: CarEditProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <EditIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Car ID: {carId}</DialogTitle>
          <DialogDescription>
            <BodyText size="medium">{name}</BodyText>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CarEdit;
