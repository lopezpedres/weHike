import { signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/UserAuthProvider/UserAuthProvider";
import { auth } from "../../firebase/firebaseConfig";
import { logout } from "../../context/UserAuthProvider/UserAuthProvider";
import loadingGift from "/assets/images/loading.gif";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const logOutHanlder = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 1);
  };
  return (
    <>
      {currentUser ? (
        <>
          <button onClick={() => logOutHanlder()}>LogOut</button>
          <p>
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
          </p>
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
        <div className="absolute top-1/2 -translate-y-1/2">
          <img alt="loading" src={loadingGift} />
          <h1 className="text-xl text-center">Loading ...</h1>
        </div>
      )}
      <Navbar />
    </>
  );
};

export default Profile;
