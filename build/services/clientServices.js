"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.addClient = exports.getClientById = exports.getClients = void 0;
const node_routeros_1 = require("node-routeros");
const dotnev = __importStar(require("dotenv"));
dotnev.config();
const conn = new node_routeros_1.RouterOSAPI({
    host: process.env.HOST,
    user: process.env.USSERREAD,
    password: process.env.PASSWORD
});
const connW = new node_routeros_1.RouterOSAPI({
    host: process.env.HOST,
    user: process.env.USERWRITE,
    password: process.env.PASSWORD
});
const getClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conn.connect();
        const result = yield conn.write('/queue/simple/print');
        const clients = result.map(c => ({
            id: c['.id'],
            name: c.name,
            target: c.target,
            maxLimit: c['max-limit']
        }));
        yield conn.close();
        return clients;
    }
    catch (e) {
        return undefined;
    }
});
exports.getClients = getClients;
const getClientById = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conn.connect();
        const result = yield conn.write('/queue/simple/print');
        const clients = result.map(c => ({
            id: c['.id'],
            name: c.name,
            target: c.target,
            maxLimit: c['max-limit']
        }));
        yield conn.close();
        return clients.find(c => c.name === name);
    }
    catch (e) {
        return undefined;
    }
});
exports.getClientById = getClientById;
const addClient = (name, target, maxLimit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connW.connect();
        const res = yield connW.write('/queue/simple/add', [
            `=name=${name}`,
            `=target=${target}`,
            `=max-limit=${maxLimit}`
        ]);
        yield connW.close();
        return res;
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
        return undefined;
    }
});
exports.addClient = addClient;
const deleteClient = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connW.connect();
        const clients = yield (0, exports.getClients)();
        const client = clients === null || clients === void 0 ? void 0 : clients.find(c => c.name === name);
        if (client !== undefined) {
            const res = yield connW.write('/queue/simple/remove', [`=.id=${client === null || client === void 0 ? void 0 : client.id}`]);
            yield connW.close();
            return res;
        }
        return undefined;
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
        return undefined;
    }
});
exports.deleteClient = deleteClient;
