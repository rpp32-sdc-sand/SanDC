import http from 'k6/http';
import { check, sleep} from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 750},
    { duration: '35s', target: 3150},
    { duration: '35s', target: 3150},
    { duration: '10s', target: 0},
  ],
  // vus: 300,
  // // iterations: 10000,
  // duration: '10s',
}


export default function () {
  // last 10%
  var randomProd = parseInt((Math.random() * (1000011 - 900009) + 900009));

  var payload = JSON.stringify({ product_id: randomProd });
  var params = { headers: {'Content-Type' : 'application/json'}};
  var prodres = http.get(`http://localhost:3050/fec2/hr-rpp/products/${randomProd}`, params);
  var styleRes = http.get(`http://localhost:3050/fec2/hr-rpp/products/${randomProd}/styles`, params);
  check(prodres, {'status was 200 for get Specific Product': r => r.status === 200});
  check(styleRes, {'status was 200 for get style of that product': r => r.status === 200});
  // check(prodres, {'status was 400': r => r.status === 400});
  // check(styleRes, {'status was 400': r => r.status === 400});


  sleep(1);
}
