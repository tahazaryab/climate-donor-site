import NavBar from '../../components/NavBar'
import {Layout} from 'antd'
import { useState } from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import { useStep } from 'react-hooks-helper'
import DonorSignUpInfoPage from './donor_signup_info'
import DonorSignUpInterestsPage from './donor_signup_interests'

const {Content} = Layout;

const steps = [
    { id: "info" },
    { id: "interests" }
];


const DonorSignUpPage = () => {
    const [formData, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [interests, setInterests] = useState({});
    const [ errorMessage, setErrorMessage ] = useState("");
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, interests, setInterests, errorMessage, setErrorMessage, navigation };
      
    const returnStepPage = (id) => {
        switch (id) {
            case "info":
              return <DonorSignUpInfoPage {...props} />;
            case "interests":
              return <DonorSignUpInterestsPage {...props} />;
            default:
                return <DonorSignUpInfoPage {...props} />;
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
})(DonorSignUpPage)
