"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'your-secret-key-change-in-production';
// Mock database - em produção, use um banco real
let users = [
    {
        id: '1',
        email: 'demo@animalhotels.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        name: 'Usuário Demo'
    }
];
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validar entrada
        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
        // Encontrar usuário
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }
        // Verificar senha
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Credenciais inválidas' });
        }
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        // Retornar resposta
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    }
    catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.login = login;
const getProfile = (req, res) => {
    // Esta função precisaria do middleware de autenticação
    res.json({ message: 'Perfil do usuário' });
};
exports.getProfile = getProfile;
