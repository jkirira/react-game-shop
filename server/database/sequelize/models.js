import User from './models/User';
import Client from './models/Client';
import ClientAccount from './models/ClientAccount';
import ClientDetail from './models/ClientDetail';
import Game from './models/Game';
import Category from './models/Category';
import Bank from './models/Bank';
import BankBranch from './models/BankBranch';
import Payment from './models/Payment';
import PaymentInstruction from './models/PaymentInstruction';

Client.hasOne(ClientDetail, { foreignKey: 'client_id' });
ClientDetail.belongsTo(Client);

Client.hasMany(ClientAccount, { foreignKey: 'client_id' });
ClientAccount.belongsTo(Client);

Bank.hasMany(BankBranch, { foreignKey: 'bank_id' });
BankBranch.belongsTo(Bank);

BankBranch.hasMany(ClientAccount, { foreignKey: 'bank_branch_id' });
ClientAccount.belongsTo(BankBranch);

Category.hasMany(Game, { foreignKey: 'category_id' });
Game.belongsTo(Category);

PaymentInstruction.hasOne(Payment, { foreignKey: 'payment_instruction_id' });
Payment.belongsTo(PaymentInstruction);


export default {
    User,
    Client,
    ClientAccount,
    ClientDetail,
    Game,
    Category,
    Bank,
    BankBranch,
    Payment,
    PaymentInstruction
}
