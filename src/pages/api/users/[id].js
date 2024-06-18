import dbConnect from "@/utils/dbConnect";
import JWT from "jsonwebtoken";

import { deleteUser, getUserByUserName, modifyUser } from "@/utils/dbFunctions";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const username = req.query.id;
        const cookieSession = req.headers.cookie.split("session=")[1];
        const decoded = JWT.verify(cookieSession, process.env.SIGN_KEY);

        if (decoded.userName === username) {
          const user = await getUserByUserName(username);
          return res.status(200).json({ data: user });
        } else {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
      } catch (error) {
        console.error("Error in GET request:", error);
        return res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
    case "PATCH":
      try {
        const response = await modifyUser(req.query.id, req.body);
        res.status(200).json({ success: true, data: response.modifiedCount });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const response = await deleteUser(req.query.id);
        res.status(200).json({ success: true, data: response.deletedCount });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
