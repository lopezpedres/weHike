import React from "react";
import getBboxPathNames from "../../utils/getBboxPathNames";
interface PropsInterface {
  setCurrentBboxPathNames: React.Dispatch<
    React.SetStateAction<string[] | null | undefined>
  >;
  currentBbox: bboxInterface | null;
}
interface bboxInterface {
  south: number;
  west: number;
  north: number;
  east: number;
}
const Options = ({ currentBbox, setCurrentBboxPathNames }: PropsInterface) => {
  const clickHandler = async () => {
    const pathNames = await getBboxPathNames(currentBbox);
    console.log(pathNames);
    setCurrentBboxPathNames(pathNames as any);
  };
  return <button onClick={clickHandler}>Get Path Names </button>;
};

export default Options;
