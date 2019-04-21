/**
 * project new-wiz-bat
 */

const validators = {
    name: {
        validator: value => {
            if (!value)
                return {msg: 'Name is required.'};
            return (/\w{2,}/.test(value) && value.trim().length > 1) ? null : {msg: 'Invalid name.'};
        },
        required: true,
    },
    email: {
        validator: value => {
            const Value = value.trim();
            if (!Value)
                return {msg: 'Email is required.'};
            return /^\w+@\w+\.\w{1,3}$/.test(Value) ? null : {msg: 'Invalid email.'};
        },
        required: true,
    },
    password: {
        validator: value => {
            const Value = value.trim();
            if (!Value)
                return { msg: 'Password is required.' };
            if (Value.length < 8)
                return { msg: 'Password too short.' };
            if (!/(?:\w+[!&^%$#*@])|(?:[!&^%$#*@]\w+)/g.test(Value))
                return { msg: 'Password insecure. Add special character' };
            return null;
        },
        required: true,
    },
};

export default validators;
