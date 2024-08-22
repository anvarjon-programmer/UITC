import { Eye, EyeClosed } from "@phosphor-icons/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";

const EditAdmin = () => {
  const [showPass, setShowPass] = useState(false);
  const path = useNavigate();
  const { userData, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { id } = useParams();
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    // password: "",
  });

  useEffect(() => {
    if (!userData.isLogin) {
      path("/");
    }
  }, [userData.isLogin, path]);

  useEffect(() => {
    async function getDataById() {
      try {
        const response = await axios.get(
          baseUrlApi + `api/admin/${id}`,
          config
        );
        setAdminData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataById();
  }, [id]);

  const getUpdatedValues = (e) => {
    const { name, value } = e.target;
    setAdminData((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  const submitUpdatedInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        baseUrlApi + `api/admin/update/${id}`,
        adminData,
        config
      );
      path("/admins");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-[#ecfeff] flex flex-col justify-center items-center">
      <form
        className="border p-10 rounded-md bg-white"
        onSubmit={submitUpdatedInfo}
      >
        <h1 className="text-4xl font-semibold mb-7">
          Admin malumotlarini taxrirlash
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="adminName" className="text-lg">
              Ism kiriting:
            </label>
            <input
              required
              placeholder="Ism Kiriting"
              type="text"
              className="border py-2 px-5 text-md"
              id="adminName"
              name="name"
              value={adminData.name}
              onChange={getUpdatedValues}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="adminEmail" className="text-lg">
              Email:
            </label>
            <input
              required
              placeholder="Email kiriting"
              type="email"
              className="border py-2 px-5 text-md"
              id="adminEmail"
              name="email"
              value={adminData.email}
              onChange={getUpdatedValues}
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="adminPassword" className="text-lg">
              Parolni tasdiqlang:
            </label>
            <div className="border py-1 px-5 text-lg flex items-center gap-3">
              <input
                required
                type={showPass ? "text" : "password"}
                placeholder="Parol kiriting"
                className="outline-none w-full"
                name="password"
                id="adminPassword"
                onChange={getUpdatedValues}
              />
              <span
                onClick={() =>
                  showPass ? setShowPass(false) : setShowPass(true)
                }
              >
                {showPass ? <Eye /> : <EyeClosed />}
              </span>
            </div>
          </div> */}
        </div>
        <button
          type="submit"
          className="py-2 bg-green-700 px-10 mt-10 w-full rounded-sm text-white uppercase font-medium"
        >
          taxrirlash
        </button>
      </form>
    </section>
  );
};

export default EditAdmin;
