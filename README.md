# ApiTest

[Presentacion](https://drive.google.com/file/d/1KOw4Js5kAUCO_40uv57MPc6b1SUrTco4/view)

## Descripcion
### Endpoints
La api cuenta con 2 endpoints, son simples funciones.
### /api/predict/time
La primera es para predecir el tiempo que tarda todo el proceso.

Para poder predecir el tiempo necesitas rellenar los siguientes queries:
* tractoplanas: Numero de tractoplanas que se tienen
* buques: Numero de buques
* personal: Numero de personal durante el proceso

#### Ejemplo
[Api Test time](http://testerapi-env.7hgja2c7md.us-west-2.elasticbeanstalk.com/api/predict/time?tractoplanas=5&buques=3&personal=10)

#### Return
Regresa un objeto de tipo json el cual contiene 2 variables:
* result: tipo numerico, es el tiempo en segundos sin ser procesado
* timeResult: de tipo cadena, el tiempo ya procesado con el formato: "HH:MM:SS"

### /api/predict/tractoplanas
Este endpoint es para predecir el numero de tractoplanas necesarias.

Para poder predecir las tractoplanas son necesarios los siguientes queries:
* timeM: Tiempo en formato: "HH:MM:SS"
* buques: Numero de buques
* personal: Numero de personal durante el proceso

**Nota:** El timeM debe estar en formato: "HH:MM:SS" por ejemplo a la hora de escribirlo en el querie seria -> 00:07:12 Lo cual representa las horas, los minutos y los segundos

#### Ejemplo
[Api Test tractoplanas](http://testerapi-env.7hgja2c7md.us-west-2.elasticbeanstalk.com/api/predict/tractoplanas?timeM=00:07:41&buques=3&personal=10)

#### Return
Regresa un objeto de tipo json el cual contiene 1 variable:
* result: tipo numerico, es el numero de tractoplanas redondeado al valor entero mas cercano

## Importante
Primero probar el **predict time** antes de **predict tractoplanas**, esto es debido a la ecuacion, si pone un tiempo muy bajo saldra el numero de tractoplanas en negativo. Lo mas recomendable es usar el **predict time** y con ese mismo resultado y queries probarlo con el de tractoplanas para comprar resultados

**Nota:** Para que el numero de tractoplanas no salga con punto flotante se uso la funcion **Math.round()** el cual redondea al entero mas cercano.
