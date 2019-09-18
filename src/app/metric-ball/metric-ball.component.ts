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
    // const laGreen = '#4ABD92';
    // const laDarkGreen = '#2C9171';

    this.makeMetricBall(graphs, this.labelText, this.value, {
      width: this.width,
      height: this.height,
      ballRadius: Math.min(this.width, this.height) / 2,
      ballStrokeWidth: this.ballStrokeWidth
    });
    this.created.emit(true);
  }

  private makeMetricBall(element: any, metricName: string, metricValue: number, config: IBallMetricConfig) {
    const ballMetric = this.createAnchorElement(element, config);
    this.attachBall(ballMetric, metricValue, config);
    this.attachLabel(ballMetric, metricName, config);
  }

  private createAnchorElement(element: any, config: IBallMetricConfig) {
    return element.append('div')
      .attr('class', 'ball-metric')
      .style('display', 'flex')
      .style('width', config.width + 'px')
      .style('height', config.height + 'px')
      .style('float', 'left');
  }

  private attachBall(element: any, value: number, config: IBallMetricConfig) {
    this.createBall(element, config.ballRadius, config.ballStrokeWidth);
    this.clipBall(config.ballRadius, value);
  }

  private createBall(element: any, ballRadius: number, ballStrokeWidth: number) {
    const ballCenterX = (-1 * ballRadius);
    const ballCenterY = 0;
    const ballSize = (2 * ballRadius + ballStrokeWidth);
    const clipXPos = (-2 * ballRadius);
    const svgTag = element.append('svg')
      .attr('class', 'ball-metric-svg-canvas')
      .attr('width', ballSize)
      .attr('height', ballSize);
    this.createClipRegion(svgTag, clipXPos, ballSize);
    this.createMetricBall(svgTag, ballRadius, ballStrokeWidth, ballCenterX, ballCenterY);
  }

  private createClipRegion(svgTag: any, clipXPos: number, clipWidth: number) {
    const defs = svgTag.append('defs');
    const clipPath = defs.append('clipPath')
      .attr('id', 'clip');
    const clipRect = clipPath.append('rect')
      .attr('id', 'clipRect')
      .attr('class', 'ball-metric-gauge-clip')
      .attr('x', clipXPos)
      .attr('width', clipWidth)
      .attr('y', 0)
      .attr('height', 0);
  }

  private createMetricBall(svgTag: any, ballRadius: number, ballStrokeWidth: number, ballCenterX: number, ballCenterY: number) {
    const xTranslation = 2 * ballRadius + ballStrokeWidth / 2;
    const yTranslation = ballRadius + ballStrokeWidth / 2;
    const ballGroup = svgTag.append('g')
      .attr('transform', 'translate(' + xTranslation + ', ' + yTranslation + ')');
    this.createFilledBall(ballGroup, ballCenterX, ballCenterY, ballRadius);
    this.createBallOutline(ballGroup, ballCenterX, ballCenterY, ballRadius, ballStrokeWidth);
  }

  private createFilledBall(ballGroup: any, ballCenterX: number, ballCenterY: number, ballRadius: number) {
    return ballGroup.append('circle')
      .attr('class', 'ball-metric-gauge-fill')
      .attr('cx', ballCenterX)
      .attr('cy', ballCenterY)
      .attr('r', ballRadius)
      .attr('fill', this.color)
      .attr('clip-path', 'url(#clip)');
  }

  private createBallOutline(ballGroup: any, ballCenterX: number, ballCenterY: number, ballRadius: number, ballStrokeWidth: number) {
    return ballGroup.append('circle')
      .attr('class', 'ball-metric-gauge-outline')
      .attr('cx', ballCenterX)
      .attr('cy', ballCenterY)
      .attr('r', ballRadius)
      .attr('fill', 'none')   // must force this to none
      .attr('stroke', this.color)
      .attr('stroke-width', ballStrokeWidth);
  }

  private clipBall(ballRadius: number, value: number) {
    const theta: number = this.findThetaFor(Math.abs(value));
    const clipHeight: number = 2 * ballRadius * theta;
    const yClipValue: number = ballRadius - clipHeight;
    d3.select('#clip rect')
      .attr('y', yClipValue)
      .attr('height', clipHeight);
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

  private convergeThetaValue(value: number): number {
    let theta = Math.pow(12 * value * Math.PI, 1 / 3);
    for (let idx = 0; idx < 10; ++idx) {
      theta = (Math.sin(theta) - theta * Math.cos(theta) + 2 * value * Math.PI) / (1 - Math.cos(theta));
    }
    return theta;
  }

  private attachLabel(ballMetric, metricName: string, config: IBallMetricConfig) {
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
    const labelText = label.append('div')
      .attr('class', 'ball-metric-label-text')
      .style('width', labelWidth + 'px')
      .style('font-size', fontSize + 'px') // TODO should probably be margin or pad or something, not 2
      .style('margin', 'auto')  // TODO margin: auto is a hack, look at other flexbox approaches.
      .text(metricName);
  }

}
