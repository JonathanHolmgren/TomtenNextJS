import dbConnect from "@/utils/dbConnect";

import { getBookings } from "@/utils/dbFunctions";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (req.query.id) {
          const bookings = await getBookings(req.query.id);
          return res.status(200).json({ data: bookings });
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
    default:
      res.status(400).json({ success: false });
  }
}
