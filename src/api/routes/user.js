// User is KNEX + MySql !
// move user routes here, move logic in /services/user.js 
import { Router} from 'express';
const route = Router();


export default (app) => {    // was typescript (app: Router)   "Router" is a type, caused issue. 
  app.post('/createUser', (req, res) => {
      store                     // store = KNEX -- MySQL
        .createUser({
          username: req.body.username,
          password: req.body.password
        })
        .then(() => res.sendStatus(200))
  })
}