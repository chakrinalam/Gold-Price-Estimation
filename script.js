const GST_RATE = 0.03;
const TROY_OUNCE_IN_GRAMS = 31.1034768;
const INDIA_MARKET_MULTIPLIER = 1.13;
const GOLD_PRICE_URL = 'https://api.gold-api.com/price/XAU';
const FX_RATE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const REFRESH_INTERVAL = 5 * 60 * 1000;

const form = document.getElementById('calculator-form');
const message = document.getElementById('form-message');
const refreshButton = document.getElementById('refresh-rate');
const marketRate = document.getElementById('market-rate');
const marketMeta = document.getElementById('market-meta');
const fields = {
    weight: document.getElementById('weight'),
    purity: document.getElementById('purity'),
    rate: document.getElementById('rate'),
    making: document.getElementById('making'),
};
const output = {
    base: document.getElementById('base-price'),
    making: document.getElementById('making-charges'),
    gst: document.getElementById('gst'),
    total: document.getElementById('total-price'),
};

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

function readNumber(field) {
    return Number.parseFloat(field.value);
}

function formatCurrency(amount) {
    if (!Number.isFinite(amount)) {
        return currencyFormatter.format(0);
    }

    return currencyFormatter.format(Math.round(amount));
}

function formatDateTime(value) {
    if (!value) {
        return 'just now';
    }

    return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}

function getValues() {
    return {
        weight: readNumber(fields.weight),
        purity: readNumber(fields.purity),
        rate: readNumber(fields.rate),
        makingPercent: readNumber(fields.making),
    };
}

function validate(values) {
    const invalidField = Object.entries(values).find(([, value]) => !Number.isFinite(value) || value < 0);

    if (invalidField) {
        return 'Please enter valid positive values to calculate the estimate.';
    }

    if (values.weight === 0 || values.rate === 0) {
        return 'Weight and rate must be greater than zero.';
    }

    return '';
}

function calculate() {
    const values = getValues();
    const validationMessage = validate(values);

    message.textContent = validationMessage;

    if (validationMessage) {
        return;
    }

    const selectedPurityRate = values.rate * (values.purity / 100);
    const base = values.weight * selectedPurityRate;
    const makingCharges = base * (values.makingPercent / 100);
    const gst = (base + makingCharges) * GST_RATE;
    const total = base + makingCharges + gst;

    output.base.textContent = formatCurrency(base);
    output.making.textContent = formatCurrency(makingCharges);
    output.gst.textContent = formatCurrency(gst);
    output.total.textContent = formatCurrency(total);
}

async function fetchJson(url) {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

async function updateMarketRate() {
    refreshButton.disabled = true;
    marketMeta.textContent = 'Updating Indian market rate...';

    try {
        const [goldData, fxData] = await Promise.all([
            fetchJson(GOLD_PRICE_URL),
            fetchJson(FX_RATE_URL),
        ]);

        const goldPerOunceUsd = Number.parseFloat(goldData.price);
        const usdToInr = Number.parseFloat(fxData.usd?.inr);

        if (!Number.isFinite(goldPerOunceUsd) || !Number.isFinite(usdToInr)) {
            throw new Error('Live rate response was missing price data.');
        }

        const spotRatePerGramInr = (goldPerOunceUsd * usdToInr) / TROY_OUNCE_IN_GRAMS;
        const ratePerGramInr = spotRatePerGramInr * INDIA_MARKET_MULTIPLIER;
        const roundedRate = Math.round(ratePerGramInr);

        fields.rate.value = String(roundedRate);
        marketRate.textContent = `${formatCurrency(roundedRate)} / gram`;
        marketMeta.textContent = `Estimated Indian 24K rate. Updated ${formatDateTime(goldData.updatedAt)}.`;
        calculate();
    } catch (error) {
        marketRate.textContent = `${formatCurrency(readNumber(fields.rate))} / gram`;
        marketMeta.textContent = 'Live rate unavailable. Enter the Indian 24K rate manually.';
        console.error('Unable to update live gold rate:', error);
    } finally {
        refreshButton.disabled = false;
    }
}

form.addEventListener('input', calculate);
form.addEventListener('submit', (event) => event.preventDefault());
refreshButton.addEventListener('click', updateMarketRate);

calculate();
updateMarketRate();
window.setInterval(updateMarketRate, REFRESH_INTERVAL);
