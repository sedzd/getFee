exports.feeStructure = [
  {
    "type": "TIERING_COUNT",
    "tiers": [
      {
        "count": 1000
      },
      {
        "count": 2000
      }
    ]
  },
  {
    "type": "TIERING_TPV",
    "tiers": [
      {
        "volume_ceiling": 100000
      },
      {
        "volume_ceiling": 200000
      }
    ]
  },
  {
    "type": "TIERING_MICROPAYMENTS_PERCENTAGE",
    "omit_type": [
      "TIERING_FLAT",
      "TIERING_PERCENTAGE"
    ],
    "tiers": [
      {
        "amount_ceiling": 1000,
        "fee": 0.7
      },
      {
        "amount_ceiling": 1000,
        "fee": 0.6
      },
      {
        "amount_ceiling": 1000,
        "fee": 0.5
      }
    ]
  },
  {
    "type": "TIERING_FLAT",
    "tiers": [
      {
        "fee": 10.5
      },
      {
        "fee": 10.5
      },
      {
        "fee": 10.5
      }
    ]
  },
  {
    "type": "TIERING_PERCENTAGE",
    "tiers": [
      {
        "fee": 0.1
      },
      {
        "fee": 0.1
      },
      {
        "fee": 0.1
      }
    ]
  },
  {
    "type": "TAX_VAT",
    "fee": 0.12
  },
  {
    "type": "TAX_WITHOLDING",
    "fee": 0.02
  }
];