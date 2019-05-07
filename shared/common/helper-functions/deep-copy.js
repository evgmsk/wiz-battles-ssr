export default function deepCopy(obj) {
    if(typeof obj !== 'object')
        return obj;
    const newObj = {};
    for(let prop in obj) {
        if (obj.hasOwnproperty(prop)) {
            const value = obj[prop];
            if (typeof value !== 'object') {
                newObj[prop] = value;
            } else if (!Array.isArray(value)) {
                newObj[prop] = deepCopy(value);
            } else {
                newObj[prop] = value.map(v => deepCopy(v));
            }
        }
    }
    return newObj;
}
