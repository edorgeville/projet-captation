/*
How to use the inputs of Spikenzielabs Rotary Encoder - Illuminated (RGB) (COM-10982)
 http://www.spikenzielabs.com/Catalog/index.php?main_page=product_info&cPath=8_105&products_id=825
 Last modified by : Thomas Ouellet Fredericks
 Last modification date : 2014/09/30
 Based on this article : http://bildr.org/2012/08/rotary-encoder-arduino/
 
 
 // The following pins can not be changed as they are
 // connected to the Leonardo interrupt pins :
 // http://arduino.cc/en/Reference/attachInterrupt
 
 
 Version originale : Thomas Ouellet Fredericks, 4 novembre 2012
 Derniere version :  Thomas Ouellet Fredericks, 23 septembre 2014
 */

// INCLUDE CHRONO LIBRARY
#include <Chrono.h>
// Documentation : https://github.com/thomasfredericks/Chrono-Arduino-Wiring/blob/master/README.md
// Download : https://github.com/thomasfredericks/Chrono-Arduino-Wiring/archive/master.zip


Chrono envoiMessage;

int mesurePrecedente;


//Potentiomètre controlant le vent
#define ENCODER_A 2
#define ENCODER_B 3

#define ENCODER_SW 8

volatile boolean encoderMoved = false;
volatile byte encoderValue = 0;
volatile int relativeValue = 0;

int switchState;
int v2;

void setup() {

  Serial.begin (8080);

  pinMode(ENCODER_A, INPUT_PULLUP); // turn interal pullup resistor on.
  pinMode(ENCODER_B, INPUT_PULLUP); // turn interal pullup resistor on.

  // call updateEncoder() when any high/low changed seen
  // on interrupt 0 (pin 2), or interrupt 1 (pin 3) :
  attachInterrupt(0, updateEncoder, CHANGE);
  attachInterrupt(1, updateEncoder, CHANGE);

  pinMode(ENCODER_SW, INPUT);
  switchState = digitalRead(ENCODER_SW);

  //Potentiometre controlant l'eau
  pinMode(0,OUTPUT);
}

void loop(){

  //Wind
  int newSwitchState =  digitalRead(ENCODER_SW);
  if ( switchState != newSwitchState ) {
    switchState = newSwitchState;
  }

  if ( encoderMoved ) {
    encoderMoved = false;
    Serial.print("wind ");
    Serial.println(abs(relativeValue));
  }


  //Water
  int valeur = analogRead(0);
  if(valeur != v2){
    v2 = valeur;
    Serial.print("water ");
    Serial.println(valeur);
  }


  //Fire
  if ( envoiMessage.metro(10) ) {

    // Mesurer la tension a la broche analogique 1 :
    int nouvelleMesure = analogRead(3);

    // Comparer la nouvelleMesure avec la precedente :
    if ( mesurePrecedente != nouvelleMesure ) {
      // Enregistrer la nouvelleMesure :
      mesurePrecedente = nouvelleMesure;

      // Envoyer la valeur du potentiometre.
      Serial.print("fire "); // "A1" suivi d'un espace
      Serial.print(nouvelleMesure); // la valeur de la mesure
      Serial.println(); // indicateur de fin de ligne

    }

  }

}


void updateEncoder(){

  encoderMoved = true;

  byte MSB = digitalRead(ENCODER_A); //MSB = most significant bit
  byte LSB = digitalRead(ENCODER_B); //LSB = least significant bit

  byte newEncodedValue = (MSB << 1) | LSB; //converting the 2 pin value to single number
  byte old_vs_new  = (encoderValue << 2) | newEncodedValue; //adding it to the previous encoded value

    if( old_vs_new == B1101 ||  old_vs_new == B0100 ||  old_vs_new == B0010 ||  old_vs_new == B1011) relativeValue ++;
  if( old_vs_new == B1110 ||  old_vs_new == B0111 ||  old_vs_new == B0001 ||  old_vs_new == B1000) relativeValue --;

  encoderValue = newEncodedValue; //store this value for next time
}






