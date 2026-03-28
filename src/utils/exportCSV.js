export const exportToCSV = (cars, filename = 'inventory.csv') => {
  const headers = [
    'Brand', 'Model', 'Year', 'Condition', 'Transmission', 'Color',
    'Mileage (km)', 'VIN', 'Price (₦)', 'Cost Price (₦)', 'Status',
    'Buyer', 'Sold Date', 'Profit (₦)', 'Days in Stock',
  ];

  const rows = cars.map(car => {
    const days = car.createdAt?.toDate
      ? Math.floor((Date.now() - car.createdAt.toDate().getTime()) / 86400000)
      : '';
    const soldDate = car.soldAt?.toDate ? car.soldAt.toDate().toLocaleDateString() : '';
    const profit = car.price && car.costPrice ? car.price - car.costPrice : '';
    return [
      car.brand, car.model, car.year, car.condition, car.transmission,
      car.color, car.mileage, car.vin, car.price, car.costPrice,
      car.status, car.buyerName, soldDate, profit, days,
    ].map(v => `"${v ?? ''}"`).join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
