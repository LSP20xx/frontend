// src/services/websocketService.js
import io from "socket.io-client";
import { processKrakenData } from "../workers/kraken";
import { updateAssetsPrices, updateBalances } from "../store/actions";

const socketUrl = "http://192.168.0.92:8000";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.dispatch = null;
    this.userId = null;
  }

  connect(dispatch) {
    this.dispatch = dispatch;
    console.log("Attempting to connect to WebSocket");
    if (!this.socket) {
      this.socket = io(socketUrl);
      this.socket.on("kraken-data", (data) => {
        const processedData = processKrakenData(data);
        if (processedData) {
          this.dispatch(updateAssetsPrices(processedData));
        }
      });
      this.socket.on("balance-update", (balances) => {
        this.dispatch(updateBalances(balances));
      });
    }
  }

  subscribeToBalanceUpdate(userId) {
    this.userId = userId;
    if (this.socket && this.userId) {
      this.socket.emit("subscribeToBalanceUpdate", { userId: this.userId });
      this.requestBalanceUpdate();
    }
  }

  requestBalanceUpdate() {
    if (this.socket && this.userId) {
      console.log("Requesting balance update for userId:", this.userId);
      this.socket.emit("requestBalanceUpdate", { userId: this.userId });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const instance = new WebSocketService();
Object.freeze(instance);

export default instance;
