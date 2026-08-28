// Case 2: Payment Method Handler
// Pattern: Factory Method
//
// chose the Factory Method pattern because the application supports different payment types,
// and each type has its own class and processing logic.
// The factory creates the correct payment object based on the payment type,
// so the checkout code does not need to know which class to instantiate.
class CreditCardPayment {
  constructor(cardNumber, amount) {
    this.type = "credit_card";
    this.cardNumber = cardNumber;
    this.amount = amount;
  }

  validate() {
    return this.cardNumber.length >= 12;
  }

  process() {
    console.log(
      `Charging $${this.amount} to card ending in ${this.cardNumber.slice(-4)}`,
    );
  }
}

class PayPalPayment {
  constructor(email, amount) {
    this.type = "paypal";
    this.email = email;
    this.amount = amount;
  }

  validate() {
    return this.email.includes("@");
  }

  process() {
    console.log(`Charging $${this.amount} from PayPal account ${this.email}`);
  }
}

class CryptoPayment {
  constructor(wallet, amount) {
    this.type = "crypto";
    this.wallet = wallet;
    this.amount = amount;
  }

  validate() {
    return this.wallet.length >= 26;
  }

  process() {
    console.log(`Charging $${this.amount} to wallet ${this.wallet}`);
  }
}

class PaymentFactory {
  static createPayment(type, amount, info) {
    if (type === "credit_card") {
      return new CreditCardPayment(info, amount);
    }
    if (type === "paypal") {
      return new PayPalPayment(info, amount);
    }
    if (type === "crypto") {
      return new CryptoPayment(info, amount);
    }
    throw new Error(`Unknown payment type: ${type}`);
  }
}

// Main demonstration.

const types = [
  {
    type: "credit_card",
    info: "4111111111111111",
    amount: 50,
  },
  {
    type: "paypal",
    info: "buyer@example.com",
    amount: 100,
  },
  {
    type: "crypto",
    info: "0xAbc1234567890Def4567890Abc",
    amount: 150,
  },
];

types.forEach((obj) => {
  const payment = PaymentFactory.createPayment(obj.type, obj.amount, obj.info);
  console.log(`\nProcessing ${obj.type}:`);
  console.log("  valid:", payment.validate());
  payment.process();
});

// Unsupported types should fail with a clear message.
try {
  PaymentFactory.createPayment("apple_pay", 10, "apple");
} catch (error) {
  console.log("\nError:", error.message);
}
