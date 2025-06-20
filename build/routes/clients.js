"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientServices_1 = require("../services/clientServices");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield (0, clientServices_1.getClients)();
    if (clients === undefined) {
        res.status(404).send('Error');
        return;
    }
    if ((clients === null || clients === void 0 ? void 0 : clients.length) === 0) {
        res.status(404).send('Error');
        return;
    }
    res.status(200).send(clients);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, clientServices_1.getClientById)(req.params.id);
    if (client === undefined || client === null) {
        res.status(404).send('Error');
        return;
    }
    res.status(200).send(client);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = yield (0, clientServices_1.addClient)(req.body.name, req.body.target, req.body.maxLimit);
    if (newClient === undefined || newClient === null) {
        res.status(404).send('No fue posible crear el cliente');
    }
    res.status(201).send(newClient);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield (0, clientServices_1.deleteClient)(req.params.id));
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(500).send('Error');
        }
    }
}));
exports.default = router;
