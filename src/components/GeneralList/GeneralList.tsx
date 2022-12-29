import GeneralListItem from "../GeneralListItem/GeneralListItem";
import { InterfacePropertiesFeature } from "./typesGeneralList";
import loadingGift from "/assets/images/loading.gif";
interface Props {
  features: InterfacePropertiesFeature[];
}
const GeneralList = ({ features }: Props) => {
  return (
    <ul className="w-full mt-2 mb-40">
      {features ? (
        features.map((item) => (
          <GeneralListItem
            key={item?.id}
            trail_center={item?.trail_center}
            id={item?.id}
            name={item?.name}
            sac_scale={item?.sac_scale}
            elevation_gain={item?.elevation_gain}
            max_elevation={item?.max_elevation}
            distance={item?.distance}
          />
        ))
      ) : (
        <div className="absolute top-1/2 -translate-y-1/2">
          <img alt="loading" src={loadingGift} />
        </div>
      )}
    </ul>
  );
};

export default GeneralList;
