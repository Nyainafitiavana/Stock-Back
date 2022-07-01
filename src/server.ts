/* eslint-disable prettier/prettier */
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ProduitRoute from './routes/produits.route';
import CategoryRoute from './routes/category.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ProduitRoute, new CategoryRoute]);

app.listen();
