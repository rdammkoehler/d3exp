import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as d3 from 'd3';

// fakes from navigator
// tslint:disable:no-empty-interface
interface IChartMargin {
}

interface ChartType {
}

interface IAxisConfig {
}

interface ChartDirection {
}

interface IChartLegend {
}

interface IChartConfig {
  height?: number;
  width?: number;
  margin?: IChartMargin;
  chartType?: ChartType;
  valueAxis?: IAxisConfig;
  labelAxis?: IAxisConfig;
  padding?: number;
  useTimeScale?: boolean;
  useViewBox?: boolean;
  showGrid?: boolean;
  direction?: ChartDirection;
  legend?: IChartLegend;
}

interface IBallMetricConfig extends IChartConfig {
  ballRadius: number;
  ballStrokeWidth?: number;
}

@Component({
  selector: 'app-metric-ball',
  templateUrl: './metric-ball.component.html',
  styleUrls: ['./metric-ball.component.scss']
})
export class MetricBallComponent implements OnInit, AfterContentInit {
  @Input()
  color = '#4ABD92';
  @Input()
  value = 0;
  @Input()
  labelText = '';
  @Input()
  width = 120;
  @Input()
  height = 20;
  @Input()
  ballStrokeWidth = 1;

  @Output()
  created: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const graphs = d3.select('#ball-metric');
    const laGreen = '#4ABD92';
    const laDarkGreen = '#2C9171';

    this.makeMetricBall(graphs, this.labelText, this.value, {
      width: this.width,
      height: this.height,
      ballRadius: Math.min(this.width, this.height) / 2,
      ballStrokeWidth: this.ballStrokeWidth
    });
    this.created.emit(true);
  }

  private convergeThetaValue(value: number): number {
    let theta = Math.pow(12 * value * Math.PI, 1 / 3);
    for (let idx = 0; idx < 10; ++idx) {
      theta = (Math.sin(theta) - theta * Math.cos(theta) + 2 * value * Math.PI) / (1 - Math.cos(theta));
    }
    return theta;
  }

  private findThetaFor(value: number): number {
    if (this.isOutOfRange(value)) {
      return value;
    }
    const theta: number = this.convergeThetaValue(value);
    return (1 - Math.cos(theta / 2)) / 2;
  }

  private isOutOfRange(value: number): boolean {
    return value <= 0 || value >= 1;
  }

  private clipBall(radius: number, value: number) {
    const theta: number = this.findThetaFor(Math.abs(value));
    const clipHeight: number = 2 * radius * theta;
    const yClipValue: number = radius - clipHeight;
    d3.select('#clip rect')
      .attr('y', yClipValue)
      .attr('height', clipHeight);
  }

  private createBallGraph(element: any, radius: number, config: IBallMetricConfig) {
    const outlinePadding = config.ballStrokeWidth;
    const gaugeCenterX = (-1 * radius);
    const gaugeCenterY = 0;
    const gaugeWidth = (2 * radius + outlinePadding);
    const gaugeHeight = (2 * radius + outlinePadding);
    const clipXPos = (-2 * radius);
    const clipWidth = (2 * radius + outlinePadding);
    // console.log('outlinePadding: ' + outlinePadding + ' gaugeCenterX: ' + gaugeCenterX + ' gaugeCenterY: ' + gaugeCenterY +
    //   ' gaugeWidth: ' + gaugeWidth + ' gaugeHeight: ' + gaugeHeight + ' clipXPos: ' + clipXPos + ' clipWidth: ' + clipWidth);
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
      .attr('fill', this.color)
      .attr('clip-path', 'url(#clip)');
    const gaugeOutline = gaugeGroup.append('circle')
      .attr('class', 'ball-metric-gauge-outline')
      .attr('cx', gaugeCenterX)
      .attr('cy', gaugeCenterY)
      .attr('r', radius)
      .attr('fill', 'none')   // must force this to none
      .attr('stroke', this.color)
      .attr('stroke-width', outlinePadding);
  }

  private attachBallGraph(element: any, value: number, config: IBallMetricConfig) {
    this.createBallGraph(element, config.ballRadius, config);
    this.clipBall(config.ballRadius, value);
  }

  private createLabel(ballMetric, metricName: string, config: IBallMetricConfig) {
    const labelWidth = config.width - (2 * config.ballRadius + 2 * config.ballStrokeWidth) - 1;
    const labelHeight = config.height;
    const labelLeftPad = 2 * config.ballStrokeWidth; // TODO I made this ratio up, is it OK?
    const fontSize = (labelHeight / 2 - 2);
    const label = ballMetric.append('div')
      .attr('class', 'ball-metric-label')
      .style('display', 'flex')
      .style('float', 'right')
      .style('width', labelWidth + 'px')
      .style('overflow', 'hidden')
      .style('padding-left', labelLeftPad + 'px')
      .style('vertical-align', 'middle')
      .style('height', labelHeight + 'px');
    const labelText = label
      .append('div')
      .attr('class', 'ball-metric-label-text')
      .style('width', labelWidth + 'px')
      .style('font-size', fontSize + 'px') // TODO should probably be margin or pad or something, not 2
      .style('margin', 'auto')  // TODO margin: auto is a hack, look at other flexbox approaches.
      .text(metricName);
  }

  private createAnchorElement(element: any, config: IBallMetricConfig) {
    return element.append('div')
      .attr('class', 'ball-metric')
      .style('display', 'flex')
      .style('width', config.width + 'px')
      .style('height', config.height + 'px')
      .style('float', 'left');
  }

  private makeMetricBall(element: any, metricName: string, metricValue: number, config: IBallMetricConfig) {
    const ballMetric = this.createAnchorElement(element, config);
    this.attachBallGraph(ballMetric, metricValue, config);
    this.createLabel(ballMetric, metricName, config);
  }

}
