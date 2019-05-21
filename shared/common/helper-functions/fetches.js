
export const fetchForm = (email, password) => {
    return fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(error => error).then(res => res);
};

export const getVocabulary = () => {
    return fetch('/vocabulary', { method: 'get' })
        .then(response => {
            return response.json();
        })
        .catch(e => { console.log(e); })
        .then(vocabulary => vocabulary);
};

export const fetchOnClose = (shapes) => {
    return fetch('/saveShapes', {
        method: 'POST',
        body: JSON.stringify(shapes),
        headers: {
            'Content-Type': 'application/json',
        },
    }).catch(error => error).then(res => {
        console.log(res);
    });
};
