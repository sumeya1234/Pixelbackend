const db = require("../database/db");

// Create a new booking
const createBooking = (bookingData, callback) => {
  const { name, email, sessionDate, startTime, endTime } = bookingData;

  // Check for conflicting booking
  const conflictQuery = `
    SELECT * FROM bookings 
    WHERE sessionDate = ? 
    AND ((startTime < ? AND endTime > ?) OR (startTime < ? AND endTime > ?))
  `;

  db.query(
    conflictQuery,
    [sessionDate, endTime, startTime, endTime, startTime],
    (err, results) => {
      if (err) return callback(err, null);

      if (results.length > 0) {
        return callback(new Error("Time slot already reserved"), null);
      }

      // Insert new booking
      const query = `
        INSERT INTO bookings (name, email, sessionDate, startTime, endTime)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        query,
        [name, email, sessionDate, startTime, endTime],
        (err, result) => {
          if (err) return callback(err, null);
          callback(null, { id: result.insertId, ...bookingData });
        }
      );
    }
  );
};

// Get all bookings
const getBookings = (callback) => {
  db.query("SELECT * FROM bookings ORDER BY sessionDate DESC", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

module.exports = {
  createBooking,
  getBookings,
};
