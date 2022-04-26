import { port, etherScanUrl, etherScanApiToken } from "./config";



const getTransactions = (networksTransactions) => {
  // filter through the transactions
  const btc = networksTransactions.filter(
    (transaction) => transaction.asset_symbol === "BTC"
  );
  const eth = networksTransactions.filter(
    (transaction) => transaction.asset_symbol === "ETH"
  );
  const usdt = networksTransactions.filter(
    (transaction) => transaction.asset_symbol === "USDT"
  );
  const trx = networksTransactions.filter(
    (transaction) => transaction.asset_symbol === "TRX"
  );

  return { btc, eth, usdt, trx };
};


const getEth = async (ethTrx) => {
  const res = "";
  console.log(res);
};



const getBtc = async (btcTrx) => {
  const res = "";
  console.log(res);
};
const getUsdt = async (usdtTrx) => {
  const res = "";
  console.log(res);
};
const getTrx = async (trxTransactions) => {
  const res = "";
  console.log(res);
};

const { btc, eth, usdt, trx } = getTransactions([]); // destruct the results out to use for other functions

// call functions here
getEth(eth).then((trx) => {
  console.log(trx);
});

getBtc(btc).then((trx) => {
  console.log(trx);
});

getUsdt(usdt).then((trx) => {
  console.log(trx);
});

getTrx(trx).then((trx) => {
  console.log(trx);
});
