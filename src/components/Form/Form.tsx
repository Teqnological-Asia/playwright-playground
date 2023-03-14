import { FC, useState } from "react";
import axios from "axios";
import type { Country } from "./types";

const ENDPOINT = "https://restcountries.com/v3.1/name";

const Form: FC = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const findCountry = async (country: string) => {
    setCountry(null);
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.get(`${ENDPOINT}/${country}`);
      if (data.length > 0) setCountry(data[0]);
    } catch {
      setCountry(null);
      setError("Country not found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      country: { value: string };
    };
    findCountry(target.country.value);
  };

  const renderCountry = (country: Country) => {
    return (
      <div>
        <img className="mb-3" src={country.flags.png} alt={country.name.common} />
        <h1>Name: {country.name.common}</h1>
        <h1>Official name: {country.name.official}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Region: {country.region}</p>
        <p>Sub Region {country.subregion}</p>
        <p>Population: {country.population}</p>
      </div>
    );
  };

  const renderError = () => {
    return <p className="text-red text-center font-bold text-xl">{error}</p>;
  };

  const renderLoading = () => {
    return <p className="text-red text-center font-bold text-xl">Loading...</p>;
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[400px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-10 text-center text-slate-900">
            <h1 className="text-3xl font-bold tracking-widest">REST Countries</h1>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6">
            <input
              name="country"
              type="text"
              placeholder="Country's name"
              className="w-full appearance-none rounded-full border-0 bg-white/50 p-2 px-4 focus:bg-white focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
            >
              Search
            </button>
          </div>
        </form>
        <div className="py-10">
          {loading && renderLoading()}
          {error && renderError()}
          {country && renderCountry(country)}
        </div>
      </div>
    </div>
  );
};

export default Form;
