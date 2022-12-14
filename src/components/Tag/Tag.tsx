const Tag = ({ tagName }: { tagName: string }) => {
  const conditionals = () => {
    console.log("enter");
    if (tagName === "done") return ["tag-light-green", "tag-dark-green"];
    if (tagName === "planning") return ["tag-light-orange", "tag-dark-orange"];
    if (tagName === "custom") return ["tag-light-blue", "tag-dark-blue"];
    if (tagName === "fav") return ["tag-light-yellow", "tag-dark-yellow"];
    else {
      return [["#f3f4f6", "#4b5563"]];
    }
  };
  //   bg-[${conditionals()[0]}]
  // text-[${conditionals()[1]}]
  // bg-[#ffedd5]
  // text-[#ea580c]
  return (
    <>
      {tagName === "planning" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-orange
      text-tag-dark-orange
      rounded-full`}
        >
          {tagName}
        </div>
      )}
      {tagName === "done" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-green
      text-tag-dark-green
      rounded-full`}
        >
          {tagName}
        </div>
      )}
      {tagName === "custom" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-blue
      text-tag-dark-blue
      rounded-full`}
        >
          {tagName}
        </div>
      )}
      {tagName === "fav" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-yellow
      text-tag-dark-yellow
      rounded-full`}
        >
          {tagName}
        </div>
      )}
    </>
  );
};

export default Tag;
