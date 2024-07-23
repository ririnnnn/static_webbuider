import { useEffect, useState } from "react";
import { sendRequest } from "../../apiHandler";
import { LoginManager } from "../../loginManager";
import { Button, Input, Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";

function CreateNewSiteModal({ setModal, onCreate }) {
  const [siteName, setSiteName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function createNewSite() {
    const response = await sendRequest("Sites", "POST", siteName);
    if (response.ok) {
      alert("siteCreated");
      onCreate();
      setModal("noModal");
    } else alert("faled");
  }
  return (
    <Modal
      title="Create new site"
      open={true}
      onCancel={() => {
        setModal("noModal");
      }}
      onOk={() => {
        createNewSite();
      }}
      footer={
        <>
          <button
            className="px-2 py-1 bg-gray-200 rounded shadow"
            onClick={() => {
              setModal("noModal");
            }}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 bg-green-300 rounded shadow mx-2"
            onClick={() => {
              createNewSite();
            }}
          >
            Create
          </button>
        </>
      }
    >
      <label>Site name:</label>
      <Input
        value={siteName}
        onChange={(e) => {
          setSiteName(e.target.value);
        }}
      />
    </Modal>
  );
}

function SitesMonitors() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [modal, setModal] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const modals = {
    noModal: <></>,
    createNewSite: (
      <CreateNewSiteModal setModal={setModal} onCreate={Refresh} />
    ),
  };
  const tableColumn = [
    {
      title: "Count",
      dataIndex: "",
      key: "Count",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      key: "action",
      render: (text, record, index) => (
        <>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              navigate("/edit", { state: { siteId: record.id } });
            }}
          ></i>
        </>
      ),
    },
  ];
  async function Refresh(page, pageSize) {
    const response = await sendRequest("Sites/pagination", "get", null, {
      page: page - 1,
      pageSize: pageSize,
    });
    if (response.ok) {
      const data = await response.json();
      setPagination({
        current: data.current + 1,
        pageSize: data.pageSize,
        total: data.total,
      });
      setSites(data.data);
    }
  }
  function handleOnChange(pagination) {
    Refresh(pagination.current, pagination.pageSize);
  }
  useEffect(() => {
    const getSites = async () => {
      const profile = await LoginManager.getProfile();
      if (profile) {
        Refresh(1, 10);
      } else navigate("/");
    };
    getSites();
  }, []);
  return (
    <>
      {sites.length == 0 ? (
        <>
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="">You don't have any site</div>
              <div>
                <button
                  className="px-2 py-1 rounded bg-green-300 block"
                  onClick={() => {
                    setModal("createNewSite");
                  }}
                >
                  Create new site
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-end py-2">
            <div className="w-fit px-3">
              <button
                className="px-2 py-1 rounded bg-green-300 block"
                onClick={() => {
                  setModal("createNewSite");
                }}
              >
                New Site
              </button>
            </div>
          </div>
          <Table
            dataSource={sites}
            columns={tableColumn}
            pagination={pagination}
            onChange={handleOnChange}
          />
          <div className="h-10"></div>
        </>
      )}
      {modals[modal]}
    </>
  );
}
export default SitesMonitors;
