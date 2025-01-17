import React, { useState, useEffect } from "react";
import OwnerDashboard from "../components/dashBoardComponents/OwnerDashboard";
import DonorDashboard from "../components/dashBoardComponents/DonorDashboard";
import { getDoc } from "../lib/firebase";
import DBNavBar from "../components/DBNavBar";
import AdminDashboard from "../components/AdminDashboard";

import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
const MyLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {/* <CircularProgress color="primary" /> */}
    </div>
  );
};

const Dashboard = () => {
	const AuthUser = useAuthUser();
	const [user, setUser] = useState({});

	useEffect(async () => {
		try {
			const user = await getDoc("users", AuthUser.id);
			setUser(user);
		} catch (error) {
			console.log(error);
		}
	}, []);

	if (!user.userType) {
		return <MyLoader />;
	}

	const returnComponent = (type) => {
		switch (type) {
			case "donor":
				return <DonorDashboard />;
			case "admin":
				return <AdminDashboard />;
			default:
				return <OwnerDashboard />;
		}
	};

	return (
		<>
			<DBNavBar />
			{returnComponent(user.userType)}
		</>
	);
};

export default withAuthUser({
	whenAuthed: AuthAction.RENDER,
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	LoaderComponent: MyLoader,
})(Dashboard);
