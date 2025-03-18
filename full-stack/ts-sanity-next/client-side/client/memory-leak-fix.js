
// memory-leak-fix.js
const path = require('path');
const { fork } = require('child_process');
const { createServer } = require('http');

// This script manages webpack-dev-server in a child process
// and restarts it if memory usage goes above a threshold
// to prevent memory leaks from accumulating

const MAX_MEMORY_MB = 2048; // Restart if memory exceeds 2GB
const CHECK_INTERVAL = 60000; // Check every minute

function startWebpackDevServer() {
  console.log('Starting webpack-dev-server...');
  
  const webpack = fork(
    path.join(__dirname, 'node_modules/webpack-dev-server/bin/webpack-dev-server.js'),
    ['--config', 'webpack.config.js', '--mode', 'development'],
    { stdio: 'inherit' }
  );
  
  let memoryCheckInterval = setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const usedMemoryMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    
    console.log(`Memory usage: ${usedMemoryMB}MB`);
    
    if (usedMemoryMB > MAX_MEMORY_MB) {
      console.log(`Memory threshold exceeded (${usedMemoryMB}MB), restarting webpack-dev-server...`);
      clearInterval(memoryCheckInterval);
      webpack.kill();
      
      // Give system time to clean up resources
      setTimeout(() => {
        startWebpackDevServer();
      }, 1000);
    }
  }, CHECK_INTERVAL);
  
  webpack.on('exit', (code) => {
    if (code !== null && code !== 0) {
      console.error(`webpack-dev-server exited with code ${code}`);
    }
    clearInterval(memoryCheckInterval);
  });
  
  return webpack;
}

startWebpackDevServer();
