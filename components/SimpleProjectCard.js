//import styles from "../styles/SimpleProjectCard.module.css";
import { faUser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SimpleProjectCard = ({ project }) => {
	return (
		<Link
			href={`/project/${project.id}`}
		>
			<div>

			</div>
		</Link>
	);
}

export default SimpleProjectCard;