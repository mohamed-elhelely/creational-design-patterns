// Case 5: ERP System Role Cloner
// Pattern: Prototype
//
// I chose the Prototype pattern because roles are expensive to configure.
// We can clone an existing role and customize the clone without changing
// the original role.

class Role {
  constructor(name) {
    this.name = name;
    this.permissions = [];
    this.widgets = [];
    this.departmentAccess = {};
  }

  addPermission(permission) {
    this.permissions.push(permission);
  }

  addWidget(widget) {
    this.widgets.push(widget);
  }

  clone() {
    const copy = new Role(this.name);

    copy.permissions = [...this.permissions];
    copy.widgets = [...this.widgets];
    copy.departmentAccess = { ...this.departmentAccess };

    return copy;
  }

  show() {
    console.log("Role:", this.name);
    console.log("Permissions:", this.permissions);
    console.log("Widgets:", this.widgets);
    console.log("Department Access:", this.departmentAccess);
  }
}


// Fully configured template role
const accountant = new Role("Accountant");

accountant.addPermission("view_reports");
accountant.addPermission("view_ledger");
accountant.addPermission("edit_reports");

accountant.addWidget("Sales Dashboard");
accountant.addWidget("Finance Dashboard");

accountant.departmentAccess = {
  finance: "full",
  hr: "read",
};


// Clone the Accountant
const seniorAccountant = accountant.clone();

seniorAccountant.name = "Senior Accountant";
seniorAccountant.addPermission("approve_expenses");


// Show results
console.log("Original Role:");
accountant.show();

console.log("\nCloned Role:");
seniorAccountant.show();