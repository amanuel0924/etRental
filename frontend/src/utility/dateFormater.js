const dateFormater = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // 12-hour format
    timeZone: "UTC",
  }
  const newDate = new Date(date).toLocaleDateString(undefined, options)
  console.log(newDate)
  return newDate
}
export default dateFormater
