// src/services/websocketService.js
import io from "socket.io-client";
import { processKrakenData } from "../workers/kraken";
import { updateAssetsPrices, updateBalances } from "../store/actions";
const socketUrl = "http://192.168.0.92:8000";

class WebSocketService {
  constructor() {
    this.socket = null;
  }

  connect(dispatch) {
    this.socket = io(socketUrl);
    this.socket.on("kraken-data", (data) => {
      const processedData = processKrakenData(data);
      if (processedData) {
        dispatch(updateAssetsPrices(processedData));
      }
    });
    this.socket.on("balance-update", (balances) => {
      console.log("balance-update", balances);
      dispatch(updateBalances(balances));
    });
  }

  requestBalanceUpdate(userId) {
    if (this.socket) {
      this.socket.emit("requestBalanceUpdate", { userId });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
