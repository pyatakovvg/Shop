
import check from '../controllers/Identity/check';
import connect from '../controllers/Identity/connect';
import refresh from '../controllers/Identity/refresh';
import signUp from '../controllers/Identity/sign-up';


export default (router) => {

  router
    .post('/v1/api/check', check())
    .post('/v1/api/refresh', refresh())
    .post('/v1/api/connect', connect())
    .post('/v1/api/sign-up', signUp());
}
