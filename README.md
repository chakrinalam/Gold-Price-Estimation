# Gold Price Estimator

A beautiful, modern, and user-friendly **Gold Price Calculator** web application built with pure **HTML, CSS, and JavaScript**.  
Instantly calculate the value of your gold jewelry including base price, making charges, and GST (3%).


## ✨ Features

- Real-time / live price calculation (updates as you type)
- Supports multiple purity levels (24K, 22K, 18K, 14K)
- Includes Making Charges (%) and 3% GST calculation
- Elegant dark purple cosmic theme with glassmorphism card
- Pulsing sparkle effect on the gold rings logo
- Fully responsive (mobile, tablet, desktop)
- No external frameworks or libraries required
- Easy to customize (change logo, colors, GST rate, etc.)


## 🚀 Demo
You can try a live version here:  
🔗 Live Demo:[https://pravallikadadi.github.io/Gold-Price-Estimation-UI/]
🔗 GitHub Repo:[https://github.com/Pravallikadadi/Gold-Price-Estimation-UI/]

Or just open `index.html` in any modern browser — no installation needed!

## 🛠️ Technologies Used

- HTML5
- CSS3 (Gradients, Glassmorphism, Animations, Flexbox/Grid)
- Vanilla JavaScript (DOM manipulation & event listeners)

## 📋 How to Use

1. **Clone or download** this repository
2. Open `index.html` in your browser (Chrome, Firefox, Edge, etc.)
3. Enter your values:
   - Weight in grams
   - Purity (select from dropdown)
   - Current rate per gram
   - Making charges percentage
4. See the result update **instantly** (base price + making + GST + total)
   
# What .rings-container means in this code
Why we use a "ring container" here:
1.Grouping related elements
The image (.rings-image) + sparkle effect (.sparkle) belong together.
Putting them inside one parent <div class="rings-container"> makes it easy to:
Center them together
Apply relative positioning (position: relative;)
2.Add animations/effects to the whole group
Positioning the sparkle overlay
The sparkle is an absolute-positioned layer that sits on top of the image.
Without a relative container, the sparkle would position relative to the whole page (which looks wrong).
position: relative on .rings-container makes the sparkle stay inside the image boundaries.
3.Styling & animations
We can easily apply margin, box-shadow, or hover effects to the entire "ring logo" block.

# What .sparkle does exactly

*HTML<div class="sparkle"></div>*

-A soft white glow starts in the center of the ring image
-The glow slowly brightens → dims → brightens again (over 6 seconds, repeating forever)
-It also very slightly grows and shrinks (scale(1) → scale(1.08) → back)
-Result: gentle pulsing shine, giving the impression of light reflecting off diamonds or polished gold
