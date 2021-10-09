const fs = require('fs')
const svgToDataURL = require('svg-to-dataurl')

var html = `<head><style>td {text-align: center;}</style></head><body>
<a href="https://github.com/hyperbotauthor/svgicons">Source on GitHub</a>
<hr>
<table style="font-family: monospace" border="1" cellpadding="3"><tr>
<td>File</td><td>Icon</td><td>Raw SVG</td><td>Data Url</td><td>CSS Class</td>
</tr>`

fs.readdir(__dirname + "/SVG", (err, files) => {
    if (err)
        console.log(err);
    else {        
        files.forEach(file => {
            fullFile = `./SVG/${file}`            
            const content = fs.readFileSync(fullFile)
            const url = svgToDataURL(content)
            const row = `
                <tr>
                    <td>${file}</td>
                    <td>${content}</td>
                    <td><textarea>${content}</textarea></td>
                    <td><textarea>${url}</textarea></td>
                    <td><textarea>.${file}{
    background-image: url(${url});
    background-size: cover;
}</textarea></td>
                </tr>
            `        
            html += row
            })
        html += `</table></body>`

        fs.writeFileSync("index.html", html)
    }
})

/*
example css rule

.001-home.svg{
    background-image: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0A%3C!--%20Generated%20by%20IcoMoon.io%20--%3E%0A%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0A%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%0A%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M16%209.226l-8-6.21-8%206.21v-2.532l8-6.21%208%206.21zM14%209v6h-4v-4h-4v4h-4v-6l6-4.5z%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A);
    background-size: cover;
}
*/