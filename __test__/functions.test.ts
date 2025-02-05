import { getTotalPage } from '@/app/lib/functions';

describe('getTotalPage', () => {
  test('引数がPAGE_SIZEで割り切れるとき、商を返す', () => {
    expect(getTotalPage(5)).toBe(1);
    expect(getTotalPage(10)).toBe(2);
    expect(getTotalPage(15)).toBe(3);
  });
  test('引数がPAGE_SIZEで割り切れない時、商の小数点以下切り捨てた値に1を足した数を返す', () => {
    expect(getTotalPage(3)).toBe(1);
    expect(getTotalPage(6)).toBe(2);
    expect(getTotalPage(11)).toBe(3);
  });
  test('引数が0以下だったら0を返す', () => {
    expect(getTotalPage(0)).toBe(0);
    expect(getTotalPage(-5)).toBe(0);
  });
  test('境界値: pageNumber = 0; pageNumber = 1', () => {
    expect(getTotalPage(0)).toBe(0);
    expect(getTotalPage(1)).toBe(1);
  });
});
