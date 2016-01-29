module.exports = [
  {
    name: "Inventory",
    target: "inventory",
    children: [{
        name: 'Test',
        target: 'inventory/test',
        icon: 'test-icon.png',
        message: 12
      }
    ]
  }, {
    name: "Installation",
    target: "installation",
    children: []
  }, {
    name: "Maintenance",
    target: "maintenance",
    children: []
  }, {
    name: "Connectivity",
    target: "connectivity",
    children: []
  }
]