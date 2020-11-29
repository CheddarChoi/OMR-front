import React, { useState, useEffect } from "react";
import * as scheduleAPI from "../../api/scheduleAPI";
import { PieChart } from "react-minimal-pie-chart";
import { time2dec } from "../../utils/time";
import Header from "../organisms/Header";

const ScheduleChart = () => {
  // const router = useRouter();
  const [schedules, setSchedules] = useState([]);
  const [chartData, setChartData] = useState([]);

  const colors = ["#563E2E", "#D77C37", "#FCECBA", "#88C5AF", "#E9A345"];

  useEffect(() => {
    scheduleAPI
      .getAll()
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    let index = 0;
    let chartData = [];
    let currTime = 0;
    let time = 0;
    if (schedules) {
      schedules
        .sort((a, b) => time2dec(a.startTime) - time2dec(b.startTime))
        .map((schedule) => {
          index += 1;
          time = time2dec(schedule.startTime);
          console.log(time2dec(schedule.startTime));
          if (currTime !== time) {
            let newPaddingData = {
              title: "",
              value: time - currTime,
              color: "#eeeeee",
            };
            chartData.push(newPaddingData);
          }
          let newChartData = {
            title: schedule.name,
            value: time2dec(schedule.endTime) - time,
            color: colors[index % 5],
          };
          chartData.push(newChartData);
          console.log(time2dec(schedule.endTime) - time);
          currTime = time2dec(schedule.endTime);
        });
      setChartData(chartData);
    }
  }, [schedules]);

  return (
    <div>
      <Header />
      <div className="w-50">
        <PieChart startAngle={270} totalValue={24} data={chartData} />
      </div>
    </div>
  );
};

export default ScheduleChart;
