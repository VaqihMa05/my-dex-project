const fromToken = document.getElementById('fromToken');
const toToken = document.getElementById('toToken');
const fromAmount = document.getElementById('fromAmount');
const swapBtn = document.getElementById('swapBtn');
const swapStatus = document.getElementById('swapStatus');
const connectWallet = document.getElementById('connectWallet');
const accountAddress = document.getElementById('accountAddress');

let dummyWallet = {
  address: '0xDUMMYWALLET1234567890',
  balance: 100
};

connectWallet.onclick = async () => {
  // Dummy connect
  accountAddress.textContent = `Wallet: ${dummyWallet.address}`;
  swapStatus.textContent = '';
};

swapBtn.onclick = () => {
  const from = fromToken.value;
  const to = toToken.value;
  const amount = parseFloat(fromAmount.value);

  if (!amount || amount <= 0) {
    swapStatus.textContent = "Please enter valid amount.";
    return;
  }

  if (from === to) {
    swapStatus.textContent = "Cannot swap same token.";
    return;
  }

  swapStatus.textContent = `Swapped ${amount} ${from} to ${to} (simulasi).`;
};

// Fetch price dari CoinGecko
const tokenMap = {
  ETH: "ethereum",
  USD: "usd-coin",
  WETH: "weth",
  DAI: "dai",
  WSOL: "solana",
  WBNB: "wbnb"
};

async function updatePrices() {
  const ids = Object.values(tokenMap).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    let html = '';
    for (let key in tokenMap) {
      const price = data[tokenMap[key]]?.usd ?? 'N/A';
      html += `<div>${key}: $${price}</div>`;
    }

    document.getElementById('prices').innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

updatePrices();
setInterval(updatePrices, 10000); // Update tiap 10 detik
