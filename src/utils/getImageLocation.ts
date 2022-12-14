import exif from "exifr";
export interface InterfaceExifData {
  Software: string;
  DateTimeOriginal: string;
  SubSecTimeOriginal: string;
  GPSLatitudeRef: string;
  GPSLatitude?: number[] | null;
  GPSLongitudeRef: string;
  GPSLongitude?: number[] | null;
  latitude: number;
  longitude: number;
}

const getImageLocation = async (file: File) => {
  const exifData: InterfaceExifData = await exif.parse(file);
  if ((exifData.latitude, exifData.longitude)) {
    return { latitude: exifData.latitude, longitude: exifData.longitude };
  }
};

export default getImageLocation;
