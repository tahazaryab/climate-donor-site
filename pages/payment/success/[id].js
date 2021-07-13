
import axios from 'axios'
import { useRouter } from 'next/router'
import { addDonation } from '../../../lib/firebase'
import React, { useRef } from 'react'
import DBNavBar from '../../../components/DBNavBar'

import {
    useAuthUser,
    withAuthUser, 
    AuthAction
} from 'next-firebase-auth'

const PaymentSuccess = () => {

    const useComponentWillMount = (func) => {
        const willMount = useRef(true)
    
        if (willMount.current) func()
    
        willMount.current = false
    }

    const router = useRouter()
    const { id } = router.query
    const AuthUser = useAuthUser()

    const getSession = async() => {
        const session = await axios.post('/api/payment/getDetails', {
            id: id,
        })
        console.log(session)
        console.log(session.data.session.metadata.projectId)

        const { projectId, amount } = session.data.session.metadata
        addDonation(AuthUser.id, projectId, session.data.session.id, amount)
        console.log(session)
    }
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
      
    async function timeSensativeAction(){ //must be async func
        //do something here
        await sleep(5000) //wait 5 seconds
    }

    useComponentWillMount(()=>{
        getSession()
        timeSensativeAction()
        router.push("/dashboard")
    })
    

    return(
        <div>
            <DBNavBar />
            <h1>
                Your Payment is successful
            </h1>
        </div>
    )
}

const MyLoader = () => <div>Loading...</div>
export default withAuthUser({
    whenAuthed: AuthAction.RENDER,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent: MyLoader,
})(PaymentSuccess)