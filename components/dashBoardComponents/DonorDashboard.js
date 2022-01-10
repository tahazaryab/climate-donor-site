import { Layout } from "antd";
import React, { useState, useEffect } from "react";

import Sidebar from "../../components/Sidebar";
import Search from "./DonorDashPages/Search";
import History from "./DonorDashPages/History";
import Projects from "./DonorDashPages/Projects";

import styles from "../../styles/Dashboard.module.css";

import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

const { Content } = Layout;

const DonorDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("1");

  useEffect(() => {
    setIsLoading(false);
  }, [selectedMenu]);

  const returnPage = (selectedMenu) => {
    console.log(selectedMenu);
    switch (selectedMenu) {
      case "1":
        return <Projects />;
      case "2":
        return <Search />;
      case "3":
        return <History />;
      default:
        return;
    }
  };

  return (
    <Layout>
      {!isLoading && (
        <Content className={styles.dashboardContent}>
          <Sidebar setSelectedMenu={setSelectedMenu} />

          {returnPage(selectedMenu)}
        </Content>
      )}
    </Layout>
  );
};

const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: MyLoader,
})(DonorDashboard);
