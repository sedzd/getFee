const {
  fee_structure_with_tiering_count,
  fee_structure_with_tpv_withhold,
  fee_structure_with_flat_rate
} = require('./constant')

const expected = {
  fee: 460.5,
  VAT: 55.26
}
const { getFee } = require('../src/fee')
test('flat Tier with precentage count', () => {
  const req = {
    "type": "DISBURSEMENT",
    "count": 988,
    "volume": 49400000,
    "channel": "BPO",
    "currency": "PHP",
    "country_of_service": "PHILIPPINES",
    "amount": 4500
  }

  expect(getFee(fee_structure_with_tiering_count)(req)).toBe('515.76 PHP')
})

test('tpv tier with tax withhold', () => {

  const req = {
    "type": "DIRECT_DEBIT_PAYMENT",
    "count": 988,
    "volume": 250000,
    "channel": "BPO",
    "currency": "PHP",
    "country_of_service": "PHILIPPINES",
    "amount": 950
  }
  expect(getFee(fee_structure_with_tpv_withhold)(req)).toBe('522.50 PHP')
})

test('skip tpv tier and use flat/precentage tier', () => {

  const req2 = {
    "type": "DIRECT_DEBIT_PAYMENT",
    "count": 988,
    "volume": 250000,
    "channel": "BPO",
    "currency": "PHP",
    "country_of_service": "PHILIPPINES",
    "amount": 1200
  }
  expect(getFee(fee_structure_with_tpv_withhold)(req2)).toBe('143.55 PHP')
})


test('flat rate without tiering', () => {

  const req = {
    "type": "DIRECT_DEBIT_PAYMENT",
    "count": 988,
    "volume": 250000,
    "channel": "BPO",
    "currency": "PHP",
    "country_of_service": "PHILIPPINES",
    "amount": 1200
  }
  expect(getFee(fee_structure_with_flat_rate)(req)).toBe('11.76 PHP')
})