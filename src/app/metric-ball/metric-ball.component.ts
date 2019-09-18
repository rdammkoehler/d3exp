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
  width = 100;
  @Input()
  height = 25;

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

    // TODO what about wrapping?
    this.makeMetricBall(graphs, this.labelText, this.value, {
      ballRadius: Math.min(this.width, this.height)
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

  private makeBallTemplate(element: any, radius: number, config: IBallMetricConfig) {
    const outlinePadding = 2; // TODO config.outlineStrokeWidth;
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

  private makeBall(element: any, value: number, config: IBallMetricConfig) {
    const radius = config.ballRadius;
    this.makeBallTemplate(element, radius, config);
    this.clipBall(radius, value);
  }

  private makeMetricBall(element: any, metricName: string, metricValue: number, config: IBallMetricConfig) {
    const ballMetric = element.append('div')
      .attr('class', 'ball-metric')
      .style('float', 'left');
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
}
