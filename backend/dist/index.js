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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const data = [
    { email: 'jim@gmail.com', number: '221122' },
    { email: 'jam@gmail.com', number: '830347' },
    { email: 'john@gmail.com', number: '221122' },
    { email: 'jams@gmail.com', number: '349425' },
    { email: 'jams@gmail.com', number: '141424' },
    { email: 'jill@gmail.com', number: '822287' },
    { email: 'jill@gmail.com', number: '822286' }
];
let currentRequest = null;
app.get('/', (req, res) => {
    res.send('Server is running. Use the /search endpoint to perform a search.');
});
app.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, number } = req.body;
    if (!email || (number && !/^\d{2}-\d{2}-\d{2}$/.test(number))) {
        res.status(400).json({ error: 'Некорректный email или number' });
        return;
    }
    if (currentRequest) {
        clearTimeout(currentRequest);
    }
    currentRequest = setTimeout(() => {
        const formattedNumber = number ? number.replace(/-/g, '') : '';
        const results = data.filter(item => item.email.toLowerCase().includes(email.toLowerCase()) &&
            (!formattedNumber || item.number === formattedNumber));
        currentRequest = null;
        res.json(results);
    }, 5000);
}));
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
