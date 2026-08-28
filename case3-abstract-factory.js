// Case 3: Restaurant Partner Onboarding
// Pattern: Abstract Factory
//
// I chose the Abstract Factory pattern
// because each partnership tier needs a matching set of related objects: MenuListing, CommissionInvoice, and SupportTicket.
// It ensures that all objects belong to the same tier and prevents mixing Standard and Premium products.

class StandardMenuListing {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  describe() {
    return `${this.restaurant} - basic menu listing`;
  }
}

class StandardCommissionInvoice {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.rate = 0.25; // 25% commission
  }

  describe() {
    return `${this.restaurant} invoice - 25% commission`;
  }
}

class StandardSupportTicket {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.priority = "general";
  }

  describe() {
    return `${this.restaurant} support - general priority`;
  }
}

class PremiumMenuListing {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  describe() {
    return `${this.restaurant} - featured menu listing`;
  }
}

class PremiumCommissionInvoice {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.rate = 0.18; // 18% commission
  }

  describe() {
    return `${this.restaurant} invoice - 18% commission + promo credits`;
  }
}

class PremiumSupportTicket {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.priority = "priority";
  }

  describe() {
    return `${this.restaurant} support - priority`;
  }
}

class StandardPartnerFactory {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  createMenuListing() {
    return new StandardMenuListing(this.restaurant);
  }

  createCommissionInvoice() {
    return new StandardCommissionInvoice(this.restaurant);
  }

  createSupportTicket() {
    return new StandardSupportTicket(this.restaurant);
  }
}

class PremiumPartnerFactory {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  createMenuListing() {
    return new PremiumMenuListing(this.restaurant);
  }

  createCommissionInvoice() {
    return new PremiumCommissionInvoice(this.restaurant);
  }

  createSupportTicket() {
    return new PremiumSupportTicket(this.restaurant);
  }
}

// Onboarding works the same for both tiers. It just asks the factory for a
// menu listing, an invoice and a support ticket - it never knows the tier.
function onboardRestaurant(factory) {
  return {
    menuListing: factory.createMenuListing(),
    invoice: factory.createCommissionInvoice(),
    supportTicket: factory.createSupportTicket(),
  };
}

function showTier(name, factory) {
  const setup = onboardRestaurant(factory);
  console.log(`${name} partner:`);
  console.log("  " + setup.menuListing.describe());
  console.log("  " + setup.invoice.describe());
  console.log("  " + setup.supportTicket.describe());
}

// Main demonstration.

showTier("Standard", new StandardPartnerFactory("Golden Wok"));
showTier("Premium", new PremiumPartnerFactory("Sushi Master"));

// Each factory only ever produces its own tier's products.
const standard = new StandardPartnerFactory("Test");
console.log(
  "\nStandard factory makes standard products only:",
  standard.createMenuListing() instanceof StandardMenuListing,
);
