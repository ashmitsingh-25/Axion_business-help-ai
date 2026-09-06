# 🌟 NURA — Intelligent Business AI Platform

> **Quality products. Smarter shopping. Autonomous business intelligence.**  
> Transforming raw business and e-commerce data into predictive insights, automated decisions, and risk-mitigated operations.

🌐 **Live Website:** [https://ashmitsingh-25.github.io/Nura_Business_ai_help/](https://ashmitsingh-25.github.io/Nura_Business_ai_help/)

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Key Features & Capabilities](#-key-features--capabilities)
  - [1. Customer E-Commerce Storefront](#1-customer-e-commerce-storefront)
  - [2. Intelligent Returns & AI Decision System](#2-intelligent-returns--ai-decision-system)
  - [3. Executive Admin Intelligence Center](#3-executive-admin-intelligence-center)
  - [4. Predictive Analytics & Forecasting](#4-predictive-analytics--forecasting)
  - [5. AI Business Assistant & Action Center](#5-ai-business-assistant--action-center)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [File Structure](#-file-structure)
- [Running Locally](#-running-locally)
- [Deployment](#-deployment)

---

## 🚀 Overview

**NURA** bridges the gap between customer-facing retail operations and back-office executive intelligence. Built with modern web standards, NURA provides a dual interface:
1. **Consumer Experience**: A modern, responsive luxury-lifestyle e-commerce storefront with real-time cart management, order tracking, and instant AI returns assistance.
2. **Business Control Center**: An enterprise-grade AI analytics dashboard with real-time revenue visualization, inventory restocking alerts, dynamic price-elasticity simulations, supplier risk scoring, and automated multi-agent actions.

---

## ✨ Key Features & Capabilities

### 1. Customer E-Commerce Storefront
- **Dynamic Catalog**: Interactive product filtering by category (Apparel, Footwear, Accessories), pricing, and real-time inventory availability.
- **Seamless Cart & Checkout**: Live cart badge updates, interactive promo codes, subtotal/shipping calculations, and instant order generation.
- **Customer Portal**: View past orders, track shipment stages, and initiate returns with smart diagnostic surveys.

### 2. Intelligent Returns & AI Decision System
- **Automated Policy Routing**: Dynamically evaluates product condition, customer history, return reasons, and profitability.
- **Smart Refund & Restock Suggestions**: Suggests instant replacements, store credit incentives, or standard return approvals based on margin impact.

### 3. Executive Admin Intelligence Center
- **Key Performance Metrics**: Live monitoring of Total Revenue, Gross Margins, Return Rate %, Customer Lifetime Value (LTV), and Restock Alerts.
- **Interactive Visualizations**: High-performance Chart.js graphs displaying 7-day vs 30-day revenue trends, return rate distribution, and profit margin analysis.
- **Supplier & Inventory Optimizer**: Real-time supplier lead-time tracking, out-of-stock risk alerts, and one-click bulk reorder triggers.

### 4. Predictive Analytics & Forecasting
- **Demand Forecasting**: Machine-learning driven predictions for next-quarter SKU demand.
- **Dynamic Pricing Simulator**: Test price changes against demand elasticity curves to maximize revenue and gross margin.
- **Risk Detection Engine**: Proactively detects anomalous return spikes, fraudulent chargeback patterns, and shipping bottlenecks.

### 5. AI Business Assistant & Action Center
- **Interactive Multi-Turn Chat**: Ask natural language business queries like *"What is our fastest moving product?"*, *"Which supplier has the highest delay risk?"*, or *"Simulate a 10% discount on outerwear"*.
- **Automated Execution**: Execute operational actions (send supplier POs, apply price revisions, trigger customer emails) directly from the platform.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Modern Vanilla CSS3 Design System with Custom Properties & Glassmorphism
- **Charting & Data Viz**: Chart.js (v4.4.0) for dynamic, interactive visual analytics
- **Typography & Icons**: Google Fonts (Inter), Native UTF-8 Geometric Glyphs & SVGs
- **Deployment & CI/CD**: GitHub Pages with automated GitHub Actions Workflow (`.github/workflows/deploy.yml`)

---

## 📂 File Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Actions deployment to GitHub Pages
├── index.html                # Main entry point (NURA Full Application & Admin Intelligence)
├── mainfile.html             # NURA Full Application source
├── axion_landing.html        # AXION Enterprise AI Platform Landing Page
├── style.css                 # Dedicated CSS stylesheet
├── app.js                    # Additional application scripts & Chart helpers
└── README.md                 # Project documentation & overview
```

---

## 💻 Running Locally

No complex build steps or external package managers required!

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ashmitsingh-25/Nura_Business_ai_help.git
   cd Nura_Business_ai_help
   ```

2. **Open in browser:**
   - Double-click `index.html` to open directly in any modern web browser.
   - Or use VS Code **Live Server** / Python HTTP server:
     ```bash
     python -m http.server 8000
     ```
   - Navigate to `http://localhost:8000`.

---

## 🌐 Deployment to GitHub Pages

This project is configured with GitHub Actions for automated deployment.
To enable GitHub Pages manually if needed:
1. Navigate to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions** (or select **Deploy from a branch** -> `main` / `/root`).
3. Your website will be live at:  
   `https://ashmitsingh-25.github.io/Nura_Business_ai_help/`

---

© 2026 **NURA AI Business Intelligence**. Built for modern intelligent retail.
