import {Router} from 'express';
const router=Router();
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middleware/AuthMiddleware';
import ChatGroupController from '../controllers/ChatGroupController';
import ChatGroupUserController from '../controllers/ChatGroupUserController';
import ChatsController from '../controllers/ChatsController';
// Auth Routes
router.post("/auth/login", AuthController.login);

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

// * Chat group user
router.get("/chat-group-user", ChatGroupUserController.index);
router.post("/chat-group-user", ChatGroupUserController.store);

// * Chats
router.get("/chats/:groupId", ChatsController.index);
export default router;