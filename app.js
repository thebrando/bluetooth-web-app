// UUIDs for the BLE service and characteristic
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

let bleDevice;
let bleServer;
let bleService;
let bleCharacteristic;

// Connect to the BLE device
async function connect() {
  try {
    console.log("Requesting Bluetooth Device...");
    bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
    });

    console.log("Connecting to the device...");
    const server = await bleDevice.gatt.connect();

    console.log("Getting Service...");
    bleService = await server.getPrimaryService(SERVICE_UUID);

    console.log("Getting Characteristic...");
    bleCharacteristic = await bleService.getCharacteristic(CHARACTERISTIC_UUID);

    console.log("Connected");
    document.getElementById("increaseAttack").disabled = false;
    document.getElementById("increaseHealth").disabled = false;
  } catch (error) {
    console.log("Argh! " + error);
  }
}

// Write to the characteristic
async function writeToCharacteristic(value) {
  if (!bleCharacteristic) {
    return;
  }
  let encoder = new TextEncoder();
  await bleCharacteristic.writeValue(encoder.encode(value));
}

// Event listeners for buttons
document.getElementById("connect").addEventListener("click", function () {
  connect();
});

document
  .getElementById("increaseAttack")
  .addEventListener("click", function () {
    writeToCharacteristic("increaseAttack");
  });

document
  .getElementById("increaseHealth")
  .addEventListener("click", function () {
    writeToCharacteristic("increaseHealth");
  });
