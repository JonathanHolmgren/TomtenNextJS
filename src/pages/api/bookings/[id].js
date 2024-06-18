import dbConnect from "@/utils/dbConnect";
import { deleteBooking } from "@/utils/dbFunctions";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        const { id } = req.query;
        const response = await deleteBooking(id);
        res.status(200).json({ success: true, data: response });
      } catch (error) {
        console.error("Error in DELETE request:", error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
