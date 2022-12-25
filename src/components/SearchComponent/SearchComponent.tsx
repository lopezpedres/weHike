import React from "react";
import { InterfacePropertiesFeature } from "../GeneralList/typesGeneralList";
import search from "/assets/icons/search.svg";
interface Props {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}
const SearchComponent = ({ setSearchInput }: Props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };
  return (
    <section className="sticky mt-1 mx-4 top-0">
      <article className="bg-white pt-12">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img className="w-6" src={search} />
          </div>
          <input
            onChange={(e) => onChangeHandler(e)}
            type="text"
            id="input-group-1"
            className="border text-sm rounded-lg block w-full pl-10 p-2.5 placeholder-gray-400  "
            placeholder="Eagle Blobs, Black Tusk, etc..."
          />
        </div>
      </article>
    </section>
  );
};

export default SearchComponent;
