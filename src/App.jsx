import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import AddAdmin from "./pages/AddPages/AddAdmin";
import AddCourses from "./pages/AddPages/AddCourses";
import AddProjects from "./pages/AddPages/AddProjects";
import AddServices from "./pages/AddPages/AddServices";
import AddWorker from "./pages/AddPages/AddWorker";
import { Admins } from "./pages/Admins";
import { Courses } from "./pages/Courses";
import { Dashboard } from "./pages/Dashboard";
import Admin from "./pages/Details/Admin";
import Course from "./pages/Details/Course";
import { Project } from "./pages/Details/Project";
import Service from "./pages/Details/Service";
import Worker from "./pages/Details/Worker";
import EditAdmin from "./pages/EditPages/EditAdmin";
import EditCourse from "./pages/EditPages/EditCourse";
import EditProject from "./pages/EditPages/EditProject";
import EditService from "./pages/EditPages/EditServices";
import EditWorker from "./pages/EditPages/EditWorker";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Services } from "./pages/Services";
import { Team } from "./pages/Team";
import { checkLogin } from "./toolkit/Slicer";
function App() {
  const { userData, config } = useSelector((state) => state.mainSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser(id) {
      try {
        const response = await axios.get(
          "https://bc.rakhsrb.uz/api/admin/" + id,
          config
        ).data;
        if (response) {
          dispatch(checkLogin(true));
        }
      } catch (err) {
        dispatch(checkLogin(false));
        console.log(err);
      }
    }
    if (JSON.parse(localStorage.getItem("adminInfo"))) {
      const userId = JSON.parse(localStorage.getItem("adminInfo"));
      getUser(userId._id);
    } else {
      dispatch(checkLogin(false));
    }
  }, []);

  const router = createBrowserRouter([
    userData.isLogin
      ? {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "/courses",
              element: <Courses />,
            },
            {
              path: "/services",
              element: <Services />,
            },
            {
              path: "/projects",
              element: <Projects />,
            },
            {
              path: "/admins",
              element: <Admins />,
            },
            {
              path: "/team",
              element: <Team />,
            },
            //add paths
            {
              path: "/add-admin",
              element: <AddAdmin />,
            },
            {
              path: "/add-course",
              element: <AddCourses />,
            },
            {
              path: "/add-portfolio",
              element: <AddProjects />,
            },
            {
              path: "/add-service",
              element: <AddServices />,
            },
            {
              path: "/add-worker",
              element: <AddWorker />,
            },
            //edit paths
            {
              path: "/edit-admin/:id",
              element: <EditAdmin />,
            },
            {
              path: "/edit-course/:id",
              element: <EditCourse />,
            },
            {
              path: "/edit-portfolio/:id",
              element: <EditProject />,
            },
            {
              path: "/edit-service/:id",
              element: <EditService />,
            },
            {
              path: "/edit-worker/:id",
              element: <EditWorker />,
            },
            {
              path: "*",
              element: <NotFound />,
            },
            // Details
            {
              path: "/project/:id",
              element: <Project />,
            },
            {
              path: "/admin/:id",
              element: <Admin />,
            },
            {
              path: "/course/:id",
              element: <Course />,
            },
            {
              path: "/service/:id",
              element: <Service />,
            },
            {
              path: "/worker/:id",
              element: <Worker />,
            },
          ],
        }
      : {
          path: "/",
          element: <Login />,
        },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
