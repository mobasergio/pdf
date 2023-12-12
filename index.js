const express = require('express');
const ejs = require('ejs');
const pdf = require('html-pdf');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/generate-pdf', (req, res) => {
    ejs.renderFile(__dirname + '/views/index.ejs', {}, {}, (err, html) => {
        if (err) {
            res.status(500).send('Error al renderizar la vista: ' + err);
        } else {
            const options = { format: 'A4' };
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) {
                    res.status(500).send('Error al crear el PDF: ' + err);
                } else {
                    res.type('pdf');
                    res.send(buffer);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
