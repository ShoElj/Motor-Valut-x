import {
  collection, collectionGroup, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy, onSnapshot, serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Private: scoped to authenticated user
const carsCol = (uid) => collection(db, 'users', uid, 'cars');
const carDoc = (uid, id) => doc(db, 'users', uid, 'cars', id);

export const subscribeToCars = (uid, callback) => {
  const q = query(carsCol(uid), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(d => ({ ...d.data(), id: d.id })));
  });
};

// Public: collection group query across all users' cars — for the public Home page
// Requires Firestore index: collectionGroup 'cars' ordered by 'createdAt'
export const subscribeToPublicCars = (callback) => {
  const q = query(collectionGroup(db, 'cars'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(d => ({ ...d.data(), id: d.id })));
  });
};

export const addCar = (uid, form) =>
  addDoc(carsCol(uid), {
    ...form,
    year: Number(form.year),
    price: Number(form.price),
    costPrice: Number(form.costPrice) || 0,
    mileage: Number(form.mileage) || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    userId: uid,
  });

export const updateCar = (uid, id, data) =>
  updateDoc(carDoc(uid, id), { ...data, updatedAt: serverTimestamp() });

export const deleteCar = (uid, id) => deleteDoc(carDoc(uid, id));

export const markAsSold = (uid, id, buyerName = '') =>
  updateDoc(carDoc(uid, id), {
    status: 'Sold',
    buyerName,
    soldAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
