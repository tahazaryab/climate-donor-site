// ./pages/api/signin
import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../../utils/initAuth"; // the module you created above

initAuth();

const handler = async (req, res) => {
	try {
		await setAuthCookies(req, res);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
	return res.status(200).json({ success: true });
};

export default handler;
