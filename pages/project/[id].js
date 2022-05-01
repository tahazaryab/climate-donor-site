import styles from '../../styles/ProjectPage.module.css'
import { Button, Image, Progress, Row, Layout, Modal} from 'antd'
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDoc } from '../../lib/firebase'
import {
    useAuthUser,
    withAuthUser,
    AuthAction
} from 'next-firebase-auth'
import { addDonation } from '../../lib/firebase'
import { deleteProj } from '../../lib/firebase'
import DBNavBar from "../../components/DBNavBar";
import Link from 'next/link'
import axios from 'axios'

const tag_text1 = "Clean Energy"
const tag_text2 = "Transportation"

const calPercentage = (currentAmt, total) => {
    currentAmt = parseInt(currentAmt, 10);
    total = parseInt(total, 10);
    return ((100 * currentAmt) / total).toFixed(2);
}

import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const ProjectPage = () => {
    const AuthUser = useAuthUser()
    const displayName = AuthUser.firebaseUser.displayName
    const router = useRouter()
    const [amount] = useState(10)
    const [project, setProject] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [deleteLoading, setDeleteLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState("This action is permanent and can not be reversed");

    const { id } = router.query;
    const { Content } = Layout;

    const getProject = async () => {
        var proj = (await getDoc("projects", id))
        proj = await Promise.resolve(proj)
        proj.published = proj?.published.toDate().toLocaleDateString() + ''
        proj.updated = proj?.updated.toDate().toLocaleDateString() + ''
        setProject(proj)
        setIsLoading(false)
    }

    useEffect(()=>{
        getProject()

        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            addDonation(AuthUser.id, id, amount)
            console.log('Order placed! You will receive an email confirmation.');
        }
        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
          
    }, [])
    

    const handleDonate = async() => {
        const projectDetails = {
            name: project.title,
            id: project.id,
            amount: amount
        }

        const stripe = await stripePromise;
        const response = await axios.post('/api/payment/checkout', projectDetails )
    
        // When the customer clicks on the button, redirect them to Checkout.
        console.log(response)
        const result = await stripe.redirectToCheckout({
          sessionId: response.data.id,
        });

        console.log(result)
    
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
      };
    
    const handleDelete = async () => {
        setModalText("Deleting your project...");
        setDeleteLoading(true);
        await deleteProj(id);
        setTimeout(() => {
            setIsModalVisible(false);
            setDeleteLoading(false);
            router.push("/dashboard/")
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <Layout>
            <DBNavBar userId={AuthUser.id}
                userName={displayName != null ? displayName : 'Name'}
                signOut={AuthUser.signOut} />
            <Content className="siteContent projectPageContent">
                <Row>
                    <div style={{ marginLeft: '30px' }}>
                        <Link href="/dashboard">
                            <span className={styles.breadcrumb}>Projects / </span>
                        </Link>
                        <span>{project?.title}</span>
                    </div>
                </Row>
                <div className={styles.projectPage}>
                    {!isLoading &&
                        <>

                            <div className={styles.col}>
                                <div className={styles.title__info}>
                                    <h1>{project?.title}</h1>
                                    {project?.tagName == tag_text1 && <div className={styles.tag_red}>{project?.tagName}</div>}
                                    {project?.tagName == tag_text2 && <div className={styles.tag_blue}>{project?.tagName}</div>}
                                    <p>{project?.description}</p>
                                </div>
                                <div className={styles.labels}>
                                    <span><FontAwesomeIcon icon={faUser} /> {project?.author}</span>
                                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {project?.location}</span>
                                    <span>Published {project?.published}</span>
                                    <span>Last Updated {project?.updated}</span>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <Image width={630} height={420} src={project?.src} fallback="error_project?.png" />
                                <div className={styles.cardContent}>
                                    <div className={styles.cardContent__info}>
                                        <p>Funds Raised (USD)</p>
                                        <h1>{project?.curAmt}</h1>
                                        <p>Target Amount: ${project?.totalAmt}</p>
                                    </div>
                                    <div className={styles.progressBar} style={{ width: 250 }}>
                                        <Progress
                                            percent={calPercentage(project?.curAmt, project?.totalAmt)}
                                            strokeColor="#048A81"
                                            strokeWidth={20}
                                            strokeLinecap={"square"}
                                            size="default"
                                        />
                                    </div>
                                    <div className={styles.cardContent__info}>
                                        <p>Climate Donor ${project?.totalAmt} </p>
                                        <p>Other Sources ${project?.totalAmt}</p>
                                    </div>
                                    <Button type="primary" className={styles.Button} onClick={handleDonate}>Donate</Button>
                                    <Button type='danger' onClick={showModal}>Delete</Button>

                                    <Modal 
                                        title="Do you want to delete this project?"
                                        closable={false}
                                        centered={true} 
                                        confirmLoading={deleteLoading}
                                        visible={isModalVisible} 
                                        onOk={handleDelete} 
                                        onCancel={handleCancel}
                                        okText={"Delete"}>
                                        <p>{modalText}</p>
                                    </Modal>
                                </div>
                            </div>
                            <div className={styles.col}>
                                <p>{project?.description}</p>
                            </div>
                            <div className={styles.projectUpdates}>
                                <h2 className={styles.projectUpdates_title}>Project Updates</h2>
                            </div>
                        </>
                    }
                </div>
            </Content>
        </Layout>
    )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
    whenAuthed: AuthAction.RENDER,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent: MyLoader,
})(ProjectPage)