# Projet Captation
## Par [Ruby-Maude Rioux](http://ca.linkedin.com/pub/ruby-maude-rioux/5a/3b9/b5a) et [Erwan d'Orgeville](http://erwandorgeville.com)

![Cover](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/cover.jpg)

### Description

Dans le cadre du travail de Captation (TP2) du cours EDM4640 ([grille d'évaluation](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/pdf/grille_evaluation.pdf)), nous avons créé un monde dont les éléments sont contrôlés par trois senseurs reliés à un Arduino Leonardo. Le "Liquid Flow Meter" calcule l'écoulement de l'eau. Le "Thermistor" calcule la chaleur de la cuiller. Le "DC Motor" calcule la force du vent.  
Si aucun capteur Arduino ne communique avec le serveur pendant une durée de plus de 5 secondes, le programme passe en mode "idle" afin de montrer les capacités du projet même lorsqu'il n'est pas installé.

### Matériaux utilisés
- Arduino Leonardo - Model: A000057
- [Geared DC Motor](http://www.spikenzielabs.com/Catalog/index.php?main_page=product_info&cPath=22_89&products_id=997) - Model: CK-DCMOTORWHEEL
- [Liquid Flow Meter](http://www.adafruit.com/products/828) - Plastic 1/2" NPS Threaded
- [Epoxy Thermistor](http://www.adafruit.com/product/372) - 3950 NTC

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
```

Si vous utilisez le serveur distant, exécutez la commande suivante :

```
node app.js
```

Sinon :
```
node app.js --server local
```

Ouvrez l'adresse suivante dans votre navigateur : [http://localhost:8080](http://localhost:8080) (ou le serveur distant le cas échéant).

### Schéma du système
![Schema](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/schema.png)

### Schéma du premier test

![Schema](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/shema.png)

###Schéma final

![Schema] (https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/shema_final.png) 

### Montage final

![Montage](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/fini.jpg)

### Demo
![Demonstration](https://raw.githubusercontent.com/th3m4ri0/projet-captation/master/images/demo.gif)

### Deploy to Heroku or Nitrous
Pour déployer le serveur sur Heroku simplement, il est possible d'utiliser le bouton suivant :  
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/th3m4ri0/projet-captation)
[![Hack th3m4ri0/projet-captation on Nitrous.IO](https://d3o0mnbgv6k92a.cloudfront.net/assets/hack-l-v1-4b6757c3247e3c50314390ece34cdb11.png)](https://www.nitrous.io/hack_button?source=embed&runtime=nodejs&repo=th3m4ri0%2Fprojet-captation)

### Thanks
- Ce projet est basé sur [Three.js Boilerplate](https://github.com/jeromeetienne/threejsboilerplate/) réalisé par [Jerome Etienne](https://github.com/jeromeetienne/)
- [Icônes](https://github.com/google/material-design-icons) par Google
- [Icône de vent](http://thenounproject.com/term/wind/75103/) par [Thommy Lau](http://thenounproject.com/lch121/) utilisé sous license [CC-Attribution](http://creativecommons.org/licenses/by/3.0/us/)
- [Icône d'Arduino](http://thenounproject.com/term/arduino/34403/) par [uizin](http://thenounproject.com/uizin/) utilisé sous license [CC-Attribution](http://creativecommons.org/licenses/by/3.0/us/)
- Beaucoup de code, d'exemples et autres par [Thomas Ouellet Fredericks](http://t-o-f.info) sur [le wiki du cours](http://wiki.t-o-f.info/EDM4640/EDM4640).
- Exemples d'AdaFruit pour le [Liquid Flow Meter](https://github.com/adafruit/Adafruit-Flow-Meter/blob/master/Adafruit_FlowMeter.pde) et le [Thermistor](https://learn.adafruit.com/thermistor?view=all)
- [Son de vent](https://www.freesound.org/people/Bosk1/sounds/144083/) par [Bosk1](https://www.freesound.org/people/Bosk1/) utilisé sous license [CC-Attribution](http://creativecommons.org/licenses/by/3.0/us/)
- [Son de pluie](https://www.freesound.org/people/mshahen/sounds/242892/) par [mshahen](https://www.freesound.org/people/mshahen/sounds/242892/) utilisé sous license [CC-Attribution](http://creativecommons.org/licenses/by/3.0/us/)
- Un merci particulier à [Marc-Antoine Brodeur](http://marcantoinebrodeur.com/) ([Github](http://github.com/mabrodeur)) pour son conseil lors de la réalisation du capteur de vent à partir d'un moteur.


### License
See the [LICENSE file](https://github.com/th3m4ri0/projet-captation/blob/master/LICENSE)
