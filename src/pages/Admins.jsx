import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAdminsError,
  getAdminsPending,
  getAdminsSuccess,
} from "../toolkit/Slicer";

export const Admins = () => {
  const navigate = useNavigate();
  const { admins, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const dispatch = useDispatch();
  const { data, isError, isPending } = admins;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getAdminsPending());
        const response = (await axios.get(url + "api/admin/", config)).data
          .data;
        dispatch(getAdminsSuccess(response));
      } catch (err) {
        dispatch(getAdminsError());
        console.log(err);
      }
    }
    getData(baseUrlApi);
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = (
        await axios.delete(baseUrlApi + "api/admin/delete/" + id, config)
      ).data;
      const newData = data.filter((item) => item._id !== id);
      dispatch(getAdminsSuccess(newData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen p-5 bg-cyan-50 overflow-y-auto">
      <div className="h-[20vh] flex justify-between items-center ">
        <h1 className="text-5xl">Adminlar</h1>
        <Link
          to={"/add-admin"}
          className="bg-green-600 py-3 px-5 rounded-md text-white font-semibold"
        >
          Yangi Admin Qo'shish
        </Link>
      </div>
      <table className="w-full bg-white">
        <thead className="border-2 border-cyan-800">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {isPending ? (
            <tr className="text-center border-2 border-cyan-800">
              <td>Loading...</td>
            </tr>
          ) : data.length > 0 ? (
            data.map((elem) => (
              <tr
                key={elem._id}
                className="text-center border-2 border-cyan-800"
              >
                <td>{elem.name}</td>
                <td>{elem.email}</td>
                <td>
                  <Link
                    to={`/admin/${elem._id}`}
                    className="bg-green-900 text-white rounded-md p-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit-admin/${elem._id}`}
                    className="bg-cyan-900 text-white rounded-md p-2 mx-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteAdmin(elem._id)}
                    className="bg-red-800 text-white rounded-md p-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center border-2 border-cyan-800">
              <td>No Data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
