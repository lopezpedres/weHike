import { ImagesTrail } from "../MyTrailMap/typesMyTrailMap";

interface Props {
  trailImages: ImagesTrail;
}
const ImagesCollection = ({ trailImages }: Props) => {
  return (
    <section className="p-7">
      <h5 className="text-xl font-semibold pb-4">Media</h5>
      <ul className="grid grid-cols-3 gap-2">
        {Object.entries(trailImages)
          //Need to sort this by uploading date
          .sort()
          .map(([key, value]) => (
            <li key={key}>
              <img
                className="object-cover w-full h-full"
                src={value.image_url}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ImagesCollection;
