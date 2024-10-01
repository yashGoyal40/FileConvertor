import MyCard from "./MyCard";
import { useSelector } from "react-redux";
import { isLoggedIn } from '../store/authSlice';
import NOLoggedIn from "./NOLoggedIn";

function Content() {
  const isAuthenticated = useSelector(isLoggedIn);

  return (
    <div className="relative min-h-screen flex flex-col bg-black overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(75, 75, 75, 0.3) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(75, 75, 75, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="relative z-10 text-white p-6">
        {isAuthenticated ? (
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full md:w-1/2 my-12">
              <MyCard name="csvtojson" />
            </div>
            <div className="w-full md:w-1/2 my-12">
              <MyCard name="jsontocsv" />
            </div>
          </div>
        ) : (
          <NOLoggedIn />
        )}
      </div>
    </div>
  );
}

export default Content;
