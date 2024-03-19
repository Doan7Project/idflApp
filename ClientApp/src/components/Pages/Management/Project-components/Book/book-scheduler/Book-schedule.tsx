import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface TimeLineInterFace {
  index: any;
  day: any;
}
interface MonthInterface {
  key: string;
  value: number;
}
export const BookSchedule = () => {
  const [timeline, setTimeline] = useState<TimeLineInterFace[]>([]);
  const [colorBar, setcolorBar] = useState("");
  const [monthValue, setMonthValue] = useState<number | undefined>(
    new Date().getMonth()
  );
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const [months, setMonths] = useState<MonthInterface[]>([
    { key: "Jan", value: 0 },
    { key: "Feb", value: 1 },
    { key: "Mar", value: 2 },
    { key: "Apr", value: 3 },
    { key: "May", value: 4 },
    { key: "Jun", value: 5 },
    { key: "Jul", value: 6 },
    { key: "Aug", value: 7 },
    { key: "Sep", value: 8 },
    { key: "Oct", value: 9 },
    { key: "Nov", value: 10 },
    { key: "Dec", value: 11 },
  ]);
  const currentDate = new Date();
  const currentYear = currentDate.getUTCFullYear();
  // Set the date to the first day of the next month
  useEffect(() => {
    if (monthValue !== undefined) {
      const newTimeline: TimeLineInterFace[] = [];
      const nextMonthDate = new Date(Date.UTC(currentYear, monthValue, 1));
      // Adjust for Vietnam's UTC+7 offset
      nextMonthDate.setUTCHours(nextMonthDate.getUTCHours() + 7);
      nextMonthDate.setUTCMonth(nextMonthDate.getUTCMonth() + 1);
      nextMonthDate.setUTCDate(nextMonthDate.getUTCDate() - 1);
      const numberOfDays = nextMonthDate.getUTCDate();
      console.log(numberOfDays);
      for (let index = 1; index <= numberOfDays; index++) {
        const currentDateOfMonth = new Date(
          Date.UTC(currentYear!, monthValue, index)
        );

        // Get the day of the week for the current date
        const dayIndex = currentDateOfMonth.getUTCDay();

        // Get the name of the day based on the day of the week
        const dayName = daysOfWeek[dayIndex];

        newTimeline.push({
          index: index,
          day: dayName,
        });
      }
      setTimeline(newTimeline);
    }
  }, [monthValue, currentYear]);
  const handleMonthOnchange = (value: any) => {
    setMonthValue(value);
  };
  return (
    <>
      <div className="w-full overflow-x-auto p-10 space-y-4">
        <div className="w-24">
          <select
            value={monthValue}
            onChange={(e) => handleMonthOnchange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {months.map((items: any, index: any) => (
              <option key={index} value={items.value}>
                {items.key}
              </option>
            ))}
          </select>
        </div>
        <table className="table-auto border">
          <thead>
            <tr>
              <th className="border">
                <div className="w-40">
                  <h6>Staff Name</h6>
                </div>
              </th>
              {timeline.map((items: any, index: any) => (
                <th key={index} className="p-2 border">
                  <div className="w-16">
                    <h5>{items.index}</h5>
                    <h6 className="font-light">{items.day}</h6>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-start px-3">
                <h6 className="text-gray-600 font-light">Pham Anh Doan</h6>
              </td>
              {timeline.map((items: any, index: any) => (
                <td key={index} className="border w-full relative">
                  {items.index >= 3 && items.index <= 6 && (
                    <div className="w-full h-7 bg-green-600">
                      {index === 2 && <h1 className="absolute w-full left-10">text</h1>}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
