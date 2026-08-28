// Case 1: Application Logger
// Pattern: Singleton
// I chose Singleton because all services need to use the same Logger instance to keep all logs in one shared buffer.
class Logger {
  constructor() {
    this.logLevel = "info";
    this.buffer = [];
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  log(message) {
    this.buffer.push(message);
    console.log(message);
  }
}

class AuthService {
  constructor() {
    this.logger = Logger.getInstance();
  }

  login(user) {
    this.logger.log(`User ${user} logged in`);
  }
}

class OrderService {
  constructor() {
    this.logger = Logger.getInstance();
  }

  placeOrder(orderId) {
    this.logger.log(`Order ${orderId} placed`);
  }
}

class PaymentService {
  constructor() {
    this.logger = Logger.getInstance();
  }

  pay(orderId) {
    this.logger.log(`Payment for ${orderId} processed`);
  }
}

const logBuffer = Logger.getInstance();

const auth = new AuthService();
const orders = new OrderService();
const payments = new PaymentService();

console.log(
  "All services share logger:",
  auth.logger === orders.logger && orders.logger === payments.logger,
);

auth.login("Alice");
orders.placeOrder("ORD-100");
payments.pay("ORD-100");

console.log("Buffer:", logBuffer.buffer);
