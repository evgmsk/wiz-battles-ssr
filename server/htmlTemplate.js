/**
 * project new-wiz-bat
 */
module.exports = function makeHtmlTemplate( reactDom, redux_state = null, cssChunks=["./css/start.css"], jsChunks=["./js/start.js"], title="wiz-battle-home") {
    const css = cssChunks.reduce((acc, chunk) => acc + `<link rel="stylesheet" type="text/css" href=${chunk} />`, ``);
    const js = jsChunks.reduce((acc, chunk) => acc + `<script src=${chunk}></script>`, ``);

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=2,maximum-scale=1" />
            <title>${title}</title>
            <link rel="icon" href="assets/images/favicon.ico?v=1.1">
            ${css}
        </head>
        <body>
            <div id="root">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify(redux_state) }
            </script>
            ${js}
        </body>
        </html>
    `;
};
