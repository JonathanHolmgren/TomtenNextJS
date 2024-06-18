import User from "@/models/User";
import Showtime from "@/models/Showtime";
import Booking from "@/models/Booking";
import Review from "@/models/Review";
import Movie from "@/models/Movie";

// USERS

export async function addUser(data) {
  return await User.create(data);
}

export async function getUsers() {
  return await User.find();
}

export async function getOneUser(id) {
  return await User.findOne({ _id: id });
}

export async function getUserByUserName(userName) {
  return await User.findOne({ userName: userName });
}

export async function getUserByEmail(email) {
  return await User.findOne({ email: email });
}

export async function modifyUser(id, data) {
  return await User.updateOne({ _id: id }, data);
}

export async function modifyUserPaymentMethod(userName, data) {
  return await User.updateOne(
    { userName: userName },
    { $push: { paymentMethods: data } }
  );
}

export async function deleteUser(id) {
  return await User.deleteOne({ _id: id });
}

export async function deleteUserPaymentMethod(userName, cardNr) {
  return await User.updateOne(
    { userName: userName },
    { $pull: { cardNr: cardNr } }
  );
}

// SHOWTIMES

export async function getShowtimes() {
  return await Showtime.find();
}

export async function getShowtimesForIndexPage() {
  return await Showtime.aggregate([
    {
      $sort: {
        date: 1
      }
    },
    {
      $match: {
        date: {
          $gte: new Date(),
          $lt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        }
      }
    },
    {
      $lookup: {
        from: "movies",
        localField: "movieId",
        foreignField: "_id",
        as: "movie"
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" }
        },
        showtimes: {
          $push: {
            id: "$_id",
            salong: "$salong",
            time: "$date",
            movieId: "$movieId",
            movieName: { $arrayElemAt: ["$movie.title", 0] }
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateFromParts: {
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day"
          }
        },
        showtimes: 1
      }
    },
    {
      $sort: {
        date: 1
      }
    }
  ]);
}

export async function addShowtimes(data) {
  return await Showtime.create(data);
}

export async function getShowtimesForMovie(id) {
  return await Showtime.find({
    movieId: id,
    date: {
      $gte: new Date()
    }
  });
}

// BOOKINGS

export async function getBookings(userId) {
  return await Booking.find({ userId: userId });
}

export async function addBooking(data) {
  return await Booking.create(data);
}

export async function deleteBooking(id) {
  return await Booking.deleteOne({ _id: id });
}

// REVIEWS

export async function getReviews() {
  return await Review.find();
}

export async function getUserReviewsForMovie(id, user) {
  return await Review.find({ movieId: id, author: user });
}

export async function addReview(data) {
  return await Review.create(data);
}

export async function getReviewsForMovie(id) {
  return await Review.find({ movieId: id });
}

// MOVIES

export async function getMovies() {
  return await Movie.find();
}

export async function getMovie(id) {
  return await Movie.findById(id);
}

export async function addMovie(data) {
  return await Movie.create(data);
}
