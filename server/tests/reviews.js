import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 100,
  duration: '10s'
};

// export const options = {
//   stages: [
//     { duration: '30s', target: 1000 },
//     { duration: '1m30s', target: 500 },
//     { duration: '20s', target: 50 },
//   ],
// };

// let range = Math.random() * (1400000 - 500000) + 500000;

export default function () {
  check (
  http.get(`http://localhost:3000/reviews?page=1&count=2&sort=newest&product_id=${105432}`), {'is status 200': (r) => r.status === 200})
  // sleep(1);
}