import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';


const post = checkSchema({
    title: {
        notEmpty: isNotEmpty('title'),
        isString: true,
        isLength: {
            errorMessage: 'Title must be between 10 and 128 characters',
            options: { min: 10, max: 128 }
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

const comment = checkSchema({
    content: {
        notEmpty: isNotEmpty('content'),
        isString: true,
        isLength: {
            errorMessage: 'Title must be between 10 and 1000 characters',
            options: { min: 10, max: 1000 } // maybe change 
        }
    }
});


export const postValidator = { post, comment };