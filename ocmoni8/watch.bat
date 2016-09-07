@echo off
rd dist /s /q
webpack --config webpack.config.dev.js  --watch