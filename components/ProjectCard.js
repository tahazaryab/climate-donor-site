import styles from '../styles/ProjectCard.module.css'
import { Image, Progress } from 'antd';
import { faUser, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link  from 'next/link';

const tag_text1 = "Clean Energy"
const tag_text2 = "Transportation"

const calPercentage = (currentAmt, total) => {
    currentAmt = parseInt(currentAmt, 10);
    total = parseInt(total, 10);
    return ((100 * currentAmt) / total).toFixed(2);
}

const ProjectCard = ({ project }) => {

    return (
        <div className={styles.projectCard}>
            <Image width={200} height={180} src={project.src} fallback="error_project.png" />
            <div className={styles.cardContent}>
                {project.tagName == tag_text1 && <div className={styles.tag_red}>{project.tagName}</div>}
                {project.tagName == tag_text2 && <div className={styles.tag_blue}>{project.tagName}</div>}
                <div className={styles.cardContent__info}>
                    <Link href={{
                        pathname: '/project_page',
                        query: { projectId : project.id },
                    }}>    
                    <h3 className={styles.Link}>{project.title}</h3>
                    </Link>
                    <p>{project.description}</p>
                </div>
                <div className={styles.progressBar} style={{width: 300}}>
                    <Progress 
                        percent={calPercentage(project.curAmt, project.totalAmt)} 
                        strokeColor="#048a81" 
                        size="default" 
                        format={() => <p><b>${project.curAmt} raised</b> <span className={styles.smallFont}> of ${project.totalAmt}</span></p>} 
                    />
                </div>
                <div className={styles.labels}>
                    <span><FontAwesomeIcon icon={faUser} /> {project.author}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {project.location}</span>
                    <span>Published {project.published}</span>
                    <span>Last Updated {project.updated}</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;