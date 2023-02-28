import User from './models/User.js';
import UserDetail from './models/UserDetail.js';
import Client from './models/Client.js';
import ClientAccount from './models/ClientAccount.js';
import ClientDetail from './models/ClientDetail.js';
import Game from './models/Game.js';
import Category from './models/Category.js';
import Bank from './models/Bank.js';
import BankBranch from './models/BankBranch.js';
import Payment from './models/Payment.js';
import PaymentInstruction from './models/PaymentInstruction.js';

Client.hasOne(ClientDetail, { foreignKey: 'client_id' });
ClientDetail.belongsTo(Client);

Client.hasMany(ClientAccount, { foreignKey: 'client_id' });
ClientAccount.belongsTo(Client);

User.hasOne(UserDetail, { foreignKey: 'user_id' });
UserDetail.belongsTo(User);

Bank.hasMany(BankBranch, { foreignKey: 'bank_id' });
BankBranch.belongsTo(Bank);

BankBranch.hasMany(ClientAccount, { foreignKey: 'bank_branch_id' });
ClientAccount.belongsTo(BankBranch);

Category.hasMany(Game, { foreignKey: 'category_id' });
Game.belongsTo(Category);

PaymentInstruction.hasOne(Payment, { foreignKey: 'payment_instruction_id' });
Payment.belongsTo(PaymentInstruction);


export {
    User,
    UserDetail,
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
