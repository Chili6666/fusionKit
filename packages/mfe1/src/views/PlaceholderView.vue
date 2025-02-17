<template>
  <div class="scroll-viewer">
    <div class="header">
      <h1>Düsseldorf Airport (DUS)</h1>
      <p>Your Gateway to North Rhine-Westphalia</p>
    </div>

    <img alt="Düsseldorf Airport Terminal" class="main-image" />

    <div class="quick-facts">
      <h2>Quick Facts</h2>
      <ul>
        <li>IATA Code: DUS</li>
        <li>Location: Düsseldorf, Germany</li>
        <li>Distance from city: 7 km north of city center</li>
        <li>Passengers (2023): Approximately 16.5 million</li>
        <li>Terminals: 3 terminals (A, B, C)</li>
      </ul>
    </div>

    <div class="info-section">
      <h2>About the Airport</h2>
      <p>
        Düsseldorf Airport is the third-largest airport in Germany and the
        primary international airport serving the Rhine-Ruhr metropolitan
        region. Known for its efficient operations and modern facilities, it
        serves as a major hub for Eurowings and several other airlines.
      </p>

      <p>
        The airport features three passenger terminals connected by a central
        spine, making transfers between flights convenient. With over 200
        destinations worldwide, DUS is a crucial gateway for both business and
        leisure travelers.
      </p>
    </div>

    <div class="image-grid">
      <img alt="Airport Terminal Interior" />
      <img alt="Airport SkyTrain" />
      <img alt="Airport Shopping Area" />
      <img alt="Airport Runway" />
    </div>

    <div class="info-section">
      <h2>Transportation</h2>
      <p>
        The airport is well-connected to Düsseldorf and the surrounding region:
      </p>
      <ul>
        <li>
          SkyTrain: Automated suspended monorail connecting terminals to the
          train station
        </li>
        <li>
          Train: Direct connection to Düsseldorf Central Station (20 minutes)
        </li>
        <li>Bus: Multiple local and regional bus lines</li>
        <li>Taxi: Available at all terminals</li>
        <li>Car: Direct autobahn access via A44</li>
      </ul>
    </div>

    <div class="info-section">
      <h2>Facilities</h2>
      <p>Düsseldorf Airport offers a wide range of facilities and services:</p>
      <ul>
        <li>Over 60 shops and restaurants</li>
        <li>Multiple lounges including Lufthansa and Hugo Junkers Lounge</li>
        <li>Free WiFi throughout the terminals</li>
        <li>Prayer rooms and quiet areas</li>
        <li>Medical center and pharmacy</li>
        <li>Car rental services</li>
        <li>Conference facilities</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css">
.header {
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  margin-bottom: 30px;
}
.main-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}
.info-section {
  margin-bottom: 40px;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}
.image-grid img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.quick-facts {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
}
.scroll-viewer {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
