import { CarProps, FilterProps } from "@/types";
export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, fuel, limit, model } = filters;
    const headers = {
      'x-rapidapi-key': '15022df4d6msh749fda45bc883cap17bbd9jsn19b75a60301a',
      'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com',
    };

    const params = new URLSearchParams();
    if (manufacturer) params.append('make', manufacturer.toLowerCase());
    if (model) params.append('model', model.toLowerCase());
    if (year && year > 0) params.append('year', String(year));
    if (limit) params.append('limit', String(limit));
    if (fuel) params.append('fuel_type', fuel.toLowerCase());

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars${params.toString() ? `?${params.toString()}` : ''}`;

    try {
      const response = await fetch(url, { headers, cache: 'no-store' });
      if (!response.ok) {
        throw new Error(String(response.status));
      }
      const result = await response.json();
      if (Array.isArray(result) && result.length > 0) return result;
    } catch (e) {
      // ignore and fall back below
    }
    // Fallback demo data so page shows initial cards
    const sample: CarProps[] = [
      {
        city_mpg: 24,
        class: "compact car",
        combination_mpg: 26,
        cylinders: 4,
        displacement: 2,
        drive: "fwd",
        fuel_type: "gas",
        highway_mpg: 32,
        make: manufacturer || "Toyota",
        model: model || "Corolla",
        transmission: "a",
        year: year && year > 0 ? year : 2020,
      },
      {
        city_mpg: 28,
        class: "midsize car",
        combination_mpg: 30,
        cylinders: 4,
        displacement: 2.5,
        drive: "fwd",
        fuel_type: "gas",
        highway_mpg: 38,
        make: manufacturer || "Honda",
        model: model || "Civic",
        transmission: "m",
        year: year && year > 0 ? year : 2019,
      },
    ];
    return typeof limit === 'number' && limit > 0 ? sample.slice(0, Math.min(limit, sample.length)) : sample;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  
  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathname;
}