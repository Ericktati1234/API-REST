const express = require('express');
const router = express.Router();
//Creamos un router para definir las rutas de la API

// SUmar n1 + n2
// SUmar requiere 2 parametros, los cuales seran extraidos de la ruta "results/n1/n2"
router.get('/results/:n1/:n2', (req, res) => {
  const n1 = req.params.n1;
  const n2 = req.params.n2;
  const result = n1 + n2;
  res.json({result}); 
});

//Multiplicar n1 * n2
//Los parametros se añadiran en el body de request. Utilizaremos la opcion de x-www-form-urlencoded,
// para enviar los parametros, por su facilidad visual de enviar los datos
router.post('/results', (req, res) => {
  const { n1, n2 } = req.body; //Extraemos del body los parametros con estos nombres
  const result = n1 * n2;
  res.json({result});
});


// De igual manera como en la multiplicacion, enviaremos los parametros en el body
router.put('/results', (req, res) => {
  const { n1, n2 } = req.body; //Importante enviar los parametros con el mismo nombre
  if (n2 === 0) {
    return res.json({ error: 'No se puede dividir por cero' }); //Nos retorna con un formato JSON el mensaje de error
  }else{
    const result = n1 / n2;
    res.json({result});
  }
});

// Potencia n1 ^ n2
// La funcion de pow toma el primer parametro que enviamos y lo multiplica con si mismo la cantidad de veces
// que especifica el segundo valor
router.patch('/results', (req, res) => {
  const { n1, n2 } = req.body;
  const result = Math.pow(n1, n2);
  res.json({ result });
});

// Restar n1 - n2
router.delete('/results/:n1/:n2', (req, res) => {
  const n1 = req.params.n1;
  const n2 = req.params.n2;
  const result = n1 - n2;
  res.json({ result });
});

module.exports = router;
