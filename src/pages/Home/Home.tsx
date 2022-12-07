import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import search from "/assets/icons/search.svg";
import GeneralList from "../../components/GeneralList/GeneralList";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return unsub();
  }, []);
  return (
    <>
      <main className="bg-white">
        <h1 className="text-center mt-5 text-4xl">Hi Miguel🌄</h1>
        <section className="sticky mt-1 mx-4 top-0">
          <article className="bg-white pt-12">
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img className="w-6" src={search} />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="border text-sm rounded-lg block w-full pl-10 p-2.5 placeholder-gray-400  "
                placeholder="Eagle Blobs, Black Tusk, etc..."
              />
            </div>
          </article>
        </section>
        <GeneralList />
      </main>
      <Navbar activeNavbar={true} />
    </>
  );
};

export default Home;
