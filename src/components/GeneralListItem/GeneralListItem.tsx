const GeneralListItem = ({ item }: any) => {
  return (
    <li className="mx-8">
      <ul className="mx-auto w-full p-8 shadow-lg bg-primary rounded-lg   ">
        <li>
          <h2 className="text-3xl font-semibold">Black Tusk</h2>
        </li>
        <li>Difficulty</li>
        <li>Elevation</li>
        <li>Distance</li>
      </ul>
    </li>
  );
};

export default GeneralListItem;
