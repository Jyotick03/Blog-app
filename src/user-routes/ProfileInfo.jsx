import React from "react";
import Base from "../components/Base";

import { useState } from "react";
import { useEffect } from "react";
import { getSingleUser } from "../services/user-service";
import { useParams } from "react-router-dom";
import ViewUserProfile from "../components/ViewUserProfile";

const ProfileInfo = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getSingleUser(userId).then((data) => {
      setUser(data);
      console.log(data);
    });
  }, []);
  return (
    <Base>
      <ViewUserProfile user={user} />
    </Base>
  );
};

export default ProfileInfo;
