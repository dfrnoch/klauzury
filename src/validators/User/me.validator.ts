import { checkSchema } from 'express-validator';


const profile = checkSchema({
    bio: {
        isString: true,
        isLength: {
            options: { max: 255 },
            errorMessage: 'field \'bio\' must be between 0 and 255 characters'
        },
    },
    color: {
        isString: true,
        isHexColor: {
            errorMessage: 'field \'color\' must be a valid hex color'
        }
    }
});

export const meValidator = { profile };