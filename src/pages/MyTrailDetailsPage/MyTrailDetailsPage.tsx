import { useContext, useEffect, useState } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import { TrailDetails } from "../../components/TrailDetails/TrailDetails";
import TrailMap from "../../components/TrailMap/TrailMap";
import MyTrailMap from "../../components/MyTrailMap/MyTrailMap";
import MyTrailDetails from "../../components/MyTrailDetails/MyTrailDetails";
import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
import { doc, onSnapshot } from "firebase/firestore";
import { ImagesTrail } from "../../components/MyTrailMap/typesMyTrailMap";
import { db } from "../../firebase/firebaseConfig";

const defaultImagesValue = {} as ImagesTrail;

const MyTrailDetailsPage = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedMyTrailDetails, setSelectedMyTrailDetails] = useState<
    TrailAtt | undefined
  >();
  const [trailImages, setTrailImages] =
    useState<ImagesTrail>(defaultImagesValue);
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

    if (selectedMyTrailDetails) {
      const trailImagesRef = doc(
        db,
        "images-trail",
        `${selectedMyTrailDetails.images_id}`
      );
      console.log(selectedMyTrailDetails.images_id);
      try {
        const unsub = onSnapshot(trailImagesRef, (querySnapshot) => {
          const snap = querySnapshot.data();
          if (snap) {
            setTrailImages(snap as ImagesTrail);
          }
        });
        return unsub;
      } catch (error) {
        console.error(error);
      }
    }
  }, [selectedMyTrailDetails, userTrails]);

  return (
    <main>
      {showMap && <MyTrailMap setShowMap={setShowMap} />}
      {!showMap && selectedMyTrailDetails && (
        <MyTrailDetails
          setShowMap={setShowMap}
          selectedMyTrailDetails={selectedMyTrailDetails}
          trailImages={trailImages}
        />
      )}
    </main>
  );
};

export default MyTrailDetailsPage;
