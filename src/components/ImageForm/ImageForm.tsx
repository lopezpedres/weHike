import exif from "exifr";
const ImageForm = () => {
  const formHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const exifData = await exif.parse(file);
      console.log("exifData", exifData);
    }

    // const fsFile = fs.
  };
  return (
    <form>
      <input onChange={(e) => formHandler(e)} type="file" name="picture" />
    </form>
  );
};

export default ImageForm;
