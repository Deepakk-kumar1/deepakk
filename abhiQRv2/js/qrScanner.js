function openQRScanner() {
      const qrReaderContainer = document.getElementById("qr-reader");
      qrReaderContainer.style.display = "block";

      const html5QrCode = new Html5Qrcode("qr-reader");

      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 30, qrbox: 250 },
        (decodedText, decodedResult) => {
          processScannedData(decodedText);
          html5QrCode.stop();
          qrReaderContainer.style.display = "none";
        },
        (error) => {
          console.error("QR Code Scanning Error: ", error);
        }
      ).catch(err => {
        alert("Error in starting scanner: " + err);
      });
    }

    function scanImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCode.scanFile(file, true)
        .then(decodedText => {
          processScannedData(decodedText);
        })
        .catch(err => {
          alert("Error scanning the image: " + err);
        });
    }

    function processScannedData(decodedText) {
      document.getElementById("popup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
      document.getElementById("scan-result").innerText = decodedText;

      const actionButtons = document.getElementById("action-buttons");
      actionButtons.innerHTML = "";

      // Analyze the result and add buttons dynamically
      if (decodedText.startsWith("http")) {
        actionButtons.innerHTML += `<button onclick="window.open('${decodedText}', '_blank')">Open Link</button>`;
      } else if (decodedText.startsWith("tel:")) {
        const number = decodedText.replace("tel:", "");
        actionButtons.innerHTML += `<button onclick="window.open('${decodedText}', '_self')">Call ${number}</button>`;
      } else if (decodedText.startsWith("sms:")) {
        const smsNumber = decodedText.replace("sms:", "");
        actionButtons.innerHTML += `<button onclick="window.open('${decodedText}', '_self')">Send SMS to ${smsNumber}</button>`;
      } else if (decodedText.startsWith("mailto:")) {
        const email = decodedText.replace("mailto:", "");
        actionButtons.innerHTML += `<button onclick="window.open('${decodedText}', '_self')">Send Email to ${email}</button>`;
      } else if (decodedText.startsWith("WIFI:")) {
        const wifiDetails = parseWiFi(decodedText);
        actionButtons.innerHTML += `<button onclick="alert('SSID: ${wifiDetails.ssid}\\nPassword: ${wifiDetails.password}\\nEncryption: ${wifiDetails.encryption}')">View WiFi Details</button>`;
      } else if (decodedText.startsWith("geo:")) {
        const coordinates = decodedText.replace("geo:", "");
        const googleMapsLink = `https://www.google.com/maps?q=${coordinates}`;
        actionButtons.innerHTML += `<button onclick="window.open('${googleMapsLink}', '_blank')">View on Google Maps</button>`;
      } else {
        actionButtons.innerHTML += `<button onclick="alert('No specific action available for this data')">Unknown Format</button>`;
      }
    }

    function parseWiFi(decodedText) {
      const regex = /^WIFI:T:(.*?);S:(.*?);P:(.*?);H:(.*?);?/;
      const match = decodedText.match(regex);

      return {
        encryption: match[1] || "Unknown",
        ssid: match[2] || "Unknown",
        password: match[3] || "None",
        hidden: match[4] === "true" ? "Yes" : "No",
      };
    }

    function closePopup() {
      document.getElementById("popup").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }