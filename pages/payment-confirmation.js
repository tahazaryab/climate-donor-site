import { Button } from "antd";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import confirmStyles from "../styles/PaymentConfirmation.module.css";
import React from "react";
import DBNavBar from "../components/DBNavBar";
import "@fontsource/inter";

export default function PaymentConfirmation() {
    return (
        <>
            <NavBar />
            <br />
            <div className={confirmStyles.thanks}>
                <h1 className>Thank you for donating!</h1>
                <h3>What's next?</h3>
                <p>
                    If you have an account, look out for project updates to see the impact of your contributions!  If you don
                    &lsquo;t have an account, you can create one here to keep track of your donations going forward.
                </p>
                <Button type="primary">Discover New Projects</Button>
            </div>
            
        </>
    );
}