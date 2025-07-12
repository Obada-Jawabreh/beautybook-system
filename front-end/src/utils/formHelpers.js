export function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      // console.log(key, value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      // Optional: handle nested objects (e.g., for structured keys like address[city])
      Object.entries(value).forEach(([subKey, subVal]) => {
        if (subVal instanceof File || subVal instanceof Blob) {
          // console.log(`${key}[${subKey}]`, subVal);

          formData.append(`${key}[${subKey}]`, subVal);
        } // else if (subVal !== null && subVal !== undefined && subVal !== "") {
        //   formData.append(`${key}[${subKey}]`, subVal);
        // }
      });
    } else if (value !== null && value !== undefined && value !== "") {
      formData.append(key, value);
      // console.log(key, value);
    }
  });

  return formData;
}
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
export const formatTime = (timeString) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const generatePDF = (booking) => {
  const printWindow = window.open("", "_blank");
  const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Booking Confirmation - ${booking.name_service}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
            padding: 20px;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="10" r="1" fill="rgba(255,255,255,0.03)"/><circle cx="10" cy="60" r="1" fill="rgba(255,255,255,0.03)"/><circle cx="90" cy="40" r="1" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          }
          
          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
          }
          
          .header p {
            font-size: 1.2em;
            opacity: 0.9;
            position: relative;
            z-index: 1;
          }
          
          .booking-id {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-top: 20px;
            display: inline-block;
            position: relative;
            z-index: 1;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .status-badge {
            display: inline-block;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 0.9em;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 30px;
          }
          
          .status-confirmed {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
          }
          
          .status-pending {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
          }
          
          .status-cancelled {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
          }
          
          .status-completed {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
          }
          
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
          }
          
          .detail-card {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 25px;
            border-radius: 15px;
            border-left: 4px solid #3b82f6;
          }
          
          .detail-card h3 {
            color: #3b82f6;
            font-size: 1.1em;
            margin-bottom: 10px;
            font-weight: 600;
          }
          
          .detail-card p {
            font-size: 1.1em;
            color: #1f2937;
            font-weight: 500;
          }
          
          .service-info {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 2px solid #bfdbfe;
          }
          
          .service-info h2 {
            color: #1e40af;
            font-size: 1.5em;
            margin-bottom: 15px;
          }
          
          .service-info p {
            color: #374151;
            font-size: 1.1em;
            line-height: 1.8;
          }
          
          .price-section {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            border: 2px solid #bbf7d0;
          }
          
          .price-section h3 {
            color: #166534;
            font-size: 1.3em;
            margin-bottom: 10px;
          }
          
          .price-amount {
            font-size: 2.5em;
            font-weight: bold;
            color: #059669;
            margin-bottom: 5px;
          }
          
          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          
          .footer p {
            color: #6b7280;
            font-size: 0.9em;
            line-height: 1.6;
          }
          
          .decorative-line {
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
            margin: 30px 0;
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
            
            .container {
              box-shadow: none;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Booking Confirmation</h1>
            <p>Your beauty appointment details</p>
            <div class="booking-id">Booking ID: #${booking.id}</div>
          </div>
          
          <div class="content">
            <div class="status-badge status-${
              booking.status_service?.toLowerCase() || "pending"
            }">
              Status: ${booking.status_service || "Pending"}
            </div>
            
            <div class="details-grid">
              <div class="detail-card">
                <h3>📅 Appointment</h3>
                <p>ID: ${booking.appointmentId}</p>
              </div>
              
              <div class="detail-card">
                <h3>⏰ Time</h3>
                <p>${formatTime(booking.booking_start_time)}</p>
              </div>
              
              <div class="detail-card">
                <h3>💁‍♀️ Staff Member</h3>
                <p>${booking.staff_first_name} ${booking.staff_last_name}</p>
              </div>
              
              <div class="detail-card">
                <h3>📧 Staff Email</h3>
                <p>${booking.staff_email}</p>
              </div>
            </div>
            
            <div class="service-info">
              <h2>🌟 ${booking.name_service}</h2>
              <p>${
                booking.description ||
                "Professional beauty service tailored to your needs."
              }</p>
            </div>
            
            <div class="decorative-line"></div>
            
            <div class="price-section">
              <h3>Total Amount</h3>
              <div class="price-amount">${booking.price}</div>
              <p>Payment due at appointment</p>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing our beauty services!</p>
            <p>Please arrive 10 minutes early for your appointment.</p>
            <p>For any changes or cancellations, please contact us at least 24 hours in advance.</p>
          </div>
        </div>
      </body>
      </html>
    `;

  printWindow.document.write(pdfContent);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
  }, 250);
};
