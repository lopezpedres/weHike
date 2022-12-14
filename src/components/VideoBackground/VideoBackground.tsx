import { useEffect, useRef } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import signupVideo from "/assets/videos/signup.mp4";
interface Props {
  children: React.ReactNode;
}
const VideoBackground = ({ children }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
      videoRef.current.autoplay = true;
    }
  }, []);
  return (
    <main className=" bg-primary h-screen">
      <video
        className="fixed object-cover opacity-80 rounded-b-3xl "
        autoPlay
        loop
        muted
        ref={videoRef}
      >
        <source src={signupVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="fixed top-10 p-4 text-4xl text-white font-semibold">
        Let's start exploring the world
      </h1>
      <section className="bg-white rounded-2xl fixed top-80 mt-10 left-1/2 -translate-x-1/2 max-w-lg w-11/12 mx-auto">
        {children}
      </section>
    </main>
  );
};

export default VideoBackground;
