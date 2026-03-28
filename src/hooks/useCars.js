import { useState, useEffect, useMemo } from 'react';
import { useAuth } from './useAuth';
import { subscribeToCars } from '../services/carService';

export const useCars = (filters = {}) => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToCars(user.uid, (data) => {
      setCars(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const filteredCars = useMemo(() => {
    let result = [...cars];
    const { search, status, condition, brand, minPrice, maxPrice } = filters;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(c =>
        c.brand?.toLowerCase().includes(s) ||
        c.model?.toLowerCase().includes(s) ||
        c.vin?.toLowerCase().includes(s)
      );
    }
    if (status) result = result.filter(c => c.status === status);
    if (condition) result = result.filter(c => c.condition === condition);
    if (brand) result = result.filter(c => c.brand === brand);
    if (minPrice) result = result.filter(c => c.price >= Number(minPrice));
    if (maxPrice) result = result.filter(c => c.price <= Number(maxPrice));
    return result;
  }, [cars, filters]);

  const stats = useMemo(() => {
    const available = cars.filter(c => c.status === 'For Sale');
    const sold = cars.filter(c => c.status === 'Sold');
    return {
      total: cars.length,
      available: available.length,
      sold: sold.length,
      inventoryValue: available.reduce((sum, c) => sum + (c.price || 0), 0),
      totalRevenue: sold.reduce((sum, c) => sum + (c.price || 0), 0),
      totalProfit: sold.reduce((sum, c) => sum + ((c.price || 0) - (c.costPrice || 0)), 0),
    };
  }, [cars]);

  const brands = useMemo(() => [...new Set(cars.map(c => c.brand).filter(Boolean))], [cars]);

  return { cars, filteredCars, loading, stats, brands };
};
