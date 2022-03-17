import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        {duration: '15s', target : 100},
        {duration: '30s', target : 100},
        {duration: '15s', target : 0}
    ]
}


export default function () {
    /*
  Randomize from last 10% of the database
  935391 to 1000011
  */
    var randomQId = parseInt((Math.random() * (3519421 - 3167479) + 3167479));
    let payload = JSON.stringify({
        body: 'Hello answers post',
        name: 'JT',
        email: 'jst@uscd.edu',
        photos: []
    });
    let params = { headers: {'Content-Type' : 'application/json'}};
    let res = http.post(`http://localhost:3050/fec2/hr-rpp/qna/questions/${randomQId}/answers`, payload, params);
    check(res, {'status was 200': r => r.status === 200});
    check(res, {'status was 400': r => r.status === 400});
    sleep(1);
}