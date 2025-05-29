export class ConnectionController {
    testConnection(req: any, res: any) {
        res.json({ status: 'ok', message: 'Server is reachable' });
    }
}

