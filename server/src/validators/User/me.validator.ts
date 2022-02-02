import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

const profile = checkSchema({
    bio: {
        isString: true,
        isLength: {
            options: { max: 255 },
            errorMessage: 'field \'bio\' must be between 0 and 255 characters'
        },
    },
    color: {
        notEmpty: isNotEmpty('color'),
        isString: true,
        isHexColor: {
            errorMessage: 'field \'color\' must be a valid hex color'
        }
    },
    location: {
        isString: true,
        isLength: {
            options: { max: 128 },
            errorMessage: 'field \'location\' must be between 0 and 128 characters'
        }
    },
    website: {
        isString: true,

        isLength: {
            options: { max: 64 },
            errorMessage: 'field \'website\' must be between 0 and 64 characters'
        }
    }
});

export const meValidator = { profile };