import styles from '../styles/ProjectTabs.module.css'
import {Button} from 'antd'

const ProjectTabs = ({title, link1, link2, link3, onClick}) => {
    return (
        <div>
            <div className={styles.title}>
                <h1>{title}</h1>
            </div>

            <div>
                <Button className={styles.button1} type="link" onClick={onClick}>{link1}</Button>
                <Button className={styles.button2} type="link" onClick={onClick}>{link2}</Button>
                <Button className={styles.button3} type="link" onClick={onClick}>{link3}</Button>
            </div>
        </div>
    )
}

export default ProjectTabs;

