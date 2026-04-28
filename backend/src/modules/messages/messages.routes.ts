import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import { MessagesController } from "./messages.controller";

const router = Router();
const controller = new MessagesController();

router.use(authenticate);

/**
 * @swagger
 * /messages/inbox:
 *   get:
 *     tags: [Messages]
 *     summary: Récupérer la boîte de réception
 *     security: [{ bearerAuth: [] }]
 */
router.get("/inbox", controller.getInbox.bind(controller));

/**
 * @swagger
 * /messages/sent:
 *   get:
 *     tags: [Messages]
 *     summary: Récupérer les messages envoyés
 *     security: [{ bearerAuth: [] }]
 */
router.get("/sent", controller.getSent.bind(controller));

/**
 * @swagger
 * /messages/conversations:
 *   get:
 *     tags: [Messages]
 *     summary: Liste des conversations (type messagerie privée)
 *     security: [{ bearerAuth: [] }]
 */
router.get("/conversations", controller.getConversations.bind(controller));

/**
 * @swagger
 * /messages/conversations/{peerId}:
 *   get:
 *     tags: [Messages]
 *     summary: Récupérer le thread avec un utilisateur
 *     security: [{ bearerAuth: [] }]
 */
router.get(
  "/conversations/:peerId",
  controller.getConversationMessages.bind(controller),
);

/**
 * @swagger
 * /messages/users/search:
 *   get:
 *     tags: [Messages]
 *     summary: Rechercher un destinataire potentiel
 *     security: [{ bearerAuth: [] }]
 */
router.get("/users/search", controller.searchUsers.bind(controller));

/**
 * @swagger
 * /messages/unread-count:
 *   get:
 *     tags: [Messages]
 *     summary: Compter les messages non lus
 *     security: [{ bearerAuth: [] }]
 */
router.get("/unread-count", controller.getUnreadCount.bind(controller));

/**
 * @swagger
 * /messages:
 *   post:
 *     tags: [Messages]
 *     summary: Envoyer un nouveau message
 *     security: [{ bearerAuth: [] }]
 */
router.post("/", controller.sendMessage.bind(controller));

/**
 * @swagger
 * /messages/{id}/read:
 *   patch:
 *     tags: [Messages]
 *     summary: Marquer comme lu
 *     security: [{ bearerAuth: [] }]
 */
router.patch("/:id/read", controller.markAsRead.bind(controller));

export default router;
