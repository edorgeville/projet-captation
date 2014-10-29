# Projet Captation
## Par [Ruby-Maude Rioux](http://ca.linkedin.com/pub/ruby-maude-rioux/5a/3b9/b5a) et [Erwan d'Orgeville](http://erwandorgeville.com)

### Description

Dans le cadre du deuxième travail du cours EDM4640, nous avons créé un monde dont les éléments sont contrôlés par trois senseurs reliés à un Arduino Leonardo. 

### Usage

#### Serveur

Pour lancer le serveur, exécuter les commandes suivantes :
```
npm install
node server.js
```

#### Client Arduino

Pour démarrer le client Arduino <--> serveur, éxécuter les commandes suivantes dans l'ordre :  
```
cd arduino_server/
npm install
node app.js
```

Ouvrez l'adresse suivante dans votre navigateur : [http://localhost:8080](http://localhost:8080)

### Schéma du système
![Schema](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/schema.png?token=ACj7vD3auVfRieEPjEx2I9t5rZhYaynIks5UWPQ6wA%3D%3D)

### Schéma du premier test

![Schema](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/shema.png?token=AI9pyksJtln8sMbTHDvrwUCL_Ie1AbZZks5UWVKCwA%3D%3D)

### Demo
![Demonstration](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/demo.gif?token=ACj7vCtEceXwTi9tJKLThLC-chrVm5BKks5UWAQAwA%3D%3D)

### Deploy to Heroku
Pour déployer le serveur sur Heroku simplement, il est possible d'utiliser le bouton suivant :  
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/th3m4ri0/projet-captation)

### Thanks
- Ce projet est basé sur [Three.js Boilerplate](https://github.com/jeromeetienne/threejsboilerplate/) réalisé par [Jerome Etienne](https://github.com/jeromeetienne/)
- [Icônes](https://github.com/google/material-design-icons) par Google
- [Icône de vent](http://thenounproject.com/term/wind/75103/) par [Thommy Lau](http://thenounproject.com/lch121/) utilisé sous license [CC-Attribution](http://creativecommons.org/licenses/by/3.0/us/)
- [Icône d'Arduino](http://thenounproject.com/term/arduino/34403/) par [uizin](http://thenounproject.com/uizin/) utilisé sous license [CC-Attribution](http://creativecommons.org/licenses/by/3.0/us/)


### License
See the [LICENSE file](https://github.com/th3m4ri0/projet-captation/blob/master/LICENSE)
