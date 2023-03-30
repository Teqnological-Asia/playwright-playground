import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import HorizontalImageCard from "../ImageCard/HorinzontalImageCard";

const Components: FC = () => {
  return (
    <div className="h-screen flex justify-center items-center gap-10">
      <ImageCard />
      <HorizontalImageCard />
    </div>
  );
};

export default Components;
