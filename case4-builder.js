// Case 4: Custom Burger Ordering App
// Pattern: Builder
//
// I chose the Builder pattern because a burger has many optional parts and can be configured in different ways.
//  The Builder allows us to create the burger step by step without using a large and confusing constructor.

class Burger {
  constructor(bun, patty, pattyCount, cheese, toppings, sauces, combo) {
    this.bun = bun;
    this.patty = patty;
    this.pattyCount = pattyCount;
    this.cheese = cheese;
    this.toppings = toppings;
    this.sauces = sauces;
    this.combo = combo;
  }

  describe() {
    const parts = [`${this.pattyCount}x ${this.patty}`, `${this.bun} bun`];
    if (this.cheese) parts.push(this.cheese);
    if (this.toppings.length)
      parts.push(`toppings: ${this.toppings.join(", ")}`);
    if (this.sauces.length) parts.push(`sauces: ${this.sauces.join(", ")}`);
    return `Burger: ${parts.join(", ")}${this.combo ? " + combo meal" : ""}`;
  }
}

class BurgerBuilder {
  constructor() {
    // Sensible defaults so a burger can be partial and still works.
    this.bun = "classic";
    this.patty = "beef";
    this.pattyCount = 1;
    this.cheese = null;
    this.toppings = [];
    this.sauces = [];
    this.combo = false;
  }

  setBun(bun) {
    this.bun = bun;
    return this;
  }

  setPatty(patty) {
    this.patty = patty;
    return this;
  }

  setPattyCount(count) {
    this.pattyCount = count;
    return this;
  }

  addCheese(type) {
    this.cheese = type;
    return this;
  }

  addTopping(topping) {
    if (this.toppings.length >= 5) {
      throw new Error(`Max 5 toppings, cannot add ${topping}.`);
    }

    this.toppings.push(topping);
    return this;
  }

  addSauce(sauce) {
    this.sauces.push(sauce);
    return this;
  }

  setCombo(combo) {
    this.combo = combo;
    return this;
  }

  build() {
    if (!Number.isInteger(this.pattyCount) || this.pattyCount < 0) {
      throw new Error("Patty count must be a whole number.");
    }
    if (this.patty === "none" && this.pattyCount > 0) {
      throw new Error("A burger with no patty cannot have a patty count.");
    }
    return new Burger(
      this.bun,
      this.patty,
      this.pattyCount,
      this.cheese,
      [...this.toppings],
      [...this.sauces],
      this.combo,
    );
  }
}

// Preset burgers share the same builder process.
class BurgerPresets {
  static createClassicMeal() {
    return new BurgerBuilder()
      .setBun("sesame")
      .setPatty("beef")
      .addCheese("american")
      .addTopping("lettuce")
      .addTopping("tomato")
      .addSauce("ketchup")
      .setCombo(true)
      .build();
  }

  static createVeggieDeluxe() {
    return new BurgerBuilder()
      .setBun("whole wheat")
      .setPatty("veggie")
      .addCheese("swiss")
      .addTopping("lettuce")
      .addTopping("tomato")
      .addTopping("avocado")
      .addTopping("onion")
      .addSauce("garlic aioli")
      .build();
  }
}

// Main demonstration.

const custom = new BurgerBuilder()
  .setBun("brioche")
  .setPatty("beef")
  .setPattyCount(2)
  .addCheese("cheddar")
  .addTopping("lettuce")
  .addTopping("tomato")
  .addSauce("mayo")
  .setCombo(true)
  .build();

console.log("Custom burger:", custom.describe());
console.log("Classic Meal:", BurgerPresets.createClassicMeal().describe());
console.log("Veggie Deluxe:", BurgerPresets.createVeggieDeluxe().describe());

// Constraint checks.
try {
  new BurgerBuilder().setPatty("none").setPattyCount(2).build();
} catch (error) {
  console.log("\nInvalid:", error.message);
}

try {
  const tooMany = new BurgerBuilder()
    .addTopping("a")
    .addTopping("b")
    .addTopping("c")
    .addTopping("d")
    .addTopping("e")
    .addTopping("f");
  tooMany.build();
} catch (error) {
  console.log("Invalid:", error.message);
}
