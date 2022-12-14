import { useContext, useState } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import { TrailDetails } from "../../components/TrailDetails/TrailDetails";
import TrailMap from "../../components/TrailMap/TrailMap";
const TrailDetailsPage = () => {
  const [showMap, setShowMap] = useState(false);
  const { selectedtrailDetails } = useContext(userContentState);

  return (
    <main>
      {showMap ? (
        <TrailMap setShowMap={setShowMap} />
      ) : (
        <TrailDetails
          setShowMap={setShowMap}
          selectedtrailDetails={selectedtrailDetails}
        />
      )}
    </main>
  );
};

export default TrailDetailsPage;
