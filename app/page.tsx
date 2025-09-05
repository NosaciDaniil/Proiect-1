import Image from "next/image";   
import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import ShowMore from "@/components/ShowMore";

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: (searchParams.manufacturer as string) || '', 
    year: Number(searchParams.year) || 0, 
    fuel: (searchParams.fuel as string) || '', 
    limit: Number(searchParams.limit) || 10, 
    model: (searchParams.model as string) || '', 
  });
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  
  console.log(allCars);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 px-4 py-6 max-w-[1440px]" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className="home_cars-wrapper">
            {allCars?.map((car, index) => (
              <CarCard key={car.id ?? index} car={car} />
            ))}
          </div>

          <ShowMore
            pageNumber={(Number(searchParams.limit) || 10) / 10}
            isNext={(Number(searchParams.limit) || 10) > allCars.length}
          />

        </section>
      ) : (
        <div className="home__error-container"> 
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>Try adjusting your filters or clearing the model.</p>
        </div>
      )}
    </main>
  );
}
