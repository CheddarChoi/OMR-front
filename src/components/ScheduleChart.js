import React, { Component, useState, useEffect } from "react";
import scheduleAPI from "../api/scheduleAPI";
import { Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

const ScheduleChart = () => {
  // const router = useRouter();
  const [schedules, setSchedules] = useState([]);
  const [chartData, setChartData] = useState([]);

  const colors = ["#563E2E", "#D77C37", "#FCECBA", "#88C5AF", "#E9A345"];

  function hm2dec(hoursMinutes) {
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return (hours + minutes / 60).toFixed(2);
  }

  function time2dec(tIn) {
    if (tIn == "") return 0;
    if (tIn.indexOf("h") >= 0 || tIn.indexOf(":") >= 0)
      return hm2dec(tIn.split(/[h:]/));
    if (tIn.indexOf("m") >= 0) return hm2dec([0, tIn.replace("m", "")]);
    if (tIn.indexOf(",") >= 0)
      return parseFloat(tIn.split(",").join(".")).toFixed(2);
    if (tIn.indexOf(".") >= 0) return parseFloat(tIn);
    return parseInt(tIn, 10);
  }

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
    <div className="w-50">
      <PieChart startAngle={270} totalValue={24} data={chartData} />
    </div>
  );
};

export default ScheduleChart;

// export default class ScheduleList extends Component {
//   constructor(props) {
//     super(props);
//     this.retrieveSchedule = this.retrieveSchedule.bind(this);
//     this.refreshList = this.refreshList.bind(this);
//     this.changeToPieChartData = this.changeToPieChartData.bind(this);

//     this.state = {
//       schedules: [],
//       chartData: [],
//       currentSchedule: null,
//       currentIndex: -1,
//       searchName: "",
//     };
//   }

//   componentDidMount() {
//     this.retrieveSchedule();
//   }

//   retrieveSchedule() {
//     scheduleAPI
//       .getAll()
//       .then((response) => {
//         this.setState({
//           schedules: response.data,
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//       })
//       .then(this.changeToPieChartData());
//   }

//   refreshList() {
//     this.retrieveSchedule();
//     this.setState({
//       currentSchedule: null,
//       currentIndex: -1,
//     });
//   }

//   changeToPieChartData() {
//     console.log(this.schedules);
//     let currTime = 0;
//     if (this.schedules) {
//       this.schedules.map((schedule) => {
//         console.log(schedule);
//       });
//     }
//   }

//   render() {
//     const { schedules } = this.state;

//     return (
//       <div className="w-50">
//         <PieChart
//           startAngle={270}
//           totalValue={24}
//           data={[
//             { title: "One", value: 10, color: "#E38627" },
//             { title: "Two", value: 5, color: "#C13C37" },
//             { title: "Three", value: 9, color: "#6A2135" },
//           ]}
//         />
//       </div>
//     );
//   }
// }
