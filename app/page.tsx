import Image from "next/image";   
import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";

export default async function Home() {
  const allCars = await fetchCars();
  
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
            <CustomFilter title="fuel"/>
            <CustomFilter title="year"/>
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
        </section>
      ) : (
        <div className="home__error-container"> 
          <h2 className="text-black text-xl font-bold">Oops, no resulrs</h2>
          <p>{allCars?.message}</p>
        </div>
      )}
    </main>
  );
}
