import { useContext, useEffect, useState } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import { TrailDetails } from "../../components/TrailDetails/TrailDetails";
import TrailMap from "../../components/TrailMap/TrailMap";
import MyTrailMap from "../../components/MyTrailMap/MyTrailMap";
import MyTrailDetails from "../../components/MyTrailDetails/MyTrailDetails";
import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
const MyTrailDetailsPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedMyTrailDetails, setSelectedMyTrailDetails] = useState<
    TrailAtt | undefined
  >();
  const { userTrails, selectedMyTrailName } = useContext(userContentState);
  useEffect(() => {
    if (userTrails && selectedMyTrailName) {
      const filteredTrail = Object.entries(userTrails).filter(
        ([_key, value]) => value.trail_name === selectedMyTrailName
      );
      const noKeyFilteredTrail = filteredTrail[0][1];
      console.log(noKeyFilteredTrail);
      setSelectedMyTrailDetails(noKeyFilteredTrail);
    }
  }, []);

  return (
    <main>
      {showMap && <MyTrailMap setShowMap={setShowMap} />}
      {!showMap && selectedMyTrailDetails && (
        <MyTrailDetails
          setShowMap={setShowMap}
          selectedMyTrailDetails={selectedMyTrailDetails}
        />
      )}
    </main>
  );
};

export default MyTrailDetailsPage;
