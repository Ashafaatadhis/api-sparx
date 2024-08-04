"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.postValidationRules = exports.editValidationRules = void 0;
const express_validator_1 = require("express-validator");
const postValidationRules = () => {
    return [
        (0, express_validator_1.check)("genreName")
            .isString()
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("genreName is required"),
    ];
};
exports.postValidationRules = postValidationRules;
const editValidationRules = () => {
    return [
        (0, express_validator_1.check)("genreName")
            .isString()
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage("genreName is required"),
    ];
};
exports.editValidationRules = editValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ status: 500, errors: errors.array() });
    }
    req.body = (0, express_validator_1.matchedData)(req, { onlyValidData: true });
    next();
};
exports.validate = validate;
