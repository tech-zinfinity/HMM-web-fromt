import { HotelStatusPipe } from './hotel-status.pipe';

describe('HotelStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new HotelStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
