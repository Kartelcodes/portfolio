export default function getCurrentDate() {
  const currentDate = new Date();

  // Get day, month, and year
  const day = String(currentDate.getDate()).padStart(2, "0"); // Ensure two digits with leading zero
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const year = currentDate.getFullYear();

  // Construct the date string in the desired format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
