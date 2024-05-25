// Importaciones necesarias
import io from 'socket.io-client';
import { processKrakenData } from '../workers/kraken';
import { updateAssetsPrices, updateBalances } from '../store/actions';

const socketUrl = 'http://172.28.160.1:8000';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.dispatch = null;
    this.userId = null;
    this.lastProcessedData = null;
  }

  processIncomingData(data) {
    const newData = JSON.stringify(data);
    if (this.lastProcessedData !== newData) {
      this.lastProcessedData = newData;
      return true;
    }
    return false;
  }

  connect(dispatch) {
    this.dispatch = dispatch;
    console.log('Attempting to connect to WebSocket');
    if (!this.socket) {
      this.socket = io(socketUrl, {
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      if (this.socket) {
        this.setupListeners();
      } else {
        console.error('Failed to initialize socket connection.');
      }
    }
  }

  setupListeners() {
    this.socket.on('connect', () => {
      console.log('WebSocket Connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket Disconnected. Attempting to reconnect...');
    });

    this.socket.on('kraken-data', (data) => {
      if (this.processIncomingData(data)) {
        const processedData = processKrakenData(data);
        if (processedData) {
          this.dispatch(updateAssetsPrices(processedData));
        }
      }
    });

    this.socket.on('kraken-ohlc', (data) => {
      // console.log("OHLC Data:", data);
    });

    this.socket.on('balance-update', (balances) => {
      console.log('llega la respuesta?', balances);
      this.dispatch(updateBalances(balances));
    });
  }

  subscribeToBalanceUpdate(userId) {
    this.userId = userId;
    if (this.socket && this.userId) {
      console.log('Subscribing to balance updates for userId:', this.userId);
      this.socket.emit('subscribeToBalanceUpdate', { userId: this.userId });
      this.requestBalanceUpdate();
    }
  }

  requestBalanceUpdate() {
    if (this.socket && this.userId) {
      console.log('Requesting balance update for userId:', this.userId);
      this.socket.emit('requestBalanceUpdate', { userId: this.userId });
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting from WebSocket');
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const instance = new WebSocketService();
Object.freeze(instance);

export default instance;
