// Frontend-only: WebSocket is disabled for demonstration
class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
    this.isConnected = false;
    this.url = null;
  }

  connect(url) {
    // Frontend-only: Simulate connection after delay
    console.log('Frontend-only: Simulating WebSocket connection');
    this.url = url;
    
    setTimeout(() => {
      this.isConnected = true;
      this.emit('connected');
    }, 500);
  }

  disconnect() {
    this.isConnected = false;
    this.emit('disconnected');
  }

  send(data) {
    // Frontend-only: Log but don't send
    console.log('Frontend-only: WebSocket send (simulated)', data);
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

// Singleton instance
const websocketService = new WebSocketService();

export default websocketService;
