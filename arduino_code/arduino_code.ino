#include <Chrono.h>

Chrono envoiMessage;

#define input_water 1
#define input_wind A1
#define input_fire A0
#define resistor 10000





// track the state of the pulse pin
volatile uint8_t lastflowpinstate;
// you can try to keep time of how long it is between pulses
volatile uint32_t lastflowratetimer = 0;
// and use that to calculate a flow rate
volatile float flowrate;





SIGNAL(TIMER0_COMPA_vect) {
  uint8_t x = digitalRead(input_water);

  if (x == lastflowpinstate) {
    lastflowratetimer++;
    return; // nothing changed!
  }

  lastflowpinstate = x;
  flowrate = 1000.0;
  flowrate /= lastflowratetimer;  // in hertz
  lastflowratetimer = 0;
}




void setup(){
  Serial.begin(9600);

  pinMode(input_water, INPUT);
  digitalWrite(input_water, HIGH);
  lastflowpinstate = digitalRead(input_water);

  useInterrupt(true);
}



void useInterrupt(boolean v) {
  if (v) {
    // Timer0 is already used for millis() - we'll just interrupt somewhere
    // in the middle and call the "Compare A" function above
    OCR0A = 0xAF;
    TIMSK0 |= _BV(OCIE0A);
  } 
  else {
    // do not call the interrupt function COMPA anymore
    TIMSK0 &= ~_BV(OCIE0A);
  }
}







void loop(){

  /////////////////////////////////////////////////////////////////////WATER
  Serial.print("water ");
  Serial.println(flowrate);


  /////////////////////////////////////////////////////////////////////FIRE
  if ( envoiMessage.metro(10) ) {
    float read_fire;

    read_fire = analogRead(input_fire);

    read_fire = (1023/ read_fire) -1;
    read_fire = resistor / read_fire;

    Serial.print("fire ");
    Serial.println(read_fire);
  }
  /////////////////////////////////////////////////////////////////////WIND

 // if ( envoiMessage.metro(10) ) {
    float read_wind;

    read_wind = analogRead(input_wind);

    Serial.print("wind ");
    Serial.println(read_wind);
//  }
}









