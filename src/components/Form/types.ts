export type Country = {
  capital: [string];
  cca2: string;
  cca3: string;
  cioc: string;
  fifa: string;
  flag: string;
  flags: {
    alt: string;
    svg: string;
    png: string;
  };
  region: string;
  subregion: string;
  name: {
    common: string;
    official: string;
  };
  population: number;
};
