import React from "react";
import search from "/assets/icons/search.svg";

const SearchComponent = () => {
  return (
    <section className="sticky mt-1 mx-4 top-0">
      <article className="bg-white pt-12">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <img className="w-6" src={search} />
          </div>
          <input
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
