import { FC, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SAVING_ENDPOINT = "https://catfact.ninja/fact";
const ANALYTICS_ENDPOINT = "https://www.boredapi.com/api/activity";

const Interceptor: FC = () => {
  const [cardStatuses, setCardStatuses] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const images: string[] = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300",
    "https://picsum.photos/id/240/200/300",
  ];

  useEffect(() => {
    const cardStatuses = [true, false, false, false, false, false];
    setCardStatuses(cardStatuses);
  }, []);

  const handleClick = async (index: number) => {
    const newCardStatuses = [...cardStatuses];
    newCardStatuses[index + 1] = true;
    if (!cardStatuses.every((cardStatus) => cardStatus)) {
      await mockSaveData(index + 1);
      setCardStatuses(newCardStatuses);
      await mockSaveAnalytics();
    }
  };

  const notify = (msg: string) => toast(msg);

  const mockSaveData = async (index: number) => {
    try {
      await axios.get(SAVING_ENDPOINT);
      notify(`Wow so easy ${index}!`);
    } catch {
      notify("Sorry, not that easy!");
    }
  };

  const mockSaveAnalytics = async () => {
    await axios.get(ANALYTICS_ENDPOINT);
  };

  return (
    <Fragment>
      <div className="w-full flex items-center justify-center flex-col">
        <div className="w-[900px] flex mt-[15rem] gap-4 justify-between">
          {images.map((image, index) => (
            <img src={image} key={index} />
          ))}
        </div>
        <div className="w-[900px] mt-10">
          <h3 className="text-3xl font-bold text-center mb-6">This is a test for interceptors</h3>
          <div className="flex flex-wrap gap-4">
            {cardStatuses.map((cardStatus, index) => {
              return cardStatus ? (
                <Card index={index + 1} onClick={() => handleClick(index)} key={index} />
              ) : null;
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

interface CardProps {
  index: number;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ index, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className="w-[30%] block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        This is step-{index} form
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Click on this one to see the next one
      </p>
    </div>
  );
};

export default Interceptor;
