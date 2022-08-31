import styles from "../styles/ProjectCard.module.css";
import { Image, Progress } from "antd";
import { faUser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css'
import Link from "next/link";

const tag_text1 = "Clean Energy";
const tag_text2 = "Transportation";
const tag_text3 = "Environment";

const calPercentage = (currentAmt, total) => {
  currentAmt = parseInt(currentAmt, 10);
  total = parseInt(total, 10);
  return ((100 * currentAmt) / total).toFixed(2);
};

const ProjectCard = ({ project, isOwner }) => {
  return (
    <Link
      className={styles.projectLink}
      href={
        isOwner ? `/owner/project/${project.id}` : `/project/${project.id}`
      }
      >
      <div className={styles.projectCard}>
        <Image
          width={200}
          height={180}
          //src={project.imageURLS[0]}
          fallback="error_project.png"
        />
        <div className={styles.cardContent}>
          {project.tagName == tag_text1 && (
            <div className={styles.tag_red}>{project.tagName}</div>
          )}
          {project.tagName == tag_text2 && (
            <div className={styles.tag_blue}>{project.tagName}</div>
          )}
          {project.tagName == tag_text3 && (
            <div className={styles.tag_blue}>{project.tagName}</div>
          )}
          <div className={styles.cardContent__info}>
            <h3 className={styles.Link}>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className={styles.progressBar} style={{ width: 300 }}>
            <Progress
              percent={calPercentage(project.curAmt, project.totalAmt)}
              strokeColor="#048a81"
              size="default"
              format={() => (
                <p>
                  <b>${project.curAmt} raised</b>{" "}
                  <span className={styles.smallFont}>
                    {" "}
                    of ${project.totalAmt}
                  </span>
                </p>
              )}
            />
          </div>
          <div className={styles.labels}>
            {project.author ? (
              <span>
                <FontAwesomeIcon icon={faUser} />
                <p>{project.author}</p>
              </span>
            ) : (
              <span></span>
            )}
            <span>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>{project.location}</p>
            </span>
            <span>Published {project.published}</span>
            <span>Last Updated {project.updated}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
