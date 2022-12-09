import { signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/UserAuthProvider/UserAuthProvider";
import { auth } from "../../firebase/firebaseConfig";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const logOutHanlder = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <>
      {currentUser ? (
        <>
          <button onClick={() => logOutHanlder()}>LogOut</button>
          <p>{currentUser.displayName}</p>
          <section className="relative">
            <div className=" rounded-b-[4rem] xl h-72 bg-primary shadow-md">
              <h1 className="text-3xl font-semibold text-center p-4">
                Profile
              </h1>
              <article className=" absolute w-8/12 left-1/2 -translate-x-1/2 rounded-3xl -bottom-20 h-64 bg-white shadow-xl">
                <div className="bg-primary w-24 h-24 rounded-full mx-auto ">
                  <img />
                </div>
              </article>
            </div>
          </section>
        </>
      ) : (
        <h1>Loading</h1>
      )}
      <Navbar />
    </>
  );
};

export default Profile;
