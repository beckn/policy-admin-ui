export const formatDate = (date: string) => {
  let rawData = new Date(date),
    month = "" + (rawData.getMonth() + 1),
    day = "" + rawData.getDate(),
    year = rawData.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
};

export const convertUtcToYYMMDD = (dateString: string) => {
  let date = new Date(dateString),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);

  return [date.getFullYear(), mnth, day].join("-");
};
export const convertUtcToDDMMYY = (dateString: string) => {
  let date = new Date(dateString),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);

  return [day, mnth, date.getFullYear()].join("-");
};
