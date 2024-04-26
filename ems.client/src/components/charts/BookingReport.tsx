import "../cards/style.css";
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import DateObject from "react-date-object";
import { EnumBookingReportType } from "utils/enums";

export type BookingReportProps = {
  data: number[] | undefined,
  onReportTypeChange: (enumBookingReportType: EnumBookingReportType) => void
}

const BookingReport: React.FC<BookingReportProps> = (props) => {
  const {data } = props;
  const [reportAxis, setReportAxis] = useState<string[]>([]);
  
  useEffect(() => {
    refreshReport("Monthly");
  })
  
  const onChartTypeChange = (event: any) => {
    refreshReport(event.target.value);
  }

  const refreshReport = (reportType: string) => {
    let currentDate = new DateObject();
    const { onReportTypeChange } = props;
    const axis = [];
    switch (reportType) {
      case "Daily":
        for (let i=1; i<8; i++) {
          currentDate.day -= 1;
          axis.push(currentDate.format())
        }
        onReportTypeChange( EnumBookingReportType.daily);
        break;
        
      case "Weekly":
        currentDate = currentDate.toFirstOfWeek();
        for (let i=1; i<8; i++) {
          currentDate.day -= 7;
          axis.push(currentDate.format())
        }
        onReportTypeChange( EnumBookingReportType.weekly);
        break;

      case "Monthly":
        currentDate = currentDate.toFirstOfMonth();
        let currentMonth = currentDate.month.number;
        for (let i=1; i<7; i++) {
          currentDate.setMonth(currentMonth);
          axis.push(currentDate.format("MMM-YYYY"))
          currentMonth -= 1;
        }
        onReportTypeChange( EnumBookingReportType.monthly);
        break;

      case "Yearly":
        currentDate = currentDate.toFirstOfMonth();
        for (let i=0; i<5; i++) {
          axis.push(currentDate.format("YYYY"))
          currentDate.year -= 1;
        }
        onReportTypeChange( EnumBookingReportType.yearly);
        break;
    }

    setReportAxis(axis.reverse());
  }
    
  return (
    <>  
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-4">
            <h2 className="mb-0 text-md">Bookings Report</h2>
            <div className="form-group mb-0">
              <label htmlFor="barChartFilter" className="sr-only">Filter revenue</label>
              <select className="custom-select" id="barChartFilter" onChange={onChartTypeChange}>
                <option disabled>Filter revenue</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option selected>Monthly</option>
                <option>Yearly</option>
              </select>
            </div> 
          </div> 
          <BarChart
            xAxis={[{ scaleType: 'band', data: reportAxis }]}
            series={[{data}]}
            height={300}
          />
        </div>
      </div>
    </>
  );
}

export default BookingReport;
