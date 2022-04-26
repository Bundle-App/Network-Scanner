export default () => ({
    port: parseInt(process.env.PORT) || 3000,
    etherScanUrl: process.env.ETHERSCAN_URL,
    etherScanApiToken: process.env.ETHERSCAN_API_TOKEN,
});
  
