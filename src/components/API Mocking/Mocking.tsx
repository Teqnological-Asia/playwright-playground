import { FC, useState } from "react";
import { API } from "@/components/API Mocking/components";

interface IAPI {
  title: string;
  endpoint: string;
  keyword: string;
  finish: boolean;
}

const Mocking: FC = () => {
  const [APIs, setAPIs] = useState<IAPI[]>([
    {
      title: "Search by language",
      endpoint: "https://restcountries.com/v3.1/lang/",
      keyword: "german",
      finish: false,
    },
    {
      title: "Search by capital",
      endpoint: "https://restcountries.com/v3.1/capital/",
      keyword: "berlin",
      finish: false,
    },
    {
      title: "Search by currency",
      endpoint: "https://restcountries.com/v3.1/currency/",
      keyword: "dollar",
      finish: false,
    },
  ]);

  const handleFinish = (index: number) => {
    const newAPIs = [...APIs];
    newAPIs[index].finish = true;
    setAPIs(newAPIs);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[900px]">
        <div className="w-full flex justify-between">
          {APIs.map((api, index) => (
            <API
              key={index}
              title={api.title}
              endpoint={api.endpoint}
              keyword={api.keyword}
              shouldCallAPI={index === 0 || APIs[index - 1].finish}
              finish={api.finish}
              onFinish={() => handleFinish(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mocking;
