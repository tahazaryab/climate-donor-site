import styles from "../styles/Hero.module.css";
import Link from "next/link";

function Hero(props) {
  const h1 = props.h1;
  const h2 = props.h2;
  const type = props.type;

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.title}>
          <h1 className="global-h1">
            {h1}
          </h1>
          <h2 className="subtitle">
            {h2}
          </h2>
          {type == "home" && <div>
            <p className="global-p">
              Check out our current
              <Link href="./projects">
                <span className={styles.heroButton + " btn"}>Projects</span>
              </Link>
            </p>
          </div>}
        </div>
        <div className={styles.media}>
          <a href="https://twitter.com/ClimateDonor/" target="_blank">
            <img src="./home_img/icons/twitter.svg" alt="twitter"></img>
          </a>
          <a href="https://www.instagram.com/climatedonor/" target="_blank">
            <img src="./home_img/icons/instagram.svg" alt="instagram"></img>
          </a>
          <a
            href="https://www.linkedin.com/company/climatedonor-org/"
            target="_blank">
            <img src="./home_img/icons/linkedin.svg" alt="linkedin"></img>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
