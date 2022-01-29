import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';


const post = checkSchema({
    title: {
        notEmpty: isNotEmpty('title'),
        isString: true,
        isLength: {
            errorMessage: 'Title must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    content: {
        notEmpty: isNotEmpty('content'),
        isString: true,
    },
    privacy: {
        notEmpty: isNotEmpty('privacy'),
        isString: true,
        isIn: {
            errorMessage: 'privacy must be PUBLIC or JUST_FOLLOWERS',
            options: ['PUBLIC', 'JUST_FOLLOWERS']
        }
    },
});
