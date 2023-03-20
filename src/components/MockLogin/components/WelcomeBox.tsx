import { FC } from "react";

interface Props {
  name: string;
  age: number;
  dob: string;
}

const WelcomeBox: FC<Props> = ({ name, age, dob }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <h4 className="text-lg">
            Herzlich Willkommen, <span className="font-bold">{name}</span>!
          </h4>
          <h5 className="text-sm">Ihre Informationen kommen von einem Mock-Server.</h5>
          <p>
            <span className="font-bold">Name:</span> {name}
          </p>
          <p>
            <span className="font-bold">Alter:</span> {age}
          </p>
          <p>
            <span className="font-bold">Geburtsdatum:</span> {dob}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
