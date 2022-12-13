const toSlug = (name: string | undefined) => {
  return (
    name &&
    name
      .toLocaleLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .trim()
  );
};
export default toSlug;
