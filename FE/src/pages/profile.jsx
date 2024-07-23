import { useState } from "react";
import TopBar from "../components/profilePage/topBar";
import SitesMonitors from "../components/profilePage/sitesMonitor";

function ProfilePage() {
  const [content, setContent] = useState(<SitesMonitors />);

  const [leftMenuData, setLeftMenuData] = useState([
    {
      label: "Sites monitor",
      icon: <i className="fa-solid fa-chart-column"></i>,
      content: <SitesMonitors />,
    },
  ]);

  const [leftMenuOpen, setLeftMenuOpen] = useState(true);

  return (
    <>
      <div className="w-screen h-screen flex flex-col overflow-clip">
        <TopBar
          toggleLeftMenu={() => {
            setLeftMenuOpen(!leftMenuOpen);
          }}
        ></TopBar>
        <div className="w-full h-full bg-zinc-500 flex-1 flex">
          <div
            className={
              "h-full bg-slate-50 transition-[width-0.5s] pt-2" +
              (leftMenuOpen ? " w-60" : " w-0")
            }
          >
            {leftMenuData.map((item) => (
              <div
                key={item}
                className="mx-2 rounded px-2 py-1 hover:bg-zinc-200 flex items-center select-none"
                onClick={() => {
                  setContent(item.content);
                }}
              >
                <div className="w-8 h-8 flex justify-center items-center">
                  {item.icon}
                </div>
                <div className="mx-2 flex-1">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="max-h-full bg-red-300 flex-1 w-full overflow-x-hidden overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfilePage;
