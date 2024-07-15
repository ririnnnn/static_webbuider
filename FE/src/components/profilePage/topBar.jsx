import { useEffect, useState } from "react";
import { LoginManager } from "../../loginManager";
import { useNavigate } from "react-router-dom";

function TopBar(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "temp",
  });
  // components controll state
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      const profile = await LoginManager.getProfile();
      if (profile) setUserData(profile);
      else navigate("/");
    };
    checkUser();
  }, []);
  return (
    <div className="w-full flex items-center justify-between bg-zinc-100">
      <div className="flex items-center">
        <div
          className="w-8 h-8 justify-center items-center flex rounded mx-3 hover:bg-zinc-300"
          onClick={() => {
            props.toggleLeftMenu();
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
        <div>LOGO</div>
      </div>
      <div className="w-fit relative mx-3 hover:bg-zinc-300">
        <div
          className="px-3 py-1 flex items-center select-none"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <div>{userData.username}</div>
          <div className="w-8 h-8 bg-green-500 rounded-[16px] mx-3"></div>
        </div>
        {showMenu ? (
          <div className="absolute bg-slate-200 rounded top-10 w-full">
            <div
              className="w-full text-center py-2 hover:bg-gray-300 rounded-t"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              logout
            </div>
            <div
              className="w-full text-center py-2 hover:bg-gray-300"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              profile
            </div>
            <div
              className="w-full text-center py-2 hover:bg-gray-300 rounded-b"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              logout
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default TopBar;
