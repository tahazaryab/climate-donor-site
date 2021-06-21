import styles from '../styles/ProjectTabs.module.css'
import { Button } from 'antd'

const ProjectTabs = ({ links, onClick }) => {
    console.log('links', links)
    return (
        <div className={styles.projectTabs}>
            {
                links.map((link, index) =>
                    <Button key={index} type="link" onClick={onClick}
                        className={index == 0 ? styles.tabbuttonSelected : styles.tabbutton}>
                        {link}
                    </Button>)
            }
        </div>
    )
}

export default ProjectTabs;

