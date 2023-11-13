import { createContext } from "react";
import { dashboardAxios } from "../config/axios";
import Swal from "sweetalert2";
import { useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const addemployee = async (credential) => {
    try {
      const response = await dashboardAxios.post(
        "/user/createUser",
        credential
      );
      const userData = response.data.user;
      const newUser = {
        profileImage: userData.profileImage,
        firstName: userData.firstName,
        lastName: userData.lastName,
        position: userData.position,
        userBossId: userData.userRelationshipUser[0].userBossId || "",
        employeeId: userData.employeeId,
        mobile: userData.mobile,
        email: userData.email,
        id: userData.id,
        userType: userData.userType,
        isActive: userData.isActive,
        checkLocation: userData.checkLocation,
      };
      setAllUser((prev) => {
        return [newUser, ...prev];
      });
      if (response.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add user success!",
          showConfirmButton: false,
          timer: 1500,
        });
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
  };

  const updateuser = async (credential) => {
    try {
      const res = await dashboardAxios.patch("/user/updateUser", credential);
      const newUser = [...allUser];
      const foundIdx = newUser.findIndex(
        (item) => item.id === res.data.user.id
      );
      newUser.splice(foundIdx, 1, {
        ...res.data.user,
        userBossId: res.data.user.userRelationshipUser[0].userBossId,
      });
      console.log(console.log(newUser));
      setAllUser(newUser);

      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit user success!",
          showConfirmButton: false,
          timer: 1500,
        });
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
  };

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
          userBossId: user.userRelationshipUser[0]?.userBossId || "",
          employeeId: user.employeeId,
          mobile: user.mobile,
          email: user.email,
          id: user.id,
          userType: user.userType,
          isActive: user.isActive,
          checkLocation: user.checkLocation,
          companyProfile: user.companyProfile,
        }));
        setAllUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <UserContext.Provider
      value={{ addemployee, getalluser, updateuser, loading, allUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
