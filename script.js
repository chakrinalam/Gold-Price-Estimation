const inputs = document.querySelectorAll('input, select');
const resultDiv = document.getElementById('result');

function calculate() {
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const purity = parseFloat(document.getElementById('purity').value) || 100;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const makingPercent = parseFloat(document.getElementById('making').value) || 0;

    const effectiveRate = rate * (purity / 100);
    const base = weight * effectiveRate;
    const makingCharges = base * (makingPercent / 100);
    const gst = (base + makingCharges) * 0.03;
    const total = base + makingCharges + gst;

    document.getElementById('base-price').textContent = '₹' + Math.round(base).toLocaleString();
    document.getElementById('making-charges').textContent = '₹' + Math.round(makingCharges).toLocaleString();
    document.getElementById('gst').textContent = '₹' + Math.round(gst).toLocaleString();
    document.getElementById('total-price').textContent = '₹' + Math.round(total).toLocaleString();

    resultDiv.style.display = 'block';
}

// Update on every change (live)
inputs.forEach(input => {
    input.addEventListener('input', calculate);
});

// Initial calculation
calculate();