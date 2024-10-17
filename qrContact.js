function generateQRCode() {
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var output = document.getElementById('output');

  output.innerHTML = ''; // Clear previous QR code

  // vCard format with full name, phone, email, and address
  var vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
ADR;TYPE=HOME:${address}
END:VCARD`;

  // Generate QR code
  new QRCode(output, {
    text: vCardData.trim(),
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
    link.download = 'abhi_contact_qrcode.jpg';
    link.click(); // Trigger download
  } else {
    alert("Please generate a QR code first.");
  }
}