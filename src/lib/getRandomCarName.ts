// Define an array of car makes and their corresponding models
const carNames = [
  { make: 'BMW', models: ['X5', '3 Series', 'X3', '5 Series'] },
  { make: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Highlander'] },
  { make: 'Honda', models: ['Civic', 'Accord', 'CR-V', 'Pilot'] },
  { make: 'Ford', models: ['Mustang', 'F-150', 'Explorer', 'Escape'] },
  { make: 'Chevrolet', models: ['Silverado', 'Equinox', 'Malibu', 'Tahoe'] },
  { make: 'Nissan', models: ['Altima', 'Sentra', 'Rogue', 'Murano'] },
  { make: 'Mercedes-Benz', models: ['C-Class', 'E-Class', 'GLC', 'GLE'] },
  { make: 'Volkswagen', models: ['Golf', 'Passat', 'Tiguan', 'Jetta'] },
  { make: 'Audi', models: ['A4', 'Q5', 'A3', 'Q7'] },
  { make: 'Kia', models: ['Sorento', 'Sportage', 'Optima', 'Soul'] },
  { make: 'Volvo', models: ['S60', 'V70', 'V90', 'V60'] },
];

/**
 * The function getRandomCarName generates a random car name by selecting a random make and model from
 * a predefined list of car names.
 * @returns A random car name in the format "make model" is being returned.
 */
function getRandomCarName(): string {
  const randomCar = carNames[Math.floor(Math.random() * carNames.length)];
  const randomModel =
    randomCar.models[Math.floor(Math.random() * randomCar.models.length)];

  return `${randomCar.make} ${randomModel}`;
}

export default getRandomCarName;
