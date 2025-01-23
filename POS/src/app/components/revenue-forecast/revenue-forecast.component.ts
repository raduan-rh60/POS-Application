import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ApexChart, ChartComponent, ApexDataLabels, ApexLegend, ApexStroke, ApexTooltip, ApexAxisChartSeries, ApexPlotOptions, NgApexchartsModule, ApexFill } from 'ng-apexcharts';
import { OrderService } from "../../pages/product-sales/generate-sale/service/order.service";
import { FormsModule } from "@angular/forms";
import { PurchaseService } from 'src/app/pages/product-sales/purchase-list/service/purchase.service';

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
  expensesData: any = Array(12).fill(0); // Initialize with zeros (12 months)
  years: number[] = []; // List of years for the dropdown
  maxEarning:number;
  maxExpense:number;


  constructor(private orderService: OrderService,private purchaseService:PurchaseService) {
    this.updateYears();
    this.getData();
    console.log("Earning Data Value"+this.maxEarning)
    this.revenueForecastChart = {
      series: [
        {
          name: 'Earning this month',
          // data: [this.earningData],
          data: [0,0,0,0,0,0,0,0,0,0,0,0],
        },
        {
          name: 'Expenses this month',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

  updateYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 4 }, (_, i) => currentYear - i);
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
    // Fetch sales data
    this.orderService.getSalesByYearAndMonth().subscribe((res: any[]) => {
      this.earningData = Array(12).fill(0); // Reset to zero for new data
  
      res.forEach((yearData) => {
        if (yearData.year === this.year) {
          const monthData = yearData.monthData;
          for (const month in monthData) {
            const monthIndex = parseInt(month) - 1; // Convert month to array index
            this.earningData[monthIndex] = monthData[month];
          }
        }
      });
      this.calculateMaxValues(); // Ensure calculations happen after updating data
    });
  
    // Fetch purchase data
    this.purchaseService.getYearMonthData().subscribe((res: any[]) => {
      this.expensesData = Array(12).fill(0); // Reset to zero for new data
  
      res.forEach((yearData) => {
        if (yearData.year === this.year) {
          const monthData = yearData.monthData;
          for (const month in monthData) {
            const monthIndex = parseInt(month) - 1;
            this.expensesData[monthIndex] = -monthData[month]; // Set expense as negative
          }
        }
      });
      this.calculateMaxValues(); // Ensure calculations happen after updating data
    });
  }
  
  // Helper method to calculate max values and update chart
  calculateMaxValues() {
    // Calculate max earning and expense
    this.maxEarning = Math.max(...this.earningData.filter((v: number) => v !== 0));
    this.maxExpense = Math.min(...this.expensesData.filter((v: number) => v !== 0));
  
    // Update chart
    this.updateChart();
  }
  

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
          data: this.expensesData,
        },
      ],
      yaxis: {
        min: this.maxExpense - 5000,
        max: this.maxEarning + 5000, // Adjusted for the new maximum
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
