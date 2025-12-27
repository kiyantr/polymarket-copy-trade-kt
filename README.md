# 🐋 Polymarket Copy Trade KT

> Automated copy trading bot for Polymarket that monitors and replicates trades from specified whale traders in real-time.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/kiettranvq)

## 📋 Table of Contents

- [🐋 Polymarket Copy Trade KT](#-polymarket-copy-trade-kt)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Overview](#-overview)
  - [✨ Features](#-features)
  - [📦 Prerequisites](#-prerequisites)
  - [🚀 Installation](#-installation)
  - [⚙️ Configuration](#️-configuration)
    - [Environment Variables Explained](#environment-variables-explained)
  - [🎮 Usage](#-usage)
    - [Start the Bot](#start-the-bot)
    - [How It Works](#how-it-works)
    - [Trading Logic](#trading-logic)
  - [📁 Project Structure](#-project-structure)
  - [🛠️ Technologies](#️-technologies)
  - [⚠️ Disclaimer](#️-disclaimer)
  - [🤝 Contributing](#-contributing)
  - [📝 License](#-license)
  - [🔗 Resources](#-resources)
  - [☕ Support ](#-support-)

## 🎯 Overview

Polymarket Copy Trade KT is an automated trading bot that monitors real-time trading activity on Polymarket and automatically copies trades from specified whale traders.

## ✨ Features

- 🔄 **Real-time Monitoring**: Connects to Polymarket's real-time data feed to monitor trading activity
- 🐋 **Whale Tracking**: Automatically copies trades from specified whale traders
- ⚡ **Fast Execution**: Uses FAK (Fill-or-Kill) order type for immediate execution
- 💾 **Smart Caching**: Caches tick size and negative risk data for improved performance
- 🔁 **Auto-reconnect**: Automatically reconnects if connection is lost

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm**
- A **Polymarket account** with API access
- A **wallet** with sufficient funds for trading
- **Polygon network** access (the bot uses Polygon/Matic network)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/polymarket-copy-trade-kt.git
   cd polymarket-copy-trade-kt
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your configuration (see [Configuration](#configuration) below).

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Your wallet's private key (keep this secure!)
PRIVATE_KEY=your_private_key_here

# Funder address (your wallet address)
FUNDER=0xYourWalletAddress

# The whale trader's name to copy trades from
WHALE=whale_trader_name
```

### Environment Variables Explained

- **`PRIVATE_KEY`**: Your Ethereum wallet's private key. This is used to sign transactions. **⚠️ Keep this secret and never commit it to version control!**
- **`FUNDER`**: Your wallet address that will be used to fund trades
- **`WHALE`**: The name/identifier of the whale trader whose trades you want to copy

## 🎮 Usage

### Start the Bot

```bash
pnpm start
```

Or directly with Node.js:

```bash
node index.js
```

### How It Works

1. The bot connects to Polymarket's real-time data feed
2. It subscribes to trading activity events
3. When a trade from your specified whale trader is detected:
   - It checks if the trade is on a BTC up/down 15-minute market
   - It validates the price is above the threshold (0.13)
   - It calculates the order amount based on the whale's trade
   - It executes a matching order using FAK (Fill-or-Kill) order type

### Trading Logic

The bot currently:
- Monitors trades from the specified whale trader
- Filters for BTC up/down 15-minute markets (`btc-updown-15m`)
- Only executes trades when price is above 0.13
- Uses the same side (buy/sell) as the whale's trade
- Calculates order amount as `price × size` from the whale's trade

## 📁 Project Structure

```
polymarket-copy-trade-kt/
├── index.js          # Main application entry point
├── package.json      # Project dependencies and scripts
├── .env              # Environment variables (not in git)
└── README.md         # This file
```

## 🛠️ Technologies

- **[@polymarket/clob-client](https://www.npmjs.com/package/@polymarket/clob-client)**: Polymarket CLOB (Central Limit Order Book) client
- **[@polymarket/real-time-data-client](https://www.npmjs.com/package/@polymarket/real-time-data-client)**: Real-time data streaming client
- **[ethers](https://www.npmjs.com/package/ethers)**: Ethereum library for wallet management
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Environment variable management
- **[ws](https://www.npmjs.com/package/ws)**: WebSocket client for real-time connections

## ⚠️ Disclaimer

**This software is provided for educational and research purposes only. Trading cryptocurrencies and prediction markets involves substantial risk of loss. The authors and contributors are not responsible for any financial losses incurred from using this bot.**

- **Use at your own risk**: Automated trading can result in significant financial losses
- **Test thoroughly**: Always test with small amounts before using real funds
- **Monitor actively**: Don't leave the bot running unattended without monitoring
- **No guarantees**: Past performance does not guarantee future results
- **Compliance**: Ensure you comply with all applicable laws and regulations in your jurisdiction

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Polymarket Documentation](https://docs.polymarket.com/)
- [Polymarket CLOB Client](https://github.com/Polymarket/clob-client)
- [Polygon Network](https://polygon.technology/)

## ☕ Support [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/kiettranvq)

If you find this project useful and would like to support its development, consider buying me a coffee! Your support helps keep this project maintained and improved. 



<a href="https://buymeacoffee.com/kiettranvq" target="_blank"><img src="by-me-a-coffee.png" alt="Buy Me A Coffee" style="height: 196px !important;width: 196px !important;" ></a>

---

**Made with ❤️ for the Polymarket community**

If you find this project useful, please consider giving it a ⭐ on GitHub!

