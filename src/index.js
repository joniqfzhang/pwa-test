if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((registration) => {
      console.log('SW registered!', registration);
    })
    .catch((error) => {
      console.log('SW Registration Failed.', error);
    });
} else {
  console.log('Browser not support sesrvice worker.');
}
