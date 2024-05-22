self.addEventListener('message', (e) => {
  const { action, userId } = e.data;
  switch (action) {
    case 'start':
      self.interval = setInterval(() => {
        webSocketService.requestBalanceUpdate(userId);
        postMessage(`Requested balance update for userId: ${userId}`);
      }, 2000);
      break;
    case 'stop':
      clearInterval(self.interval);
      postMessage('Stopped balance updates');
      break;
    default:
      break;
  }
});
