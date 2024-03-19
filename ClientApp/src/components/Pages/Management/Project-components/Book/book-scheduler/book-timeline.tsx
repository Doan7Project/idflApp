import { Scheduler, SchedulerProjectData } from "@bitnoi.se/react-scheduler";
import { useCallback, useEffect, useState } from "react";
import "./book-timeline.css"
import ServiceBook from "services/service-book";
interface ParsedDatesRange {
  startDate: Date;
  endDate: Date;
}
const BookTimeSchedule: React.FC = () => {
  var resources = ServiceBook()
  console.log("fetching data: ", resources)
  const [range, setRange] = useState<ParsedDatesRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [filterButtonState, setFilterButtonState] = useState(0);
  const handleRangeChange = useCallback((range: ParsedDatesRange) => {
    setRange(range);
  }, []);
  const handleTitleClick = (data: SchedulerProjectData) => {
    alert(`item ${data.title} + description: ${data.description}`);
  };
  return (
    <>
      <div>
        <Scheduler
          data={resources}
          isLoading={false}
          onRangeChange={handleRangeChange}
          onTileClick={handleTitleClick}
          onFilterData={() => {
            // Some filtering logic...
            setFilterButtonState(1);
          }}
          onClearFilterData={() => {
            // Some clearing filters logic...
            setFilterButtonState(0)
          }}
          onItemClick={(data) =>
            alert(
              "Item was click" +
              "" +
              data.label.title +
              "" +
              data.label.subtitle
            )
          }
          config={{
            zoom: 1,
            lang: "en",
            maxRecordsPerPage: 10,
            filterButtonState: -1,
            includeTakenHoursOnWeekendsInDayView: true,
          }}
        />
      </div>
    </>
  );
};
export default BookTimeSchedule;
