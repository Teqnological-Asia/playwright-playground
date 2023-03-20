import { FC, useState, useEffect } from "react";
import axios from "axios";
import type { Country } from "../../Form/types";

interface Props {
  title: string;
  shouldCallAPI?: boolean;
  endpoint: string;
  keyword: string;
  finish: boolean;
  onFinish?: () => void;
}

const API: FC<Props> = ({ title, shouldCallAPI = false, endpoint, keyword, finish, onFinish }) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const TIMEOUT = 1500;

  useEffect(() => {
    shouldCallAPI && pleaseFindAThing(endpoint, keyword);
  }, [shouldCallAPI]);

  const renderCountries = (countries: Country[]) => {
    return countries.map((country, index) => (
      <div key={index}>
        <img className="mb-3" src={country.flags.png} alt={country.name.common} />
        <h1>Name: {country.name.common}</h1>
        <h1>Official name: {country.name.official}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Region: {country.region}</p>
        <p>Sub Region: {country.subregion}</p>
        <p>Population: {country.population}</p>
      </div>
    ));
  };

  const renderError = () => {
    return <p className="text-red text-center font-bold text-xl">{error}</p>;
  };

  const renderLoading = () => {
    return <p className="text-red text-center font-bold text-xl">Loading....</p>;
  };

  const renderWaiting = () => {
    return <p className="text-red text-center font-bold text-xl">I am waiting....</p>;
  };

  const pleaseFindAThing = async (endpoint: string, keyword: string) => {
    try {
      const { data } = await axios.get(`${endpoint}${keyword}`);
      if (data.length > 0) setCountries(data);
    } catch (error) {
      setCountries(null);
      setError("Countries not found");
    } finally {
      setLoading(false);
      setTimeout(() => {
        onFinish && onFinish();
      }, TIMEOUT);
    }
  };

  return (
    <div className="w-[30%]">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-xl">Keyword: {keyword}</p>
      <div className="py-10 h-[40rem] pr-6 overflow-y-scroll">
        {!finish && renderWaiting()}
        {loading && renderLoading()}
        {error && renderError()}
        {countries && renderCountries(countries)}
      </div>
    </div>
  );
};

export default API;
