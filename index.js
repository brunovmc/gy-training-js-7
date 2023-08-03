const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = 3000;

function replaceNamesStartingWithA(nome) {
  if (nome && nome[0].toUpperCase() === 'A') {
    return 'INCORRETO';
  }
  return nome;
}

app.get('/read-csv', (req, res) => {
  const nomes = [];

  fs.createReadStream('ibge-fem-10000 (3).csv')
    .pipe(csvParser({ separator: ',' }))
    .on('data', (row) => {
      const nome = replaceNamesStartingWithA(row.nome);
      nomes.push(nome);
      console.log(nome);
    })
    .on('end', () => {
      res.send(nomes);
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
