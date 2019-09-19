import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {v4} from 'uuid';

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
  radius: number;
  strokeWidth?: number;
}

interface Ball {
  center: { x: number; y: number; };
  radius: number;
  strokeWidth: number;
  size: number;
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

  uuid: string = v4();

  @ViewChild('chart')  // this guy ties us to the control in the template html
  _chartDiv: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const graphs = d3.select(this._chartDiv.nativeElement);
    // const laGreen = '#4ABD92';
    // const laDarkGreen = '#2C9171';

    this.makeMetricBall(graphs, this.labelText, this.value, {
      width: this.width,
      height: this.height,
      radius: Math.min(this.width, this.height) / 2,
      strokeWidth: this.ballStrokeWidth
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
    const ball: Ball = this.createBall(config);
    this.attachBallCanvas(element, ball);
    this.clipBall(ball.radius, value);
  }

  private createBall(config: IBallMetricConfig): Ball {
    const ball: Ball = {
      center: {
        x: (-1 * config.radius),
        y: 0
      },
      strokeWidth: config.strokeWidth,
      radius: config.radius,
      size: (2 * config.radius + config.strokeWidth)
    };
    return ball;
  }

  private attachBallCanvas(element: any, ball: Ball) {
    const clipXPos = (-2 * ball.radius);
    const svgTag = element.append('svg')
      .attr('class', 'ball-metric-svg-canvas')
      .attr('width', ball.size)
      .attr('height', ball.size);
    this.attachClipRegion(svgTag, clipXPos, ball.size);
    this.attachFilledBall(svgTag, ball);
  }

  private attachClipRegion(svgTag: any, clipXPos: number, clipWidth: number) {
    const defs = svgTag.append('defs');
    const clipPath = defs.append('clipPath') // need a GUID4 here or some way to use the component id
      .attr('id', 'clip' + this.uuid);
    const clipRect = clipPath.append('rect')
      .attr('id', 'clipRect')
      .attr('class', 'ball-metric-gauge-clip')
      .attr('x', clipXPos)
      .attr('width', clipWidth)
      .attr('y', 0)
      .attr('height', 0);
  }

  private attachFilledBall(svgTag: any, ball: Ball) {
    const ballGroup = this.createBallGroup(svgTag, ball);
    this.createFilledBall(ballGroup, ball);
    this.createBallOutline(ballGroup, ball);
  }

  private createBallGroup(svgTag: any, ball: Ball) {
    const xTranslation = 2 * ball.radius + ball.strokeWidth / 2;
    const yTranslation = ball.radius + ball.strokeWidth / 2;
    const ballGroup = svgTag.append('g')
      .attr('transform', 'translate(' + xTranslation + ', ' + yTranslation + ')');
    return ballGroup;
  }

  private createFilledBall(ballGroup: any, ball: Ball) {
    return ballGroup.append('circle')
      .attr('class', 'ball-metric-gauge-fill')
      .attr('cx', ball.center.x)
      .attr('cy', ball.center.y)
      .attr('r', ball.radius)
      .attr('fill', this.color)
      .attr('clip-path', 'url(#clip' + this.uuid + ')');
  }

  private createBallOutline(ballGroup: any, ball: Ball) {
    return ballGroup.append('circle')
      .attr('class', 'ball-metric-gauge-outline')
      .attr('cx', ball.center.x)
      .attr('cy', ball.center.y)
      .attr('r', ball.radius)
      .attr('fill', 'none')   // must force this to none
      .attr('stroke', this.color)
      .attr('stroke-width', ball.strokeWidth);
  }

  private clipBall(ballRadius: number, value: number) {
    const theta: number = this.findThetaFor(Math.abs(value));
    const clipHeight: number = 2 * ballRadius * theta;
    const yClipValue: number = ballRadius - clipHeight;
    d3.select('#clip' + this.uuid + ' rect')
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
    const labelWidth = config.width - (2 * config.radius + 2 * config.strokeWidth) - 1;
    const labelHeight = config.height;
    const labelLeftPad = 2 * config.strokeWidth; // TODO I made this ratio up, is it OK?
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
