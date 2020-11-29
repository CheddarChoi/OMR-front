function hm2dec(hoursMinutes) {
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return (hours + minutes / 60).toFixed(2);
}

export function time2dec(tIn) {
  if (tIn === "") return 0;
  if (tIn.indexOf("h") >= 0 || tIn.indexOf(":") >= 0)
    return hm2dec(tIn.split(/[h:]/));
  if (tIn.indexOf("m") >= 0) return hm2dec([0, tIn.replace("m", "")]);
  if (tIn.indexOf(",") >= 0)
    return parseFloat(tIn.split(",").join(".")).toFixed(2);
  if (tIn.indexOf(".") >= 0) return parseFloat(tIn);
  return parseInt(tIn, 10);
}
