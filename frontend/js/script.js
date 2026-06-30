// ===================================
// BA-NG-JEK - OJEK ONLINE BATAM
// Main JavaScript File
// ===================================

console.log('🚗 BA-NG-JEK App Loaded');

// Inisialisasi aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ DOM ready - BA-NG-JEK initialized');
  initializeApp();
});

// ===== FUNGSI UTAMA =====
function initializeApp() {
  // Tambahkan event listeners
  const orderButton = document.querySelector('.btn-order');
  if (orderButton) {
    orderButton.addEventListener('click', pesanOjek);
  }
}

// ===== FUNGSI PESAN OJEK =====
function pesanOjek() {
  const pickup = document.getElementById('pickup').value;
  const destination = document.getElementById('destination').value;
  const service = document.getElementById('service').value;

  // Validasi form
  if (!pickup || !destination || !service) {
    alert('⚠️ Mohon lengkapi semua field terlebih dahulu!');
    return;
  }

  // Buat pesan untuk WhatsApp
  const pesanWhatsApp = `Halo BA-NG-JEK! 👋\n\nSaya ingin memesan ojek dengan detail:\n\n📍 Penjemputan: ${pickup}\n🎯 Tujuan: ${destination}\n🚗 Layanan: ${service}\n\nMohon segera konfirmasi. Terima kasih!`;

  // Encode pesan untuk URL
  const pesan = encodeURIComponent(pesanWhatsApp);

  // Redirect ke WhatsApp (ganti nomor dengan nomor asli)
  window.open(`https://wa.me/6285xxx?text=${pesan}`, '_blank');
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== HELPER FUNCTIONS =====
function showNotification(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // Bisa ditambahkan UI notification library di masa depan
}

// ===== API CALLS (untuk future use) =====
async function fetchAvailableDrivers(pickup, destination) {
  try {
    const response = await fetch('/api/drivers/available', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pickup, destination })
    });
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching drivers:', error);
  }
}

async function createOrder(orderData) {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    return await response.json();
  } catch (error) {
    console.error('❌ Error creating order:', error);
  }
}
