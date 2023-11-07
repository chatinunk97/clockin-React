import { useState } from "react";
import { createContext } from "react";
import { dashboardAxios } from "../config/axios";
import {
  addAccessTokenDB,
  getAccessTokenDB,
  removeAccessTokenDB,
} from "../utils/local-storage";
import { useEffect } from "react";
import Swal from 'sweetalert2'


export const ManageContext = createContext();

export default function ManageContextProvider({ children }) {
  const [manageUser, setManageUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [allLeave, setAllLeave] = useState([]);

  useEffect(() => {
    if (getAccessTokenDB()) {
      dashboardAxios
        .get("/user/me")
        .then((res) => {
          setManageUser(res.data.user);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    } else {
      setInitialLoading(false);
    }
  }, []);
  const login = async (credential) => {
    credential.loginType = "dashboard";
    const res = await dashboardAxios.post("/user/login", credential);
    addAccessTokenDB(res.data.user.accessToken_db);
    setManageUser(res.data.user);
  };

  const logout = () => {
    removeAccessTokenDB();
    setManageUser(null);
    setInitialLoading(false);
  };

  const addemployee = async (credential) => {
    try {
      const response = await dashboardAxios.post("/user/createUser", credential);
      const userData = response.data.user
      const newUser = {
        profileImage: userData.profileImage,
        firstName: userData.firstName,
        lastName: userData.lastName,
        position: userData.position,
        userBossId: userData.userRelationshipUser || "",
        employeeId: userData.employeeId,
        mobile: userData.mobile,
        email: userData.email,
        id: userData.id,
        userType: userData.userType,
        isActive: userData.isActive,
        checkLocation: userData.checkLocation,
      }
      setAllUser((prev) => { return [newUser, ...prev] })
      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add user success!",
          showConfirmButton: false,
          timer: 1500
        })

      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error:", error);
    }
  }


  const updateuser = async (credential) => {
    try {
      const res = await dashboardAxios.patch("/user/updateUser", credential)
      console.log(res.data, '-----------------------')
      const newUser = [...allUser]
      const foundIdx = newUser.findIndex(
        (item) => item.id === res.data.user.id
      )
      newUser.splice(foundIdx, 1, { ...res.data.user, userBossId: res.data.user.userRelationshipUser[0].userBossId })
      console.log(console.log(newUser))
      setAllUser(newUser)
      // console.log(allUser)

      if (res.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Edit user success!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something Went Wrong',
        showConfirmButton: false,
        timer: 1500
      });
      console.error('Error:', error);
    }
  };

  const getAllLeaveProfile = async () =>
    await dashboardAxios.get("/leave/getAllLeaveProfile");



  const getalluser = async () => {
    setLoading(true);
    dashboardAxios
      .get("/user/getAllUser")
      .then((res) => {
        const userData = res.data.allUser.map((user) => ({
          profileImage: user.profileImage,
          firstName: user.firstName,
          lastName: user.lastName,
          position: user.position,
          userBossId: user.userRelationshipUser[0]?.userBossId
            || "",
          employeeId: user.employeeId,
          mobile: user.mobile,
          email: user.email,
          id: user.id,
          userType: user.userType,
          isActive: user.isActive,
          checkLocation: user.checkLocation,
        }));
        setAllUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }



  return (
    <ManageContext.Provider
      value={{
        login,
        logout,
        initialLoading,
        manageUser,
        addemployee,
        setInitialLoading,
        getalluser,
        updateuser,
        getAllLeaveProfile,
        loading,
        allUser
      }}
    >
      {children}
    </ManageContext.Provider>
  );
}
