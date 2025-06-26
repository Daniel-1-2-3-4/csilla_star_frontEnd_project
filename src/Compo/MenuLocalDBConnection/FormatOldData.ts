import { incrementHoursByOne } from "../LocalDBMS/LocalServiceBarChart";
import { UnsendData } from "../LocalDBMS/LocalServieUnsendBarCharts";
import type { oldDataType, storedOldDataType } from "../MenuTypes";

export function fromatOldData() {
  // Get old data
  const oldData = localStorage.getItem("date");
  if (oldData) {
    const parsedData = JSON.parse(oldData);

    const oldDataToSend: storedOldDataType = Object.entries(parsedData).map(
      ([date, subject]) => {
        return {
          date: date.substring(0, 10),
          subject: String(subject),
        };
      }
    );
    const finsihedData: oldDataType = [];
    oldDataToSend.forEach(async (entry) => {
      finsihedData.push({ date: entry.date, subject: entry.subject });
      await incrementHoursByOne(entry.subject);
      await UnsendData.addUnSendSubject(entry.subject, entry.date);
    });
    console.log(finsihedData);
    return finsihedData;
  } else {
    console.log("No old data");
  }
  return null;
}
