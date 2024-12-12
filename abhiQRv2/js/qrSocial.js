function generateSocialQR() {
  const platform = document.getElementById("platform").value;
  const username = document.getElementById("username").value.trim();

  if (!username) {
    alert("Please enter a username!");
    return;
  }

  const fullURL = platform + username;
  const qrDiv = document.getElementById("output");
  qrDiv.innerHTML = "";

  const qrCode = new QRCode(qrDiv, {
    text: fullURL,
    width: 256,
    height: 256,
  });

  document.getElementById("downloadButton").style.display = "inline-block";
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
    link.download = 'abhi_social_qrcode.jpg';
    link.click(); // Trigger download
  } else {
    alert("Please generate a QR code first.");
  }
}