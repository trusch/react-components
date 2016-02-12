module.exports = [
  {
    name: "Inventory",
    target: "inventory",
    children: [{
        name: 'SWM',
        target: 'inventory/swm',
        icon: 'swm-icon.png',
        message: 12
      },{
        name: 'EON',
        target: 'inventory/eon',
        icon: 'eon-icon.png',
        message: 10
      },{
        name: 'EDIS',
        target: 'inventory/edis',
        icon: 'edis-icon.png'
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