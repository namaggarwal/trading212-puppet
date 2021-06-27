import Trading212, { TradeType } from './index'

async function test (){
const trading212 = new Trading212('aggarwal.nam@gmail.com', '123');
await trading212.trade({tradeType: TradeType.BUY, quantity: 1});
}

test()