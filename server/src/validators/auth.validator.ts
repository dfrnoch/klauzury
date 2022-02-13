import { checkSchema } from 'express-validator';
import { isNotEmpty } from './lib/is-not-empty';

const register = checkSchema({
    username: {
        notEmpty: isNotEmpty('username'),
        isString: true,
        isLength: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        },
        isAlphanumeric: {
            errorMessage: 'field \'username\' must be alphanumeric',
            options: 'en-US'
        }
    },
    email: {
        notEmpty: isNotEmpty('email'),
        isString: true,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    },
    password: {
        notEmpty: isNotEmpty('password'),
        isString: true,
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    }
});

const login = checkSchema({
    username: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    email: {
        optional: true,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    },
    password: {
        isString: true,
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    }
});

const updatePassword = checkSchema({
    password: {
        notEmpty: isNotEmpty('password'),
        isString: true
    },
    newpassword: {
        notEmpty: isNotEmpty('newpassword'),
        isString: true,
        isLength: {
            errorMessage: 'field \'newpassword\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    },
});

const updateEmail = checkSchema({
    email: {
        notEmpty: isNotEmpty('email'),
        isString: true,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    }
});

export const authValidator = {
    login,
    register,
    updateEmail,
    updatePassword
};