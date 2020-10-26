const { body, validationResult } = require('express-validator');

exports.userRegValidator = () => ([
  body('email').isString().isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isString()
]);

exports.userLoginValidator = () => ([
  body('email').isString().isEmail(),
  body('password').isLength({ min: 6 }),
]);

exports.getValidationMessages = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => `${error.param} - ${error.msg}`);
    return errorMessages;
  }
  return undefined;
};
