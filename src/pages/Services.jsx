import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteService,
  getServicesError,
  getServicesPending,
  getServicesSuccess,
} from "../toolkit/Slicer";

export const Services = () => {
  const dispatch = useDispatch();
  const { services, baseUrlApi, config } = useSelector(
    (state) => state.mainSlice
  );
  const { data, isError, isPending } = services;

  useEffect(() => {
    async function getData(url) {
      try {
        dispatch(getServicesPending());
        const response = (await axios.get(url + "api/services/")).data.data;
        dispatch(getServicesSuccess(response));
      } catch (error) {
        dispatch(getServicesError());
        console.log(error);
      }
    }
    getData(baseUrlApi);
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(baseUrlApi + "api/services/delete/" + id, config);
        dispatch(deleteService(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete project.",
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="h-full p-5 bg-cyan-50">
      <div className="h-[20vh] flex justify-between items-center">
        <h1 className="text-5xl">Xizmatlar</h1>
        <Link
          to={"/add-service"}
          className="bg-green-600 py-3 px-5 rounded-md text-white font-semibold"
        >
          Xizmatlar qo'shish
        </Link>
      </div>
      <table className="w-full bg-white">
        <thead className="border-2 border-cyan-800">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Image</th>
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!isError ? (
            isPending ? (
              <tr className="text-center border-2 border-cyan-800 ">
                <td>Loading...</td>
              </tr>
            ) : data.length > 0 ? (
              data.map((elem) => (
                <tr
                  key={elem._id}
                  className="text-center border-2 border-cyan-800 "
                >
                  <td>{elem.title}</td>
                  <td className="flex justify-center">
                    <img src={elem.image} alt="" />
                  </td>
                  <td>{elem.description}</td>
                  <td>{elem.category}</td>
                  <td>
                    <Link
                      to={`/service/${elem._id}`}
                      className="bg-green-900 text-white rounded-md p-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-service/${elem._id}`}
                      className="bg-cyan-900 text-white rounded-md p-2 mx-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(elem._id)}
                      className="bg-red-800 text-white rounded-md p-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center border-2 border-cyan-800 ">
                <td>No Data...</td>
              </tr>
            )
          ) : (
            <tr className="text-center border-2 border-cyan-800 ">
              <td>Not Found. Some thing went wrong</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
