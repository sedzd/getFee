const { getFee } = require("./fee");
const { feeStructure } = require("../config");
const Joi = require("@hapi/joi");

const schema = Joi.object({
  type: Joi.string(),
  count: Joi.number().required(),
  volume: Joi.number().required(),
  channel: Joi.string(),
  currency: Joi.string().required(),
  country_of_service: Joi.string(),
  amount: Joi.number().required(),
});

exports.getFeeCtrl = (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) throw new Error(error);
  res.json({
    totalFee: getFee(feeStructure)(req.body),
  });
};
