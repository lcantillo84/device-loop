import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAhkLnk83XQvXDb5KpqcoKudvoMippOqAk",
    authDomain: "deviceloop0516.firebaseapp.com",
    projectId: "deviceloop0516",
    storageBucket: "deviceloop0516.firebasestorage.app",
    messagingSenderId: "145286824919",
    appId: "1:145286824919:web:6fc6a2a0fb10e6c8b00192",
    measurementId: "G-T1PYK3RNPR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadPricingData() {
    try {
        // Check if file exists
        const pricingPath = path.join(process.cwd(), 'public', 'pricing.json');
        console.log('📁 Looking for file at:', pricingPath);

        if (!fs.existsSync(pricingPath)) {
            console.error('❌ File not found at:', pricingPath);
            console.log('💡 Make sure you have: public/pricing.json');
            return;
        }

        console.log('✅ File found! Reading...');
        const pricingJson = fs.readFileSync(pricingPath, 'utf8');
        const pricingData = JSON.parse(pricingJson);

        console.log('📊 Loaded', pricingData.length, 'devices');
        console.log('🔍 Sample device:', pricingData[0]);

        // Test uploading just one device first
        console.log('🧪 Testing upload with 1 device...');
        const testDoc = doc(collection(db, 'devices'));
        const testDevice = {
            ...pricingData[0],
            testUpload: true,
            uploadedAt: new Date()
        };

        await setDoc(testDoc, testDevice);
        console.log('✅ Test upload successful!');

        // Now upload all data
        console.log('🚀 Uploading all devices...');
        const batchSize = 500;
        let totalUploaded = 0;

        for (let i = 0; i < pricingData.length; i += batchSize) {
            const batch = writeBatch(db);
            const batchData = pricingData.slice(i, i + batchSize);

            batchData.forEach((device, index) => {
                const docRef = doc(collection(db, 'devices'));
                batch.set(docRef, {
                    ...device,
                    id: `device_${i + index + 1}`,
                    uploadedAt: new Date()
                });
            });

            await batch.commit();
            totalUploaded += batchData.length;
            console.log(`✅ Uploaded ${totalUploaded}/${pricingData.length} devices`);
        }

        console.log('🎉 Upload complete!');

    } catch (error) {
        console.error('❌ Upload failed:', error);

        if (error.code === 'permission-denied') {
            console.log('🔒 Permission denied - check Firestore rules');
        }
    }
}

// Add missing import
import { setDoc } from 'firebase/firestore';

uploadPricingData();