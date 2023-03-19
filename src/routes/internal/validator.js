const { check, validationResult } = require('express-validator');

exports.retrieveFormValidator = [
    check('formId').isString().withMessage('formId must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ ok: false, errors: errors.array() });
        }
        return next();
    }
];