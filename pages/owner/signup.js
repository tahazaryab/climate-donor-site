import React,{ useState } from 'react';
import NavBar from "../../components/NavBar";
import {Layout} from 'antd';
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { useStep } from "react-hooks-helper";
import ProjectownerSignUpInfoPage from './projectowner_signup_info';
import OrganizationRegistration from './projectowner_organizationInfo';

const steps = [
    { id: "info" },
    { id: "organization_info" }
];

const {Content} = Layout;

const ProjectownerSignUpPage = () => {
    const [formData, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [organizationInfo, setOrganizationInfo] = useState({});
    const [ errorMessage, setErrorMessage ] = useState("");
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, organizationInfo, setOrganizationInfo, errorMessage, setErrorMessage, navigation };

    const returnStepPage = (id) => {
        switch (id) {
            case "info":
              return <ProjectownerSignUpInfoPage {...props} />;
            case "organization_info":
                return <OrganizationRegistration {...props} />;
            default:
                return <ProjectownerSignUpInfoPage {...props} />;
          }
    }

    return (
        <Layout>
            <NavBar>
            </NavBar>
            <Content className={"siteContent"}>
                {returnStepPage(id) }
            </Content>
        </Layout>
    )
}

const MyLoader = () => <div>Loading...</div>


export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.RENDER,
    LoaderComponent: MyLoader,
})(ProjectownerSignUpPage);
