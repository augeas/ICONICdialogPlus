#! /bin/sh
npx expo export -p web && npx workbox-cli generateSW workbox-config.js
