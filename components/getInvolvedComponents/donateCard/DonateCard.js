import React from 'react'
import styles from './DonateCard.module.css'

function DonateCard(props) {
  return (
    <div className={styles.donateCard}>
      <img src={`/img/${props.img}.png`} alt={props.img}></img>
      <div>
        <h3 className='global-h3'>{props.title}</h3>
        <p className = "global-p">{props.content}</p>
      </div>
    </div>
  );
}

export default DonateCard