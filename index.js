import 'dotenv/config';
import pkg from '@polymarket/clob-client';
import { Wallet } from '@ethersproject/wallet';
import { fileURLToPath } from 'url';
import { RealTimeDataClient } from '@polymarket/real-time-data-client';

const { ClobClient, OrderType } = pkg;
const funder = process.env.FUNDER;
const signer = new Wallet(process.env.PRIVATE_KEY);
const signatureType = 1;
const host = 'https://clob.polymarket.com';
const creds = new ClobClient(host, 137, signer).createOrDeriveApiKey();
const clobClient = new ClobClient(
  host,
  137,
  signer,
  await creds,
  signatureType,
  funder
);

// Cache for tickSize and negRisk
const assetCache = {};

async function getTickSizeAndNegRisk(asset) {
  // Check cache first
  if (assetCache[asset]) {
    return assetCache[asset];
  }

  // If not in cache, call both APIs simultaneously
  const [tickSize, negRisk] = await Promise.all([
    clobClient.getTickSize(asset),
    clobClient.getNegRisk(asset),
  ]);

  // Store in cache
  assetCache[asset] = { tickSize, negRisk };

  return { tickSize, negRisk };
}

async function main() {
  const onMessage = async (_, message) => {
    try {
      const data = message.payload;
      if (data.name == process.env.WHALE) {
        // TODO add more conditions
        const { tickSize, negRisk } = await getTickSizeAndNegRisk(data.asset);
        const price = Number(data.price);
        const amount = price * Number(data.size);
        // TODO update market order or limit order
        // createAndPostOrder use OrderType.GTC or OrderType.GTD and size (shares) is required
        // createAndPostMarketOrder use OrderType.FAK or OrderType.FOK
        await clobClient.createAndPostMarketOrder(
          {
            tokenID: data.asset,
            price: price,
            side: data.side,
            // size: 5,
            amount: amount.toFixed(6),
            // TODO update fee if you need
            feeRateBps: 0.5,
          },
          { tickSize: tickSize, negRisk: negRisk },
          OrderType.FAK
        );
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const onConnect = (client) => {
    // Subscribe to a topic
    client.subscribe({
      subscriptions: [
        {
          topic: 'activity',
          type: 'trades',
        },
      ],
    });
  };

  new RealTimeDataClient({
    onMessage,
    onConnect,
    pingInterval: 10000,
    autoReconnect: true,
  }).connect();
}

// ESM-safe main check. In CommonJS one would use `if (require.main === module)`.
// For ESM we compare the executed script path to this module's file path.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Run main when executed directly
  main().catch((err) => {
    // console.error(err);
    process.exit(1);
  });
}
