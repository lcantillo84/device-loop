// src/firebase/services.js
import { collection, addDoc, doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from './config';

// Save donation form submission
export const saveDonationSubmission = async (donationData) => {
    try {
        const docRef = await addDoc(collection(db, 'donations'), {
            ...donationData,
            timestamp: new Date(),
            status: 'submitted'
        });
        console.log('Donation saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving donation:', error);
        throw error;
    }
};

// Track badge creation
export const trackBadgeCreation = async (badgeData) => {
    try {
        const docRef = await addDoc(collection(db, 'badges'), {
            ...badgeData,
            timestamp: new Date()
        });

        // Update impact stats
        await updateImpactStats('badgesCreated');

        console.log('Badge tracked with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error tracking badge:', error);
        throw error;
    }
};

// Update impact statistics
export const updateImpactStats = async (field) => {
    try {
        const statsRef = doc(db, 'stats', 'impact');
        await updateDoc(statsRef, {
            [field]: increment(1),
            lastUpdated: new Date()
        });
    } catch (error) {
        console.error('Error updating stats:', error);
    }
};
export const saveContactSubmission = async (contactData) => {
    try {
        const docRef = await addDoc(collection(db, 'contacts'), {
            ...contactData,
            timestamp: new Date(),
            status: 'new'
        });
        console.log('Contact form saved with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving contact form:', error);
        throw error;
    }
};
// Get impact statistics
export const getImpactStats = async () => {
    try {
        const statsRef = doc(db, 'stats', 'impact');
        const statsSnap = await getDoc(statsRef);

        if (statsSnap.exists()) {
            return statsSnap.data();
        } else {
            return {
                donations: 0,
                badgesCreated: 0,
                treesPlanted: 0
            };
        }
    } catch (error) {
        console.error('Error getting stats:', error);
        return null;
    }
};