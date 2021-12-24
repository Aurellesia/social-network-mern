const convertDate = (date) => {
  const convert = new Date(date);
  const result = convert.toLocaleString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
  return result;
};

export default convertDate;
