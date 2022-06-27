
export const toTimestamp = (year, month, day, hour, minute = 0, second = 0) => {
    var datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    return datum.getTime();
  }
