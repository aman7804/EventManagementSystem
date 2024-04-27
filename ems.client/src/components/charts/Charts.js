// import {Chart} from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// class Charts {
//   constructor() {
//     this.firstInit = true;
//     this.colors = {
//       primary: 'rgb(23, 150, 243)',
//       success: 'rgb(76, 175, 80)',
//       warning: 'rgb(255, 193, 7)',
//       danger: 'rgb(255, 23, 68)',
//       grayLight: 'rgb(238, 238, 238)',
//       grayDark: 'rgb(158, 158, 158)'
//     };
//   }

//   setGlobalOptions() {
//     // setting the responsive mode to true by default
//     Chart.defaults.global.responsive = true;

//     // setting the axes color and padding
//     Chart.defaults.line.scales.xAxes[0].gridLines =
//       Chart.defaults.line.scales.yAxes[0].gridLines =
//       Chart.defaults.bar.scales.xAxes[0].gridLines =
//       Chart.defaults.bar.scales.yAxes[0].gridLines =
//       Chart.defaults.horizontalBar.scales.xAxes[0].gridLines =
//       Chart.defaults.horizontalBar.scales.yAxes[0].gridLines = {
//         tickMarkLength: 20,
//         color: this.colors.grayLight,
//         zeroLineColor: 'transparent'
//       };

//     // setting the padding and label color for the yAxes (these don't have a tickMarkLength)
//     Chart.defaults.line.scales.yAxes[0].ticks =
//       Chart.defaults.bar.scales.yAxes[0].ticks = {
//         padding: 16,
//         fontColor: this.colors.grayDark
//       };

//     // setting the padding and label color for the xAxes (these don't have a tickMarkLength)
//     Chart.defaults.line.scales.xAxes[0].ticks =
//       Chart.defaults.bar.scales.xAxes[0].ticks = {
//         padding: 8,
//         fontColor: this.colors.grayDark
//       };

//     // hover settings for the line charts
//     Chart.defaults.line.hover.mode = 'nearest';
//     Chart.defaults.line.hover.intersect = true;

//     // tooltips settings for the line charts
//     Chart.defaults.line.tooltips = {
//       mode: 'index',
//       intersect: false
//     };

//     // setting the color of the polar area's grid lines to be the same as the x and y axes of the line and bar charts
//     Chart.defaults.polarArea.scale.gridLines.color = this.colors.grayLight;
//     Chart.defaults.polarArea.scale.angleLines.color = this.colors.grayLight;

//     /**
//      * setting the color of the radar's grid and angle lines to be the same as the x and y axes of the line
//      * and bar charts
//      */
//     Chart.defaults.radar.scale.gridLines =
//       Chart.defaults.radar.scale.angleLines = {
//         color: this.colors.grayLight
//       };

//     // setting the legend label's color
//     Chart.defaults.global.legend.labels.fontColor = this.colors.grayDark;
//   }
//   // new code
//   // setGlobalOptions() {
//   //   // setting the responsive mode to true by default
//   //   Chart.defaults.responsive = true;
  
//   //   // setting the axes color and padding
//   //   Chart.register(ChartDataLabels, ChartDataLabels);
  
//   //   // setting the padding and label color for the yAxes (these don't have a tickMarkLength)
//   //   Chart.defaults.scales.y.ticks = {
//   //     padding: 16,
//   //     color: this.colors.grayDark
//   //   };
  
//   //   // setting the padding and label color for the xAxes (these don't have a tickMarkLength)
//   //   Chart.defaults.scales.x.ticks = {
//   //     padding: 8,
//   //     color: this.colors.grayDark
//   //   };
  
//   //   // hover settings for the line charts
//   //   Chart.defaults.interaction.mode = 'nearest';
//   //   Chart.defaults.interaction.intersect = true;
  
//   //   // tooltips settings for the line charts
//   //   Chart.defaults.plugins.tooltip.mode = 'index';
//   //   Chart.defaults.plugins.tooltip.intersect = false;
  
//   //   // setting the color of the polar area's grid lines to be the same as the x and y axes of the line and bar charts
//   //   Chart.defaults.plugins.legend.labels.color = this.colors.grayDark;
//   // }


//   createChart(canvas, options) {
//     if (!canvas) {
//       throw new Error('The chart\'s canvas couldn\'t be found in the DOM.');
//     }

//     if (this.firstInit) {
//       this.setGlobalOptions();
//       this.firstInit = false;
//     }

//     return new Chart(canvas.getContext('2d'), options);
//   }
  
//   // new code
//   // createChart(canvas, options) {
//   //   if (!canvas) {
//   //     throw new Error('The chart\'s canvas couldn\'t be found in the DOM.');
//   //   }
  
//   //   if (this.firstInit) {
//   //     this.setGlobalOptions();
//   //     this.firstInit = false;
//   //   }
  
//   //   return new Chart(canvas, options);
//   // }


//   init() {
//     // init bar chart
//     const barChartCanvas = document.getElementById('barChart');
//     if (barChartCanvas) {
//       this.createChart(barChartCanvas, {
//         type: 'bar',
//         data: {
//           labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
//           datasets: [
//             {
//               label: 'Revenue (K)',
//               data: [7, 10, 28, 14, 35, 40, 24, 16],
//               backgroundColor: this.colors.primary
//             }
//           ]
//         },
//         options: {
//           legend: {
//             display: false
//           },
//           scales: {
//             xAxes: [{
//               barPercentage: 0.7
//             }]
//           }
//         }
//       });
//     }
//   }
//   // new code
//   // init() {
//   //   // init bar chart
//   //   const barChartCanvas = document.getElementById('barChart');
//   //   if (barChartCanvas) {
//   //     Chart.register(ChartDataLabels, ChartDataLabels);
//   //     this.createChart(barChartCanvas, {
//   //       type: 'bar',
//   //       data: {
//   //         labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'],
//   //         datasets: [
//   //           {
//   //             label: 'Revenue (K)',
//   //             data: [7, 10, 28, 14, 35, 40, 24, 16],
//   //             backgroundColor: this.colors.primary
//   //           }
//   //         ]
//   //       },
//   //       options: {
//   //         plugins: {
//   //           legend: {
//   //             display: false
//   //           },
//   //           tooltip: {
//   //             mode: 'index',
//   //             intersect: false
//   //           }
//   //         },
//   //         scales: {
//   //           x: {
//   //             barPercentage: 0.7
//   //           }
//   //         }
//   //       }
//   //     });
//   //   }
//   // }

// }

// export default Charts;
