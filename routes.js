var app = module.parent.exports.app,
    apiRoutes = module.parent.exports.express.Router();

var authenticationController = require('./controllers/authenticationController'),
    jwtService = require('./services/jwtService'),
    homeController = require('./controllers/homeController'),
    usersController = require('./controllers/usersController');

apiRoutes.get('/users/create', usersController.createUsers);
apiRoutes.post('/authenticate', authenticationController.authenticate);

apiRoutes.use(jwtService.validateToken);
apiRoutes.get('/', homeController.displayHome);
apiRoutes.get('/users', usersController.getUsers);

app.use('/api', apiRoutes);
