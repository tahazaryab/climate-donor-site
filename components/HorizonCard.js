import React from "react";
import styles from "../styles/HorizonCard.module.css"

function HorizonCard(props) {
  return (
    <div className={props.type == "contribute" ? styles.horizonCard + " " + styles.contributeCard : styles.horizonCard}>
      <img src={`img/${props.img}`} alt="pic1"></img>
      <div>
        {props.number && <h2 className="global-h2">{props.number}</h2>}
        <h3 className="global-h3">{props.title}</h3>
        <p className="global-p">
          {props.content}
        </p>
      </div>
    </div>
  );
}

export default HorizonCard;
