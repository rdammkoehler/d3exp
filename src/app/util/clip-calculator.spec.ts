import {findThetaFor} from './clip-calculator';

describe('findThetaFor', () => {
  it('0 is 0', () => {
    expect(findThetaFor(0)).toBe(0);
  });
  it('1 is 1', () => {
    expect(findThetaFor(1)).toBe(1);
  });
  it('0.5 is unknown', () => {
    expect(findThetaFor(0.5)).toBeCloseTo(0.5, 0.1);
  });
});
