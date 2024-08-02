const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// URL endpoint untuk menerima notifikasi dari Midtrans
app.post('/midtrans-notification', (req, res) => {
    const notification = req.body;

    // Log data notifikasi untuk verifikasi
    console.log('Midtrans Notification:', notification);

    // Lakukan tindakan yang diperlukan berdasarkan status pembayaran
    switch(notification.transaction_status) {
        case 'capture':
            if (notification.payment_type === 'credit_card') {
                if (notification.fraud_status === 'challenge') {
                    // Tindakan untuk pembayaran yang di-challenge
                    console.log('Transaction is challenged');
                } else if (notification.fraud_status === 'accept') {
                    // Tindakan untuk pembayaran yang diterima
                    console.log('Transaction is successful');
                }
            }
            break;

        case 'settlement':
            // Tindakan untuk pembayaran yang sudah selesai
            console.log('Transaction settled');
            break;

        case 'pending':
            // Tindakan untuk pembayaran yang masih pending
            console.log('Transaction is pending');
            break;

        case 'deny':
            // Tindakan untuk pembayaran yang ditolak
            console.log('Transaction denied');
            break;

        case 'expire':
            // Tindakan untuk pembayaran yang sudah expired
            console.log('Transaction expired');
            break;

        case 'cancel':
            // Tindakan untuk pembayaran yang dibatalkan
            console.log('Transaction canceled');
            break;

        default:
            console.log('Unknown transaction status');
            break;
    }

    // Berikan respons sukses ke Midtrans
    res.status(200).send('OK');
});

// Menjalankan server di port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
