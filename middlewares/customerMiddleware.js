import insertCustomerSchema from "./../schemas/insertCustomerSchema.js";

export async function customerValidation(req, res, next) {
    const validation = insertCustomerSchema.validate(req.body, {abortEarly: false});
    if( validation?.error ) {
        const arrayError = validation.error.details;
        return res.status(400).send(arrayError.map((item) => {return item.message}));
    }

    next();
}