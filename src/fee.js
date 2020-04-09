const _ = require("lodash");
const { builder } = require("./builder");

exports.getFee = (feeStructure) => (req) =>
  _.flow([
    builder.formatFeeStructure,
    builder.getTierByVol(req),
    builder.applyMicropayments(req),
    builder.getTierByCount(req),
    builder.applyFlatTier(),
    builder.applyPerecentTier(req),
    builder.applyFlatRate(),
    builder.applyTaxVat(),
    builder.applyTaxWithHold(),
    builder.getTotalFee(req),
  ])(feeStructure);
