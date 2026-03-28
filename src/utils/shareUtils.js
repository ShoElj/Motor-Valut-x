export const buildListingText = (car) => {
  const lines = [
    `🚗 *${car.brand} ${car.model} (${car.year})*`,
    `💰 Price: ₦${car.price?.toLocaleString()}`,
    car.condition ? `✅ Condition: ${car.condition}` : null,
    car.mileage ? `📍 Mileage: ${car.mileage.toLocaleString()} km` : null,
    car.transmission ? `⚙️ Transmission: ${car.transmission}` : null,
    car.color ? `🎨 Color: ${car.color}` : null,
    car.vin ? `🔖 VIN: ${car.vin}` : null,
    `\n📲 Contact us to book a viewing!`,
  ].filter(Boolean);
  return lines.join('\n');
};

export const shareToWhatsApp = (car) => {
  const text = encodeURIComponent(buildListingText(car));
  window.open(`https://wa.me/?text=${text}`, '_blank');
};

export const copyListing = async (car) => {
  await navigator.clipboard.writeText(buildListingText(car));
};
