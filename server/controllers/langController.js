/**
 * project new-wiz-bat
 */

export const langController = (req, res, next) => {
    const {lang} = req.query;
    console.log(req.url, req.params, req.query, lang);
    res.send('hi');
};
