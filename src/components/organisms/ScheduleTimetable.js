import React, { useState, useEffect } from "react";
import * as scheduleAPI from "../../api/scheduleAPI";
import { time2dec } from "../../utils/time";
import Timetable from "react-timetable-events";
import moment from "moment";

const ScheduleTimetable = () => {
  // const router = useRouter();
  const [schedules, setSchedules] = useState([]);
  const [events, setEvents] = useState({
    Routine: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom-hello",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00"),
      },
    ],
  });

  useEffect(() => {
    scheduleAPI
      .getAll()
      .then((response) => {
        setSchedules(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log(moment("2018-02-23T11:30:00"));
    const newEvents = { Routine: [] };
    let index = 1;
    schedules
      .sort((a, b) => time2dec(a.startTime) - time2dec(b.startTime))
      .map((schedule) => {
        console.log(schedule.startTime);
        const newEvent = {
          id: schedule.id,
          name: schedule.name,
          type: "custom",
          startTime: moment("2018-02-23T" + schedule.startTime),
          endTime: moment("2018-02-23T" + schedule.endTime),
        };
        newEvents.Routine.push(newEvent);
        index = index + 1;
      });
    setEvents(newEvents);
  }, [schedules]);

  return (
    <div>
      <Timetable events={events} hoursInterval={[0, 24]} />
    </div>
  );
};

export default ScheduleTimetable;
