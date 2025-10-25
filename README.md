# 🌩️ Cloud Weather Dashboard

**Cloud Computing Mini Project** — a lightweight, always-available weather dashboard.

## Live demo
https://aishwarya-moundekar.github.io/weather-dashboard/

## Overview
This static web app is deployed on **GitHub Pages** and fetches live weather data.
- Geocoding: **Open-Meteo geocoding API**
- Weather: **Open-Meteo** (current + hourly)
- Hosting: **GitHub Pages** (static site hosting)

## Features
- Enter a city name or `lat,lon` to fetch current weather.
- Displays current temperature, wind speed, precipitation and the next 24 hours.
- Zero API keys required — fully browser-based.

## Tech stack
- HTML, CSS, JavaScript
- Public APIs: Open-Meteo (geocoding + forecast)
- Hosting: GitHub Pages

## How to run / verify
1. Open the live URL above.
2. Type a city (e.g., `New Delhi`) and click **Get Weather**.
3. Results show in seconds — the site is permanently hosted on GitHub Pages.

## Notes / Extensibility
- Can be extended with a backend (serverless function) to log searches or add authentication.
- Could store user preferences in a small cloud DB (Firebase / DynamoDB).

