import getRandomCarName from '@/lib/getRandomCarName';
import getRandomCarColor from '@/lib/getRandomCarColor';
import { createCar } from '@/lib/api/garage';
import { Button } from '@/components/ui/button';

const NUMBER_OF_CARS_TO_BE_GENERATED_AT_ONCE = 10;

/**
 * The function `GenerateCars` generates a specified number of cars with random names and colors when a
 * button is clicked.
 * @returns The `GenerateCars` function returns JSX code that represents a button to generate a
 * specified number of cars at once when clicked. The button is styled with Tailwind CSS classes for
 * layout and appearance. The `handleGenerateCars` function is an asynchronous function that generates
 * cars by calling `createCar` function with random names and colors.
 */
function GenerateCars() {
  const handleGenerateCars = async () => {
    const carPromises = [];
    for (let i = 0; i < NUMBER_OF_CARS_TO_BE_GENERATED_AT_ONCE; i += 1) {
      const name = getRandomCarName();
      const color = getRandomCarColor();
      carPromises.push(createCar(name, color));
    }
    await Promise.all(carPromises);
  };

  return (
    <Button
      variant="outline"
      onClick={handleGenerateCars}
    >
      Generate {NUMBER_OF_CARS_TO_BE_GENERATED_AT_ONCE} Cars
    </Button>
  );
}

export default GenerateCars;
