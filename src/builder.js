module.exports.builder = (() => {
  const formatFeeStructure = (feeStructure) =>
    feeStructure.reduce((acc, curr) => {
      acc[curr["type"]] = curr;
      return acc;
    }, {});

  const getTierByVol = ({ volume }) => ({ TIERING_TPV = null, ...rest }) => ({
    ...(TIERING_TPV
      ? {
          tpvTier: TIERING_TPV.tiers
            .map(({ volume_ceiling }) => volume_ceiling)
            .concat(volume)
            .sort((a, b) => a - b)
            .indexOf(volume),
          ...rest,
        }
      : {
          ...rest,
        }),
  });

  const applyMicropayments = ({ amount }) => ({
    tpvTier,
    TIERING_MICROPAYMENTS_PERCENTAGE: tmp = null,
    ...rest
  }) => ({
    ...(tpvTier >= 0 && tmp.tiers[tpvTier]["amount_ceiling"] >= amount
      ? {
          tpvTier,
          fee: tmp.tiers[tpvTier]["fee"] * amount,
          ...rest,
          ...tmp["omit_type"].reduce((acc, curr) => {
            acc[curr] = null;
            return acc;
          }, {}),
        }
      : {
          ...rest,
        }),
  });

  const getTierByCount = ({ count }) => ({
    TIERING_COUNT: tCount = null,
    ...rest
  }) => ({
    ...(tCount
      ? {
          countTier: tCount.tiers
            .map(({ count }) => count)
            .concat(count)
            .sort((a, b) => a - b)
            .indexOf(count),
          ...rest,
        }
      : {
          ...rest,
        }),
  });

  const applyFlatTier = () => ({
    countTier,
    TIERING_FLAT: tFlat = null,
    ...rest
  }) => ({
    ...(countTier >= 0 && tFlat
      ? {
          countTier,
          fee: tFlat.tiers[countTier]["fee"],
          ...rest,
        }
      : {
          ...rest,
        }),
  });

  const applyPerecentTier = ({ amount }) => ({
    countTier,
    TIERING_PERCENTAGE: tPerecentage = null,
    fee = 0,
    ...rest
  }) => ({
    ...(countTier >= 0 && tPerecentage
      ? {
          countTier,
          fee: fee + tPerecentage.tiers[countTier]["fee"] * amount,
          ...rest,
        }
      : {
          ...(fee && { fee }),
          ...rest,
        }),
  });

  const applyFlatRate = () => ({ FLAT: flat = null, ...rest }) => ({
    ...(flat
      ? {
          fee: flat["fee"],
          ...rest,
        }
      : {
          ...rest,
        }),
  });

  const applyTaxVat = () => ({ TAX_VAT: vat = null, fee, ...rest }) => ({
    ...(vat && fee > 0
      ? {
          fee,
          tax: vat["fee"] * fee,
          ...rest,
        }
      : {
          fee,
          ...rest,
        }),
  });

  const applyTaxWithHold = () => ({
    TAX_WITHOLDING: wh = null,
    fee,
    ...rest
  }) => ({
    ...(wh && fee > 0
      ? {
          fee,
          withHold: wh["fee"] * fee,
          ...rest,
        }
      : {
          fee,
          ...rest,
        }),
  });

  const getTotalFee = ({ currency }) => ({ fee, withHold = 0, tax = 0 }) =>
    `${parseFloat(fee + tax - withHold).toFixed(2)} ${currency}`;

  return {
    formatFeeStructure,
    getTierByVol,
    applyMicropayments,
    getTierByCount,
    applyFlatTier,
    applyPerecentTier,
    applyTaxVat,
    applyFlatRate,
    applyTaxWithHold,
    getTotalFee,
  };
})();
