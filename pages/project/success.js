import React from 'react';
import { useStripe, loadStripe} from '@stripe/stripe-js';
import NavBar from "../../components/NavBar";
import Link from "next/link";
import Hero from "../../components/Hero";
import AppFooter from "../../components/Footer";
import styles from "../../styles/About.module.css";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import { Footer } from "antd/lib/layout/layout";


const Success = () => {
    
    // stripeSessionData();
    const AuthUser = useAuthUser();
    return (
        <>
            <NavBar userId={AuthUser.id} signOut={AuthUser.signOut}></NavBar>
            <section className="centerContainer">
                    <h1 className="global-h1">Success!!</h1>
                    <p className="global-p m-50">
                    Thank you for donating to our cause!
                    </p>
                </section>
            <AppFooter></AppFooter>
        </>
    );
};

export default Success; 