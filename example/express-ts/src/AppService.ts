import PaymentRequiredError from './PaymentRequiredError';
import ops from 'ops-error';

class AppService {
    constructor() {}

    getUser(query: any) {
        if (!query.name) {
            throw new ops.BadRequestError('Bad request error. query name is required');
        }
        return { statusCode: 200, data: query.name };
    }

    getUserPayment(query: any) {
        if (!query.pay) {
            throw new PaymentRequiredError('Payment required error. query pay is required');
        }
        return { statusCode: 200, data: query.pay };
    }
}

export default AppService;