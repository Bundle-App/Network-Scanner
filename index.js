const { port, etherScanUrl, etherScanApiToken } = require("./config");
const axios = require("axios").default;
const app = require("express")();

require("dotenv").config();

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
  const values = [];
  for (const trx of ethTrx) {
    const { data } = await axios.get(
      `${etherScanUrl}?module=account&action=txlistinternal&txhash=${trx.transaction_hash}&apikey=${etherScanApiToken}`
    );
    if (data.message === "OK") {
      const result = data.result[0];
      if (result) {
        values.push({
          hash: trx.transaction_hash,
          isSameAsEthScan: result.value === trx.value,
          hashValue: trx.value,
          ethScanValue: result.value,
        });
      }
    }
  }
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

app.get("/", (req, res) => {
  res.json({ message: "server up and running" });
});

app.post("/transactions", async (req, res) => {
  let transactions;
  // serialize transactions according to networks
  const { btc, eth, usdt, trx } = getTransactions(req.body.transactions);
  transactions.btc = btc.length > 0 ? getBtc(btc) : [];
  transactions.eth = eth.length > 0 ? getEth(eth) : [];
  transactions.usdt = usdt.length > 0 ? getUsdt(usdt) : [];
  transactions.trx = trx.length > 0 ? getTrx(trx) : [];

  return res.json({
    message: "fetched all transactions",
    data: transactions,
  });
});

app.post("/transactions-by-network", async (req, res) => {
  let transactions = [];
  if (req.query.network === "eth") {
    transactions = await getEth(req.body.transactions);
  }
  return res.json({
    message: "fetched all transactions",
    data: transactions,
  });
});

// start server
app.listen(port, () => {
  console.info("server is up and running: " + port);
});
