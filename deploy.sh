#!/bin/bash
npm install
npm run build
git init
git remote add origin https://github.com/ezrafchev/flor-ana-clara-by-esdra.git
git add .
git commit -m "✨ Deploy automático"
git push -f origin main
echo "✅ Deploy finalizado: https://ezrafchev.github.io/flor-ana-clara-by-esdra/"
