import { useState, useEffect, useMemo } from 'react';
import { subscribeToPublicCars } from '../services/carService';

export const usePublicCars = (filters = {}) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPublicCars((data) => {
      setCars(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredCars = useMemo(() => {
    let result = cars.filter(c => c.status === 'For Sale');
    const { search, condition, brand, minPrice, maxPrice } = filters;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(c =>
        c.brand?.toLowerCase().includes(s) ||
        c.model?.toLowerCase().includes(s)
      );
    }
    if (condition) result = result.filter(c => c.condition === condition);
    if (brand) result = result.filter(c => c.brand === brand);
    if (minPrice) result = result.filter(c => c.price >= Number(minPrice));
    if (maxPrice) result = result.filter(c => c.price <= Number(maxPrice));
    return result;
  }, [cars, filters]);

  const brands = useMemo(() => [...new Set(cars.map(c => c.brand).filter(Boolean))], [cars]);

  return { filteredCars, loading, brands };
};
