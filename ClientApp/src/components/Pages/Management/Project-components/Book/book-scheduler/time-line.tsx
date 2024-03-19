import React, { useEffect, useRef, useState } from "react";
import { staffData } from "./dataSource";

interface Project {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  bgColor: string;
}

interface Staff {
  id: number;
  name: string;
  projects: Project[];
}

interface TimeLineInterFace {
  index: number;
  day: string;
}

interface MonthInterface {
  key: string;
  value: number;
}

const BookScheduleTimeLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeline, setTimeline] = useState<TimeLineInterFace[]>([]);
  const [monthValue, setMonthValue] = useState<number>(new Date().getMonth());
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  const months: MonthInterface[] = [
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
  ];

  useEffect(() => {
    const newTimeline: TimeLineInterFace[] = [];
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    if (monthValue !== undefined) {
      const nextMonthDate = new Date(Date.UTC(currentYear, monthValue, 1));
      nextMonthDate.setUTCHours(nextMonthDate.getUTCHours() + 7);
      nextMonthDate.setUTCMonth(nextMonthDate.getUTCMonth() + 1);
      nextMonthDate.setUTCDate(nextMonthDate.getUTCDate() - 1);
      const numberOfDays = nextMonthDate.getUTCDate();

      for (let index = 1; index <= numberOfDays; index++) {
        const currentDateOfMonth = new Date(
          Date.UTC(currentYear, monthValue, index)
        );

        const dayIndex = currentDateOfMonth.getUTCDay();
        const dayName = daysOfWeek[dayIndex];

        newTimeline.push({
          index: index,
          day: dayName,
        });
      }
      setTimeline(newTimeline);
    }
  }, [monthValue]);

  const handleMonthOnChange = (value: string) => {
    setMonthValue(parseInt(value));
  };

  return (
    <>
      <div className="w-full overflow-x-auto p-10 space-y-4">
        <div className="w-24">
          <select
            value={monthValue}
            onChange={(e) => handleMonthOnChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {months.map((item) => (
              <option key={item.key} value={item.value}>
                {item.key}
              </option>
            ))}
          </select>
        </div>
        <CanvasWithTooltip
          timeline={timeline}
          monthValue={monthValue}
          staffData={staffData}
        />
      </div>
    </>
  );
};

const CanvasWithTooltip: React.FC<{
  timeline: TimeLineInterFace[];
  monthValue: number;
  staffData: Staff[];
}> = ({ timeline, monthValue, staffData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX - canvas.getBoundingClientRect().left;
      const mouseY = e.clientY - canvas.getBoundingClientRect().top;
      staffData.forEach((staff, staffIndex) => {
        const y = (staffIndex + 2) * 60;
        staff.projects.forEach((project) => {
          const startDateIndex = parseInt(project.startDate.split("-")[2]);
          const endDateIndex = parseInt(project.endDate.split("-")[2]);
          const startX = startDateIndex * 100;
          const endX = endDateIndex * 100;
          if (
            mouseX >= startX &&
            mouseX <= endX &&
            mouseY >= y - 1 &&
            mouseY <= y + 35
          ) {
            setTooltip(project.name);
            console.log(project.name);
          }
        });
      });
    };
    // Draw canvas content
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barHeight = 50; // Height of the timeline bars
    ctx.font = "14px Arial";
    timeline.forEach((day, index) => {
      const x = (index + 2) * 100;
      const y = 50; // Starting y position
      ctx.fillText(day.index.toString(), x + 20, y + 20); // Draw day number
      ctx.fillText(day.day, x + 40, y + 20); // Draw day name
      ctx.strokeStyle = "black"; // Border color
      const borderWidth = 0.1; // Adjust this value as needed
      const borderRadius = 1; // A
      ctx.lineWidth = borderWidth; // Border width
      const width = staffData.length * 100; // Example rectangle width
      const height = staffData.length * 100;
      // Draw rectangle with rounded corners
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + width - borderRadius, y);
      ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
      ctx.lineTo(x + width, y + height - borderRadius);
      ctx.arcTo(
        x + width,
        y + height,
        x + width - borderRadius,
        y + height,
        borderRadius
      );
      ctx.lineTo(x + borderRadius, y + height);
      ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
      ctx.stroke();
    });

    staffData.forEach((staff, staffIndex) => {
      const y = (staffIndex + 2) * 60;
      ctx.fillText(staff.name, 20, y + 10); // Draw staff name with left alignment

      staff.projects.forEach((project) => {
        const startDateIndex = parseInt(project.startDate.split("-")[2]);
        const endDateIndex = parseInt(project.endDate.split("-")[2]);
        const startX = (startDateIndex + 1) * 100;
        const endX = (endDateIndex + 1) * 100;
        ctx.fillStyle = project.bgColor; // Change color if needed
        ctx.fillRect(startX, y - barHeight / 10, endX - startX, barHeight); // Draw project bar
        ctx.fillStyle = "black";

      
        // Adjust x-coordinate for left alignment
        const textX = startX + 5; // Adjust this value as needed
        ctx.fillText(project.name, textX, y + barHeight / 2); // Draw project name with left alignment
      });
    });
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [timeline, staffData]);
  return (
    <>
      <canvas
        ref={canvasRef}
        width={timeline.length * 100}
        height={staffData.length * 200}
        className="border p-4 bg-white"
      ></canvas>
      {tooltip && (
        <div className="absolute p-2 bg-gray-800 text-white rounded-lg shadow-md z-10 top-0 left-2/4">
          {tooltip}
        </div>
      )}
    </>
  );
};

export default BookScheduleTimeLine;
