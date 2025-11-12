export const createBooking = async (data) => {
  await fetch("https://your-render-backend.onrender.com/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};
