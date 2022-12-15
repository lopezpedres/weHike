const Tag = ({ tagName }: { tagName: string }) => {
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
