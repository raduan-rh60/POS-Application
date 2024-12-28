import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ApexChart, ChartComponent, ApexDataLabels, ApexLegend, ApexStroke, ApexTooltip, ApexAxisChartSeries, ApexPlotOptions, NgApexchartsModule, ApexFill } from 'ng-apexcharts';
import { OrderService } from "../../pages/product-sales/generate-sale/service/order.service";
import { FormsModule } from "@angular/forms";

export interface revenueForecastChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
}

interface month {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-revenue-forecast',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule, FormsModule],
  templateUrl: './revenue-forecast.component.html',
})
export class AppRevenueForecastComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenueForecastChart!: Partial<revenueForecastChart> | any;
  year: number = new Date().getFullYear(); // Default to the current year
  earningData: any = Array(12).fill(0); // Initialize with zeros (12 months)
  years: number[] = [2024, 2023, 2022, 2021, 2020]; // List of years for the dropdown
  maxEarning:number;


  constructor(private orderService: OrderService) {

    this.getData();
    console.log("Earning Data Value"+this.maxEarning)
    this.revenueForecastChart = {
      series: [
        {
          name: 'Earning this month',
          // data: [this.earningData],
          data: [5000,5,5900,58,0,0,0,0,0,0,0,0],
        },
        {
          name: 'Expenses this month',
          data: [-7000, -20000, -65000, -50000, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],

      chart: {
        type: 'bar',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        height: 295,
        stacked: true,
        offsetX: -15,
        toolbar: {
          show: false,
        },
      },
      colors: ['rgba(99, 91, 255, 1)', 'rgba(255, 102, 146, 1)'],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '60%',
          columnWidth: '15%',
          borderRadius: [6],
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
        },
        borderColor: 'rgba(0,0,0,0.05)',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },

      yaxis: {
        min: -8000,
        max: this.maxEarning ,
        tickAmount: 4,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: { fontSize: '13px', colors: '#adb0bb', fontWeight: '400' },
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };

  }

  // Method to map the month names to indices
  getMonthIndex(month: string): number {
    const monthMap: { [key: string]: number } = {
      'jan': 0,
      'feb': 1,
      'mar': 2,
      'apr': 3,
      'may': 4,
      'jun': 5,
      'jul': 6,
      'aug': 7,
      'sep': 8,
      'oct': 9,
      'nov': 10,
      'dec': 11,
    };

    return monthMap[month.toLowerCase()] || -1; // Return -1 if the month is not found
  }

  getData() {
    this.orderService.getSalesByYearAndMonth().subscribe((res: any[]) => {
      console.log('API Response:', res);  // Log the API response for inspection

      // Initialize the earningData array with zeros (12 months)
      this.earningData = Array(12).fill(0);

      // Go through the response and update earningData for the selected year
      res.forEach((yearData) => {
        console.log('Processing year data:', yearData); // Log each yearData entry
        const year = yearData.year;  // Extract the year
        const monthData = yearData.monthData;  // Extract the monthData object

        if (year === this.year) {
          // Process each month in the monthData object
          for (const month in monthData) {
            const monthIndex = parseInt(month) - 1;  // Convert month to 0-based index
            const totalAmount = monthData[month];  // Get the total amount for the month

            // Check if the monthIndex is valid
            if (monthIndex >= 0 && monthIndex < 12) {
              this.earningData[monthIndex] = totalAmount; // Set the total amount for the specific month
            }
          }
        }
      });
      this.maxEarning = this.earningData.length > 0
        ? Math.max(...this.earningData.filter((value: number) => value != null && value !== 0))
        : 10000;
      console.log('Updated Earning max:',  this.maxEarning ); // Log the populated earningData
      this.updateChart(); // Update the chart with the new data
    });
  }

  // Update chart data and render
  updateChart() {
    this.revenueForecastChart = {
      ...this.revenueForecastChart,
      series: [
        {
          name: 'Earning this month',
          data: this.earningData,
        },
        {
          name: 'Expenses this month',
          data: [-70, -20, -650, -500, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      yaxis: {
        min: -8000,
        max: this.maxEarning +5000, // Set the maximum value here
        tickAmount: 4,
      },
    };
  }

  // Method to handle year selection change
  onYearChange(selectedYear: number) {
    this.year = selectedYear;
    this.getData(); // Fetch new data based on the selected year
  }
}
