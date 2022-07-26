/* eslint-disable prettier/prettier */
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ProduitRoute from './routes/produits.route';
import CategoryRoute from './routes/category.route';
import RoleRoute from './routes/roles.route';
import StockRoute from './routes/stock.route';
import TypeMouvementRoute from './routes/typeMouvement.route';
import MouvementRoute from './routes/mouvement.route';
import DetailMouvementRoute from './routes/detailMouvement.rout';
import SeuilSecurityRoute from './routes/seuilSecurity.route';

validateEnv();

const app = new App([
    new IndexRoute(), 
    new UsersRoute(), 
    new AuthRoute(), 
    new ProduitRoute(), 
    new CategoryRoute(),
    new RoleRoute(),
    new StockRoute(),
    new TypeMouvementRoute(),
    new MouvementRoute(),
    new DetailMouvementRoute(),
    new SeuilSecurityRoute()
]);

app.listen();
