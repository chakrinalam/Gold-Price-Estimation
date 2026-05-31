# Gold Price Estimator

A responsive Indian gold jewelry price calculator built with HTML, CSS, and vanilla JavaScript. It estimates base value, making charges, GST, and final price using an India-calibrated 24K rate that refreshes automatically when the browser can reach the external data sources.

## Features

- Live calculation as values change
- Auto-refreshing estimated Indian 24K rate
- Common purity options: 24K, 22K, 18K, and 14K
- Making charges and 3% GST included in the total
- Indian currency formatting
- Responsive layout for mobile and desktop screens
- No build tools or external JavaScript dependencies

## How to Use

1. Open `index.html` in a modern browser.
2. Enter the gold weight in grams.
3. Select the purity.
4. Let the app fetch the live 24K rate, or enter the current 24K rate per gram manually.
5. Review the estimated base value, charges, GST, and final price.

## Market Data

The app fetches live XAU gold spot data from `https://api.gold-api.com/price/XAU` and USD-INR data from `fawazahmed0/currency-api` on jsDelivr. It converts the raw spot rate to INR per gram and applies an Indian market calibration so the calculator stays aligned with present and future Indian-market estimates.

If either external service is unavailable, the calculator keeps working with the last visible/manual Indian 24K rate.

## Files

- `index.html` - Page structure and calculator markup
- `style.css` - Responsive visual design
- `script.js` - Calculator logic and validation

## Notes

This app is an estimator. Actual jewelry pricing can vary by city, jeweler, wastage charges, hallmarking, taxes, discounts, and store margins.
