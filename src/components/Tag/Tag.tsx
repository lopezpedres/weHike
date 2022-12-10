const Tag = ({ tagName }: { tagName: string }) => {
  const conditionals = () => {
    if (tagName === "planning") return ["#fef9c3", "#ca8a04"];
    if (tagName === "done") return ["#dcfce7", "#16a34a"];
    if (tagName === "custom") return ["#cffafe", "#0891b2"];
    if (tagName === "fav") return ["#ffedd5", "#ea580c"];
    else {
      return (
        "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0")
      );
    }
  };
  //   bg-[${conditionals()[0]}]
  // text-[${conditionals()[1]}]
  // bg-[#ffedd5]
  // text-[#ea580c]
  return (
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
      bg-[${conditionals()[0]}]
      text-[${conditionals()[1]}]
      rounded-full`}
    >
      {tagName}
    </div>
  );
};

export default Tag;
