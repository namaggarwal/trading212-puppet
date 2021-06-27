import Trading212, { TradeType } from '../src';

describe('Trade', () => {
  it('works', async (done) => {
    jest.setTimeout(900 * 1000);
    const trading212 = new Trading212('', '');
    return trading212.trade({tradeType: TradeType.BUY, quantity: 1}).then(() => {
      expect(true).toBeTruthy();
      done();
    })
  });
});
