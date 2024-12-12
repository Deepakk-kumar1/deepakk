function generateQRCode() {
  var ssid = document.getElementById('ssid').value;
  var password = document.getElementById('password').value;
  var encryption = document.getElementById('encryption').value;
  var output = document.getElementById('output');

  output.innerHTML = ''; // Clear previous QR code

  // Construct the Wi-Fi QR code string
  var wifiData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

  // Generate the QR code
  new QRCode(output, {
    text: wifiData.trim(),
    width: 256,
    height: 256
  });

  document.getElementById('downloadButton').style.display = 'inline-block'; // Show download button
}

function downloadQRCode() {
  var canvas = document.querySelector('#output canvas'); // Get the canvas directly

  if (canvas) {
    // Create a new canvas with added space for the border
    var newCanvas = document.createElement('canvas');
    var newContext = newCanvas.getContext('2d');

    // Set new canvas size to add 15px padding (30px total) around the original QR code
    newCanvas.width = canvas.width + 60;
    newCanvas.height = canvas.height + 60;

    // Fill the new canvas with white background
    newContext.fillStyle = 'white';
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw the original QR code onto the new canvas with 15px padding
    newContext.drawImage(canvas, 30, 30);

    // Create download link for the new canvas
    var link = document.createElement('a');
    link.href = newCanvas.toDataURL('image/jpeg', 1.0); // High-quality JPG
    link.download = 'abhi_wifi_qrcode.jpg';
    link.click(); // Trigger download
  } else {
    alert("Please generate a QR code first.");
  }
}