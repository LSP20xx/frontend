export const MAPS_API_KEY = 'AIzaSyAewU2Jv1A6JPHMVMpEqYgLKcxeWJqlE-k';
export const URL_MAPS = (address, zoom = 14) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${address}&key=${MAPS_API_KEY}`;
export const URL_GEOCODING = (address) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_API_KEY}`;
