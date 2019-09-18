import {AfterContentInit, Component} from '@angular/core';
import * as d3 from 'd3';

interface BallGraphConfiguration {
  radius: number;
  outlineStrokeWidth: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterContentInit {
  title = 'untitled';

  horzBar(graphs) {
    const fibonacciNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    const rows = graphs
      .selectAll('p')
      .data(fibonacciNumbers)
      .enter()
      .append('p')
      .style('display', 'flex');
    rows
      .append('div')
      .style('background', 'black')
      .style('color', 'white')
      .style('width', '20px')
      .style('text-align', 'center')
      .text((datum) => datum);

    rows
      .append('div')
      .style('background', 'red')
      .style('width', (datum) => datum + 'px')
      .html('&nbsp;');
  }

  vertBar(graphs) {
    const fibonacciNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    const vertWidth = 500;
    const vertHeight = 100;
    const vertGraph = graphs
      .append('svg')
      .attr('width', vertWidth)
      .attr('height', vertHeight);
    const barPadding = 5;
    const barWidth = vertWidth / fibonacciNumbers.length;

    vertGraph
      .selectAll('rect')
      .data(fibonacciNumbers)
      .enter()
      .append('rect')
      .attr('y', (datum) => vertHeight - datum)
      .attr('height', (datum) => datum)
      .attr('width', barWidth - barPadding)
      .attr('transform', (datum, index) => 'translate(' + [barWidth * index, 0] + ')');
  }

  vertBarWithAxis(graphs) {
    // const fibonacciNumbers = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    // const vertWidth = 500;
    // const vertHeight = 100;
    // const vertGraph = graphs
    //   .append('svg')
    //   .attr('width', vertWidth)
    //   .attr('height', vertHeight);
    // const barPadding = 5;
    // const barWidth = vertWidth / fibonacciNumbers.length;
    //
    // vertGraph
    //   .selectAll('rect')
    //   .data(fibonacciNumbers)
    //   .enter()
    //   .append('rect')
    //   .attr('y', (datum) => vertHeight - datum)
    //   .attr('height', (datum) => datum)
    //   .attr('width', barWidth - barPadding)
    //   .attr('transform', (datum, index) => 'translate(' + [barWidth * index, 0] + ')');
    //
    // // this bit with the axis is cool but requires some offsetting to get things pretty
    // const xScale = d3.scaleLinear().domain([0, d3.max(fibonacciNumbers)]).range([0, vertWidth]);
    // const xAxis = d3.axisBottom().scale(xScale);
    // const yScale = d3.scaleLinear().domain([0, d3.max(fibonacciNumbers)]).range([vertHeight, 0]);
    // const yAxis = d3.axisLeft().scale(yScale);
    // vertGraph
    //   .append('g')
    //   .attr('transform', 'translate(20,0)')
    //   .call(yAxis);
    // const xAxisTranslate = vertHeight - 20;
    // vertGraph
    //   .append('g')
    //   .attr('transform', 'translate(20, ' + xAxisTranslate + ')')
    //   .call(xAxis);
  }

  linesAndStuff(graphs) {
    const lgWidth = 500;
    const lgHeight = 500;
    const lineGraph = graphs
      .append('svg')
      .attr('width', lgWidth)
      .attr('height', lgHeight)
      .attr('class', 'lineGraph')
      .style('background', 'black');
    // const firstLine =
    lineGraph
      .append('line')
      .attr('x1', 100)
      .attr('x2', 400)
      .attr('y1', 100)
      .attr('y2', 100)
      .attr('stroke', 'red')
      .attr('stroke-width', 5);
    // const rect =
    lineGraph
      .append('rect')
      .attr('x', 125)
      .attr('y', 125)
      .attr('width', 200)
      .attr('height', 200)
      .attr('fill', '#9B96FF')
      .attr('transform', 'skewY(30)');
    // const circle =
    lineGraph
      .append('circle')
      .attr('cx', 250)
      .attr('cy', 250)
      .attr('r', 75)
      .attr('fill', '#7CE8D5');
  }

  pieChart(graphs) {
    // const pieData = [
    //   {platform: 'Android', percentage: 40.11},
    //   {platform: 'Windows', percentage: 36.69},
    //   {platform: 'iOS', percentage: 13.06}
    // ];
    // const pieWidth = 250;
    // const pieHeight = 250;
    // const radius = Math.min(pieWidth, pieHeight) / 2;
    // const pieChart = graphs
    //   .append('svg')
    //   .attr('width', pieWidth)
    //   .attr('height', pieHeight);
    // const group = pieChart
    //   .append('g')
    //   .attr('transform', 'translate(' + radius + ',' + radius + ')');
    // const color = d3.scaleOrdinal(d3.schemeCategory10);
    // const pie = d3.pie().value((datum) => datum.percentage);
    // const path = d3.arc().outerRadius(radius).innerRadius(100);
    // const arc = group.selectAll('arc')
    //   .data(pie(pieData))
    //   .enter()
    //   .append('g');
    // arc.append('path')
    //   .attr('d', path)
    //   .attr('fill', (datum) => color(datum.data.percentage));
    // const label = d3.arc().outerRadius(radius).innerRadius(0);
    // arc.append('text')
    //   .attr('transform', (datum) => 'translate(' + label.centroid(datum) + ')')
    //   .attr('text-anchor', 'middle')
    //   .text((datum) => datum.data.platform + ':' + datum.data.percentage + '%');
  }

  firstExperiments(graphs) {
    // this.horzBar(graphs);
    // this.vertBar(graphs);
    // this.vertBarWithAxis(graphs);
    // this.linesAndStuff(graphs);
    // this.pieChart(graphs);
  }

  liveBTC() {
    // live bitcoin data example
    // const btcFeedUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018 -  01 -  01&end=2019 -  01 -  01';
    //
    // function drawChart_orig(data) {
    //   const chartWidth = 500;
    //   const chartHeight = 500;
    //   const margin = {top: 20, right: 20, bottom: 30, left: 50};
    //   const width = chartWidth  -   margin.left  -   margin.right;
    //   const height = chartHeight  -   margin.top  -   margin.bottom;
    //
    //   const chart = graphs.append('svg')
    //     .attr('width', chartWidth)
    //     .attr('height', chartHeight);
    //
    //   // tslint:disable -  next -  line:no -  shadowed -  variable
    //   const group = chart.append('g')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  margin.top  +  ')');
    //
    //   const xScaleFunc = d3.scaleTime().rangeRound([0, width]);
    //   const yScaleFunc = d3.scaleLinear().rangeRound([height, 0]);
    //
    //   const drawLineFunc = d3.line()
    //     .x((datum) => xScaleFunc(datum.date))
    //     .y((datum) => yScaleFunc(datum.value));
    //
    //   xScaleFunc.domain(d3.extent(data, (datum) => datum.date));
    //   yScaleFunc.domain(d3.extent(data, (datum) => datum.value));
    //
    //   // the area chart piece
    //   const area = d3.area()
    //     .x((datum) => xScaleFunc(datum.date))
    //     .y0(height)
    //     .y1((datum) => yScaleFunc(datum.value));
    //
    //   // draw the chart
    //   group.append('path')
    //     .datum(data)
    //     .attr('class', 'area')
    //     .attr('d', area)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'black')
    //     .attr('stroke -  linejoin', 'round')
    //     .attr('stroke -  linecap', 'round')
    //     .attr('stroke -  width', 0.5)
    //     .attr('d', drawLineFunc);
    //
    //   // x axis labels
    //   const xAxisGroup = group.append('g')
    //     .attr('transform', 'translate(0,'  +  height  +  ')')
    //     .call(d3.axisBottom(xScaleFunc));
    //   xAxisGroup.selectAll('text')
    //     .attr('fill', 'black');
    //   xAxisGroup
    //     .select('.domain')
    //     .remove();
    //
    //   // y axis label
    //   const yAxisGroup = group.append('g')
    //     .call(d3.axisLeft(yScaleFunc));
    //   yAxisGroup.append('text')  // from here on we are just adding to the axis
    //     .attr('transform', 'rotate( -  90)')
    //     .attr('y', 6)
    //     .attr('dy', '0.71em')
    //     .attr('text-anchor', 'end')
    //     .text('Price ($)');
    //   yAxisGroup.selectAll('text') // note: picks up the appended label too!
    //     .attr('fill', 'black');
    //
    //   // add grid lines
    //   const xTicks = d3.axisBottom(xScaleFunc).ticks(8);
    //   const yTicks = d3.axisLeft(yScaleFunc).ticks(10);
    //   chart
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  (height  +  margin.top)  +  ')')
    //     .call(xTicks.tickSize( -  height).tickFormat(''));
    //   chart
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  margin.top  +  ')')
    //     .call(yTicks.tickSize( -  width).tickFormat(''));
    //
    // }
    //
    // function drawChart_grad(data) {
    //   const chartWidth = 500;
    //   const chartHeight = 500;
    //   const margin = {top: 20, right: 20, bottom: 30, left: 50};
    //   const width = chartWidth  -   margin.left  -   margin.right;
    //   const height = chartHeight  -   margin.top  -   margin.bottom;
    //
    //   const chart = graphs.append('svg')
    //     .attr('width', chartWidth)
    //     .attr('height', chartHeight)
    //     .style('background', 'black');
    //
    //   // tslint:disable -  next -  line:no -  shadowed -  variable
    //   const group = chart.append('g')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  margin.top  +  ')');
    //
    //   const xScaleFunc = d3.scaleTime().rangeRound([0, width]);
    //   const yScaleFunc = d3.scaleLinear().rangeRound([height, 0]);
    //
    //   xScaleFunc.domain(d3.extent(data, (datum) => datum.date));
    //   yScaleFunc.domain(d3.extent(data, (datum) => datum.value));
    //
    //   // a gradient fill
    //   const linearGradient = chart
    //     .append('defs')
    //     .append('linearGradient')
    //     .attr('id', 'steelGradient')
    //     .attr('x1', '0%')
    //     .attr('x2', '100%')
    //     .attr('y1', '0%')
    //     .attr('y2', '100%');
    //
    //   linearGradient
    //     .append('stop')
    //     .attr('offset', '20%')
    //     .style('stop -  color', 'steelblue')
    //     .style('stop -  opacity', 1);
    //
    //   linearGradient
    //     .append('stop')
    //     .attr('offset', '100%')
    //     .style('stop -  color', 'transparent')
    //     .style('stop -  opacity', 1);
    //
    //   // the area chart piece
    //   const area = d3.area()
    //     .x((datum) => xScaleFunc(datum.date))
    //     .y0(height)
    //     .y1((datum) => yScaleFunc(datum.value));
    //
    //   // draw the chart
    //   group.append('path')
    //     .datum(data)
    //     .attr('class', 'area')
    //     .attr('d', area)
    //     .style('fill', 'url(#steelGradient)')
    //     .attr('stroke', 'gray')
    //     .attr('stroke -  dasharray', '5,5')
    //     .attr('stroke -  width', 0.5);
    //
    //   // x axis labels
    //   const xAxisGroup = group.append('g')
    //     .attr('transform', 'translate(0,'  +  height  +  ')')
    //     .call(d3.axisBottom(xScaleFunc));
    //   xAxisGroup.selectAll('text')
    //     .attr('fill', 'white');
    //   xAxisGroup
    //     .select('.domain')
    //     .remove();
    //
    //   // y axis label
    //   const yAxisGroup = group.append('g')
    //     .call(d3.axisLeft(yScaleFunc));
    //   yAxisGroup.append('text')  // from here on we are just adding to the axis
    //     .attr('transform', 'rotate( -  90)')
    //     .attr('y', 6)
    //     .attr('dy', '0.71em')
    //     .attr('text-anchor', 'end')
    //     .text('Price ($)');
    //   yAxisGroup.selectAll('text') // note: picks up the appended label too!
    //     .attr('fill', 'white');
    //
    //   // add grid lines
    //   const xTicks = d3.axisBottom(xScaleFunc).ticks(8); // how to make dynamic?
    //   const yTicks = d3.axisLeft(yScaleFunc).ticks(10); // how to make dynamic?
    //   chart
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  (height  +  margin.top)  +  ')')
    //     .call(xTicks.tickSize( -  height).tickFormat(''));
    //   chart
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  margin.top  +  ')')
    //     .call(yTicks.tickSize( -  width).tickFormat(''));
    // }
    //
    // function drawChart_grad_w_trend(data) {
    //   const chartWidth = 500;
    //   const chartHeight = 500;
    //   const margin = {top: 20, right: 20, bottom: 30, left: 50};
    //   const width = chartWidth  -   margin.left  -   margin.right;
    //   const height = chartHeight  -   margin.top  -   margin.bottom;
    //
    //   const chart = graphs.append('svg')
    //     .attr('width', chartWidth)
    //     .attr('height', chartHeight)
    //     .style('background', 'black');
    //
    //   // tslint:disable -  next -  line:no -  shadowed -  variable
    //   const group = chart.append('g')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  margin.top  +  ')');
    //
    //   const xScaleFunc = d3.scaleTime().rangeRound([0, width]);
    //   const yScaleFunc = d3.scaleLinear().rangeRound([height, 0]);
    //
    //   xScaleFunc.domain(d3.extent(data, (datum) => datum.date));
    //   yScaleFunc.domain(d3.extent(data, (datum) => datum.value));
    //
    //   // a gradient fill
    //   const linearGradient = chart
    //     .append('defs')
    //     .append('linearGradient')
    //     .attr('id', 'steelGradient')
    //     .attr('x1', '0%')
    //     .attr('x2', '100%')
    //     .attr('y1', '0%')
    //     .attr('y2', '100%');
    //
    //   linearGradient
    //     .append('stop')
    //     .attr('offset', '20%')
    //     .style('stop -  color', 'steelblue')
    //     .style('stop -  opacity', 1);
    //
    //   linearGradient
    //     .append('stop')
    //     .attr('offset', '100%')
    //     .style('stop -  color', 'transparent')
    //     .style('stop -  opacity', 1);
    //
    //   // the area chart piece
    //   const area = d3.area()
    //     .x((datum) => xScaleFunc(datum.date))
    //     .y0(height)
    //     .y1((datum) => yScaleFunc(datum.value));
    //
    //   // draw the chart
    //   group.append('path')
    //     .datum(data)
    //     .attr('class', 'area')
    //     .attr('d', area)
    //     .style('fill', 'url(#steelGradient)')
    //     .attr('stroke', 'gray')
    //     .attr('stroke -  dasharray', '5,5')
    //     .attr('stroke -  width', 0.5);
    //
    //   // x axis labels
    //   const xAxisGroup = group.append('g')
    //     .attr('transform', 'translate(0,'  +  height  +  ')')
    //     .call(d3.axisBottom(xScaleFunc));
    //   xAxisGroup.selectAll('text')
    //     .attr('fill', 'white');
    //   xAxisGroup
    //     .select('.domain')
    //     .remove();
    //
    //   // y axis label
    //   const yAxisGroup = group.append('g')
    //     .call(d3.axisLeft(yScaleFunc));
    //   yAxisGroup.append('text')  // from here on we are just adding to the axis
    //     .attr('transform', 'rotate( -  90)')
    //     .attr('y', 6)
    //     .attr('dy', '0.71em')
    //     .attr('text-anchor', 'end')
    //     .text('Price ($)');
    //   yAxisGroup.selectAll('text') // note: picks up the appended label too!
    //     .attr('fill', 'white');
    //
    //   // add grid lines
    //   const xTicks = d3.axisBottom(xScaleFunc).ticks(8); // how to make dynamic?
    //   const yTicks = d3.axisLeft(yScaleFunc).ticks(10); // how to make dynamic?
    //   chart
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  (height  +  margin.top)  +  ')')
    //     .call(xTicks.tickSize( -  height).tickFormat(''));
    //   chart
    //     .append('g')
    //     .attr('class', 'grid')
    //     .attr('transform', 'translate('  +  margin.left  +  ','  +  margin.top  +  ')')
    //     .call(yTicks.tickSize( -  width).tickFormat(''));
    //
    //   // add trend line
    //   function leastSquares(xseries, yseries) {
    //     const reduceSumFunc = (prev, cur) => prev  +  cur;
    //
    //     const xBar = xseries.reduce(reduceSumFunc)  *   1.0 / xseries.length;
    //     const yBar = yseries.reduce(reduceSumFunc)  *   1.0 / yseries.length;
    //
    //     const ssXX = xseries.map((d) => Math.pow(d  -   xBar, 2)).reduce(reduceSumFunc);
    //
    //     const ssYY = yseries.map((d) => Math.pow(d  -   yBar, 2)).reduce(reduceSumFunc);
    //
    //     const ssXY = xseries.map((d, i) => (d  -   xBar)  *   (yseries[i]  -   yBar)).reduce(reduceSumFunc);
    //
    //     const slope = ssXY / ssXX;
    //     const intercept = yBar  -   (xBar  *   slope);
    //     const rSquare = Math.pow(ssXY, 2) / (ssXX  *   ssYY);
    //
    //     return [slope, intercept, rSquare];
    //   }
    //
    //   const xSeries = d3.range(1, data.length  +  1);
    //   const ySeries = data.map((datum) => datum.value);
    //   const lsc = leastSquares(xSeries, ySeries);
    //
    //   // maybe need to move through data until lrY1 > translated 0
    //   const lrY1 =  + lsc[0]  +   + lsc[1];
    //   const lrY2 =  + lsc[0]  *    + xSeries.length  +   + lsc[1];
    //   chart
    //     .append('line')
    //     .attr('x1', margin.left)
    //     .attr('y1', yScaleFunc(lrY1)  -   margin.top)
    //     .attr('x2', width  +  margin.left)
    //     .attr('y2', yScaleFunc(lrY2)  -   margin.top)
    //     .attr('stroke', 'orange')
    //     .attr('stroke -  width', '2px')
    //     .attr('stroke -  dasharray', '2,2,5');
    // }
    //
    // function parseData(data: { bpi: [string, number] }) {
    //
    //   // structure looks like this;
    //   const exampleData = {
    //     bpi:
    //       {
    //         '2019 -  01 -  01': 3869.47,
    //         '2019 -  01 -  02': 3941.2167,
    //         '2019 -  01 -  03': 3832.155,
    //         '2019 -  01 -  04': 3863.6267
    //       },
    //     disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.',
    //     time: {
    //       updated: 'Sep 10, 2019 22:48:50 UTC',
    //       updatedISO: '2019 -  09 -  10T22:48:50 + 00:00'
    //     }
    //   };
    //
    //   const arr = [];
    //   // tslint:disable -  next -  line:forin
    //   for (const idx in data.bpi) {
    //     arr.push({date: new Date(idx), value:  + data.bpi[idx]});
    //   }
    //   return arr;
    // }
    //
    // addEventListener('DOMContentLoaded', (event) => {
    //     fetch(btcFeedUrl)
    //       .then((response) => response.json())
    //       .then((data) => drawChart_grad_w_trend(parseData(data)))
    //       .catch((err) => console.log(err));
    //   }
    // );
  }

  liquidFill() {
    // const gauge1 = loadLiquidFillGauge('fillgauge1', 55, null);
    // const config1 = liquidFillGaugeDefaultSettings();
    // config1.circleColor = '#FF7777';
    // config1.textColor = '#FF4444';
    // config1.waveTextColor = '#FFAAAA';
    // config1.waveColor = '#FFDDDD';
    // config1.circleThickness = 0.2;
    // config1.textVertPosition = 0.2;
    // config1.waveAnimateTime = 1000;
    // const gauge2 = loadLiquidFillGauge('fillgauge2', 28, config1);
    // const config2 = liquidFillGaugeDefaultSettings();
    // config2.circleColor = '#D4AB6A';
    // config2.textColor = '#553300';
    // config2.waveTextColor = '#805615';
    // config2.waveColor = '#AA7D39';
    // config2.circleThickness = 0.1;
    // config2.circleFillGap = 0.2;
    // config2.textVertPosition = 0.8;
    // config2.waveAnimateTime = 2000;
    // config2.waveHeight = 0.3;
    // config2.waveCount = 1;
    // const gauge3 = loadLiquidFillGauge('fillgauge3', 60.1, config2);
    // const config3 = liquidFillGaugeDefaultSettings();
    // config3.textVertPosition = 0.8;
    // config3.waveAnimateTime = 5000;
    // config3.waveHeight = 0.15;
    // config3.waveAnimate = false;
    // config3.waveOffset = 0.25;
    // config3.valueCountUp = false;
    // config3.displayPercent = false;
    // const gauge4 = loadLiquidFillGauge('fillgauge4', 50, config3);
    // const config4 = liquidFillGaugeDefaultSettings();
    // config4.circleThickness = 0.15;
    // config4.circleColor = '#808015';
    // config4.textColor = '#555500';
    // config4.waveTextColor = '#FFFFAA';
    // config4.waveColor = '#AAAA39';
    // config4.textVertPosition = 0.8;
    // config4.waveAnimateTime = 1000;
    // config4.waveHeight = 0.05;
    // config4.waveAnimate = true;
    // config4.waveRise = false;
    // config4.waveHeightScaling = false;
    // config4.waveOffset = 0.25;
    // config4.textSize = 0.75;
    // config4.waveCount = 3;
    // const gauge5 = loadLiquidFillGauge('fillgauge5', 60.44, config4);
    // const config5 = liquidFillGaugeDefaultSettings();
    // config5.circleThickness = 0.1;
    // config5.circleColor = '#6DA398';
    // config5.textColor = '#0E5144';
    // config5.waveTextColor = '#6DA398';
    // config5.waveColor = '#246D5F';
    // config5.textVertPosition = 0.52;
    // config5.waveAnimateTime = 0;
    // config5.waveHeight = 0;
    // config5.waveAnimate = false;
    // config5.waveCount = 1;
    // config5.waveOffset = 0;
    // config5.textSize = 1;
    // config5.minValue = 0;
    // config5.maxValue = 100;
    // config5.displayPercent = false;
    // const gauge6 = loadLiquidFillGauge('fillgauge6', 50, config5);
    //
    // function NewValue() {
    //   if (Math.random() > .5) {
    //     return Math.round(Math.random() * 100);
    //   } else {
    //     return (Math.random() * 100).toFixed(1);
    //   }
    // }
    //
    // function loadLiquidFillGauge(elementId: string, value: number, config: {
    //   waveAnimate: boolean;
    //   waveOffset: number;
    //   textSize: number;
    //   maxValue: number;
    //   waveCount: number;
    //   valueCountUp: boolean;
    //   textVertPosition: number;
    //   textColor: string;
    //   circleColor: string;
    //   waveHeight: number;
    //   waveAnimateTime: number;
    //   minValue: number;
    //   circleThickness: number;
    //   waveColor: string;
    //   waveTextColor: string;
    //   waveRiseTime: number;
    //   displayPercent: boolean;
    //   waveRise: boolean;
    //   waveHeightScaling: boolean;
    //   circleFillGap: number
    // }) {
    //   if (config == null) {
    //     config = liquidFillGaugeDefaultSettings();
    //   }
    //
    //   const gauge = d3.select('#' + elementId);
    //   // tslint:disable:radix
    //   const radius = Math.min(parseInt(gauge.style('width')), parseInt(gauge.style('height'))) / 2;
    //   const locationX = parseInt(gauge.style('width')) / 2 - radius;
    //   const locationY = parseInt(gauge.style('height')) / 2 - radius;
    //   const fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
    //
    //   let waveHeightScale;
    //   if (config.waveHeightScaling) {
    //     waveHeightScale = d3.scaleLinear()
    //       .range([0, config.waveHeight, 0])
    //       .domain([0, 50, 100]);
    //   } else {
    //     waveHeightScale = d3.scaleLinear()
    //       .range([config.waveHeight, config.waveHeight])
    //       .domain([0, 100]);
    //   }
    //
    //   const textPixels = (config.textSize * radius / 2);
    //   const textFinalValue = parseFloat(String(value)).toFixed(2);
    //   const textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
    //   const percentText = config.displayPercent ? '%' : '';
    //   const circleThickness = config.circleThickness * radius;
    //   const circleFillGap = config.circleFillGap * radius;
    //   const fillCircleMargin = circleThickness + circleFillGap;
    //   const fillCircleRadius = radius - fillCircleMargin;
    //   const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
    //
    //   const waveLength = fillCircleRadius * 2 / config.waveCount;
    //   const waveClipCount = 1 + config.waveCount;
    //   const waveClipWidth = waveLength * waveClipCount;
    //
    //   // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
    //   // tslint:disable:no-shadowed-variable
    //   let textRounder = (value) => Math.round(value);
    //   if (parseFloat(textFinalValue) !== parseFloat(String(textRounder(textFinalValue)))) {
    //     // @ts-ignore
    //     textRounder = (value) => parseFloat(value).toFixed(1);
    //   }
    //   if (parseFloat(textFinalValue) !== parseFloat(String(textRounder(textFinalValue)))) {
    //     // @ts-ignore
    //     textRounder = (value) => parseFloat(value).toFixed(2);
    //   }
    //
    //   // Data for building the clip wave area.
    //   const data = [];
    //   for (let i = 0; i <= 40 * waveClipCount; i++) {
    //     data.push({x: i / (40 * waveClipCount), y: (i / (40))});
    //   }
    //
    //   // Scales for drawing the outer circle.
    //   const gaugeCircleX = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 1]);
    //   const gaugeCircleY = d3.scaleLinear().range([0, radius]).domain([0, radius]);
    //
    //   // Scales for controlling the size of the clipping path.
    //   const waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    //   const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
    //
    //   // Scales for controlling the position of the clipping path.
    //   const waveRiseScale = d3.scaleLinear()
    //   // The clipping area size is the height of the fill circle  +  the wave height, so we position the clip wave
    //   // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
    //   // circle at 100%.
    //     .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
    //     .domain([0, 1]);
    //   const waveAnimateScale = d3.scaleLinear()
    //     .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
    //     .domain([0, 1]);
    //
    //   // Scale for controlling the position of the text within the gauge.
    //   const textRiseScaleY = d3.scaleLinear()
    //     .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
    //     .domain([0, 1]);
    //
    //   // Center the gauge within the parent SVG.
    //   const gaugeGroup = gauge.append('g')
    //     .attr('transform', 'translate(' + locationX + ',' + locationY + ')');
    //
    //   // Draw the outer circle.
    //   const gaugeCircleArc = d3.arc()
    //     .startAngle(gaugeCircleX(0))
    //     .endAngle(gaugeCircleX(1))
    //     .outerRadius(gaugeCircleY(radius))
    //     .innerRadius(gaugeCircleY(radius - circleThickness));
    //   gaugeGroup.append('path')
    //     .attr('d', gaugeCircleArc)
    //     .style('fill', config.circleColor)
    //     .attr('transform', 'translate(' + radius + ',' + radius + ')');
    //
    //   // Text where the wave does not overlap.
    //   const text1 = gaugeGroup.append('text')
    //     .text(textRounder(textStartValue) + percentText)
    //     .attr('class', 'liquidFillGaugeText')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', textPixels + 'px')
    //     .style('fill', config.textColor)
    //     .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');
    //
    //   // The clipping wave area.
    //   const clipArea = d3.area()
    //     .x((d) => waveScaleX(d.x))
    //     .y0((d) => waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI)))
    //     .y1((d) => (fillCircleRadius * 2 + waveHeight));
    //   const waveGroup = gaugeGroup.append('defs')
    //     .append('clipPath')
    //     .attr('id', 'clipWave' + elementId);
    //   const wave = waveGroup.append('path')
    //     .datum(data)
    //     .attr('d', clipArea)
    //     .attr('T', 0);
    //
    //   // The inner circle with the clipping wave attached.
    //   const fillCircleGroup = gaugeGroup.append('g')
    //     .attr('clip-path', 'url(#clipWave' + elementId + ')');
    //   fillCircleGroup.append('circle')
    //     .attr('cx', radius)
    //     .attr('cy', radius)
    //     .attr('r', fillCircleRadius)
    //     .style('fill', config.waveColor);
    //
    //   // Text where the wave does overlap.
    //   const text2 = fillCircleGroup.append('text')
    //     .text(textRounder(textStartValue) + percentText)
    //     .attr('class', 'liquidFillGaugeText')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', textPixels + 'px')
    //     .style('fill', config.waveTextColor)
    //     .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');
    //
    //   // Make the value count up.
    //   if (config.valueCountUp) {
    //     const textTween = function() {
    //       const i = d3.interpolate(this.textContent, textFinalValue);
    //       return function(t) {
    //         this.textContent = textRounder(i(t)) + percentText;
    //       };
    //     };
    //     text1.transition()
    //       .duration(config.waveRiseTime)
    //       .tween('text', textTween);
    //     text2.transition()
    //       .duration(config.waveRiseTime)
    //       .tween('text', textTween);
    //   }
    //
    //   // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    //   const waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
    //   if (config.waveRise) {
    //     waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
    //       .transition()
    //       .duration(config.waveRiseTime)
    //       .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
    //       .selectAll('start')
    //       .each('start', () => wave.attr('transform', 'translate(1,0)'));
    //     // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false.
    //     // The wave will not position correctly without this, but it's not clear why this is actually necessary.
    //   } else {
    //     waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
    //   }
    //
    //   if (config.waveAnimate) {
    //     animateWave();
    //   }
    //
    //   function animateWave() {
    //     wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
    //     wave.transition()
    //       .duration(config.waveAnimateTime * (1 - wave.attr('T')))
    //       // .ease('linear')
    //       .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
    //       .attr('T', 1)
    //       .selectAll('end')
    //       .each(() => {
    //         wave.attr('T', 0);
    //         animateWave(); // rpd - config.waveAnimateTime);
    //       });
    //   }
    //
    //   function GaugeUpdater() {
    //     this.update = (value) => {
    //       const newFinalValue = parseFloat(value).toFixed(2);
    //       let textRounderUpdater = (value) => Math.round(value);
    //       if (parseFloat(newFinalValue) !== parseFloat(String(textRounderUpdater(newFinalValue)))) {
    //         // @ts-ignore
    //         textRounderUpdater = (value) => parseFloat(value).toFixed(1);
    //       }
    //       if (parseFloat(newFinalValue) !== parseFloat(String(textRounderUpdater(newFinalValue)))) {
    //         // @ts-ignore
    //         textRounderUpdater = (value) => parseFloat(value).toFixed(2);
    //       }
    //
    //       const textTween = function() {
    //         const i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
    //         return function(t) {
    //           this.textContent = textRounderUpdater(i(t)) + percentText;
    //         };
    //       };
    //
    //       text1.transition()
    //         .duration(config.waveRiseTime)
    //         .tween('text', textTween);
    //       text2.transition()
    //         .duration(config.waveRiseTime)
    //         .tween('text', textTween);
    //
    //       const fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
    //       const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
    //       const waveRiseScale = d3.scaleLinear()
    //       // The clipping area size is the height of the fill circle  +  the wave height, so we position the clip wave
    //       // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
    //       // circle at 100%.
    //         .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
    //         .domain([0, 1]);
    //       const newHeight = waveRiseScale(fillPercent);
    //       const waveScaleX = d3.scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
    //       const waveScaleY = d3.scaleLinear().range([0, waveHeight]).domain([0, 1]);
    //       let newClipArea;
    //       if (config.waveHeightScaling) {
    //         newClipArea = d3.area()
    //           .x((d) => waveScaleX(d.x))
    //           // tslint:disable-next-line:max-line-length
    //           .y0((d) => waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI)))
    //           .y1((d) => (fillCircleRadius * 2 + waveHeight));
    //       } else {
    //         newClipArea = clipArea;
    //       }
    //
    //       const newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
    //       wave.transition()
    //         .duration(0)
    //         .transition()
    //         .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - wave.attr('T'))) : (config.waveRiseTime))
    //         .ease('linear')
    //         .attr('d', newClipArea)
    //         .attr('transform', 'translate(' + newWavePosition + ',0)')
    //         .attr('T', '1')
    //         .each('end', () => {
    //           if (config.waveAnimate) {
    //             wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
    //             animateWave();
    //           }
    //         });
    //       waveGroup.transition()
    //         .duration(config.waveRiseTime)
    //         .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')');
    //     };
    //   }
    //
    //   return new GaugeUpdater();
    // }
  }

  convergeThetaValue(value: number): number {
    let theta = Math.pow(12 * value * Math.PI, 1 / 3);
    for (let idx = 0; idx < 10; ++idx) {
      theta = (Math.sin(theta) - theta * Math.cos(theta) + 2 * value * Math.PI) / (1 - Math.cos(theta));
    }
    return theta;
  }

  findThetaFor(value: number): number {
    if (this.isOutOfRange(value)) {
      return value;
    }
    const theta: number = this.convergeThetaValue(value);
    return (1 - Math.cos(theta / 2)) / 2;
  }

  private isOutOfRange(value: number): boolean {
    return value <= 0 || value >= 1;
  }

  clipBall(radius: number, value: number) {
    const theta: number = this.findThetaFor(Math.abs(value));
    const clipHeight: number = 2 * radius * theta;
    const yClipValue: number = radius - clipHeight;
    d3.select('#clip rect')
      .attr('y', yClipValue)
      .attr('height', clipHeight);
  }

  makeBallTemplate(element: any, radius: number, config: BallGraphConfiguration) {
    const outlinePadding = config.outlineStrokeWidth;
    const gaugeCenterX = (-1 * radius);
    const gaugeCenterY = 0;
    const gaugeWidth = (2 * radius + outlinePadding);
    const gaugeHeight = (2 * radius + outlinePadding);
    const clipXPos = (-2 * radius);
    const clipWidth = (2 * radius + outlinePadding);
    const svgTag = element.append('svg')
      .attr('class', 'ball-metric-svg-canvas')
      .attr('width', gaugeWidth)
      .attr('height', gaugeHeight);
    const defs = svgTag.append('defs');
    const clipPath = defs.append('clipPath')
      .attr('id', 'clip');
    const clipRect = clipPath.append('rect') // don't need y or height, they are getting calculated (somehow)
      .attr('id', 'clipRect')
      .attr('class', 'ball-metric-gauge-clip')
      .attr('x', clipXPos)
      .attr('width', clipWidth);
    const gaugeGroup = svgTag.append('g')
      .attr('transform', 'translate(' + (2 * radius + outlinePadding / 2) + ', ' + (radius + outlinePadding / 2) + ')');
    const filledGauge = gaugeGroup.append('circle')
      .attr('class', 'ball-metric-gauge-fill')
      .attr('cx', gaugeCenterX)
      .attr('cy', gaugeCenterY)
      .attr('r', radius)
      // .attr('fill', config.gaugeFillColor)
      .attr('clip-path', 'url(#clip)');
    const gaugeOutline = gaugeGroup.append('circle')
      .attr('class', 'ball-metric-gauge-outline')
      .attr('cx', gaugeCenterX)
      .attr('cy', gaugeCenterY)
      .attr('r', radius)
      .attr('fill', 'none')   // must force this to none
      // .attr('stroke', config.outlineStrokeColor)
      .attr('stroke-width', outlinePadding);
  }

  makeBall(element: any, value: number, config: BallGraphConfiguration) {
    const radius = config.radius;
    this.makeBallTemplate(element, radius, config);
    this.clipBall(radius, value);
  }

  makeMetricBall(element: any, metricName: string, metricValue: number, config: BallGraphConfiguration) {
    const ballMetric = element.append('div')
      .attr('class', 'ball-metric')
      .style('float', 'left')
    this.makeBall(ballMetric, metricValue, config);
    ballMetric.append('div')
      .attr('class', 'ball-metric-label')
      .style('float', 'right')
      .attr('height', '100%')
      .append('p')
      .attr('class', 'ball-metric-label-text')
      .attr('height', '100%')
      .text(metricName);
  }

  ngAfterContentInit() {
    const graphs = d3.select('#graphs');

    // this.firstExperiments(graphs);

    // this.liveBTC();

    const laGreen = '#4ABD92';
    const laDarkGreen = '#2C9171';

    // need to make this conform with the IChartConfig in Navigator
    const metricValue = 0.1;
    const metricName = 'LABEL TEXT THAT IS LONGER AND LONGER AND LONGER'; // TODO what about wrapping?
    this.makeMetricBall(graphs, metricName, metricValue, {
      radius: 50, // like width
      outlineStrokeWidth: 2
    });

    // this.liquidFill();
  }

}


function liquidFillGaugeDefaultSettings() {
  return {
    minValue: 0, // The gauge minimum value.
    maxValue: 100, // The gauge maximum value.
    circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
    circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    circleColor: '#178BCA', // The color of the outer circle.
    waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
    waveCount: 1, // The number of full waves per width of the wave circle.
    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
    waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
    waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum
    // at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full
    // or empty when near it's minimum or maximum fill.
    waveAnimate: true, // Controls if the wave scrolls or is static.
    waveColor: '#178BCA', // The color of the fill wave.
    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
    valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final
    // value is displayed.
    displayPercent: true, // If true, a % symbol is displayed after the value.
    textColor: '#045681', // The color of the value text when the wave does not overlap it.
    waveTextColor: '#A4DBf8' // The color of the value text when the wave overlaps it.
  };
}
