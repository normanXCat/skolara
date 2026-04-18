"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = void 0;
/**
 * Configuration Swagger / OpenAPI pour la documentation interactive.
 * Accessible à l'URL /api-docs une fois le serveur lancé.
 */
exports.swaggerDocument = {
    openapi: "3.0.3",
    info: {
        title: "Skolara – API",
        version: "1.0.0",
        description: "API REST scolaires de Skolara.",
        contact: {
            name: "Norman",
        },
    },
    servers: [
        {
            url: "http://localhost:{port}/api",
            description: "Serveur de développement",
            variables: {
                port: {
                    default: "8000",
                },
            },
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "Authentification et gestion de session",
        },
        {
            name: "PreRegistrations",
            description: "Opérations CRUD sur les pré-inscriptions",
        },
        {
            name: "Grades",
            description: "Récupération des niveaux scolaires (grades)",
        },
    ],
    paths: {
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "S'authentifier (Public)",
                description: "Vérifie les identifiants et retourne un Access Token (JWT) et un Refresh Token (Cookie HttpOnly).",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/LoginInput",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Authentification réussie",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AuthResponse",
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Identifiants invalides",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Rafraîchir le token (Public/Cookie)",
                description: "Utilise le refreshToken stocké dans le cookie HttpOnly pour générer un nouvel access token.",
                responses: {
                    "200": {
                        description: "Token rafraîchi",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                            },
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Token invalide ou expiré",
                    },
                },
            },
        },
        "/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "Se déconnecter (Public/Cookie)",
                responses: {
                    "200": {
                        description: "Déconnexion réussie",
                    },
                },
            },
        },
        "/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Profil de l'utilisateur (Protégé)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Profil récupéré",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                        },
                                        data: {
                                            $ref: "#/components/schemas/User",
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/grades": {
            get: {
                tags: ["Grades"],
                summary: "Lister tous les niveaux scolaires disponibles (public)",
                responses: {
                    "200": {
                        description: "Liste des grades",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Grade",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/pre-registrations": {
            post: {
                tags: ["PreRegistrations"],
                summary: "Créer une pré-inscription (public)",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreatePreRegistration",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Pré-inscription créée avec succès",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SuccessResponse",
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Données invalides",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
            get: {
                tags: ["PreRegistrations"],
                summary: "Lister les pré-inscriptions avec pagination et filtre (admin)",
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer", default: 1 },
                        description: "Numéro de page",
                    },
                    {
                        name: "limit",
                        in: "query",
                        schema: { type: "integer", default: 10 },
                        description: "Nombre d'éléments par page",
                    },
                    {
                        name: "status",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: [
                                "PENDING",
                                "IN_REVIEW",
                                "ACCEPTED",
                                "REJECTED",
                            ],
                        },
                        description: "Filtrer par statut",
                    },
                ],
                responses: {
                    "200": {
                        description: "Liste paginée des pré-inscriptions",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PaginatedResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/pre-registrations/{id}": {
            get: {
                tags: ["PreRegistrations"],
                summary: "Obtenir le détail d'une pré-inscription par id (admin)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Identifiant de la pré-inscription",
                    },
                ],
                responses: {
                    "200": {
                        description: "Détail de la pré-inscription",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SuccessResponse",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Pré-inscription non trouvée",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
            patch: {
                tags: ["PreRegistrations"],
                summary: "Mettre à jour le statut d'une pré-inscription (admin)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Identifiant de la pré-inscription",
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdatePreRegistration",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Pré-inscription mise à jour",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SuccessResponse",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Pré-inscription non trouvée",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["PreRegistrations"],
                summary: "Supprimer une pré-inscription (admin)",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                        description: "Identifiant de la pré-inscription",
                    },
                ],
                responses: {
                    "200": {
                        description: "Pré-inscription supprimée",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SuccessResponse",
                                },
                            },
                        },
                    },
                    "404": {
                        description: "Pré-inscription non trouvée",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/upload/single": {
            post: {
                tags: ["Uploads"],
                summary: "Uploader un fichier unique",
                description: "Accepte JPG, PNG, WEBP ou PDF (max 5 Mo).",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    file: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Fichier uploadé",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UploadResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/upload/multiple": {
            post: {
                tags: ["Uploads"],
                summary: "Uploader plusieurs fichiers",
                description: "Max 5 fichiers (max 5 Mo chacun).",
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    files: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            format: "binary",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Fichiers uploadés",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UploadMultipleResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            CreatePreRegistration: {
                type: "object",
                required: [
                    "childFirstName",
                    "childLastName",
                    "childDateOfBirth",
                    "gender",
                    "desiredGrade",
                    "parentFirstName",
                    "parentFullName",
                    "parentEmail",
                    "parentPhone",
                ],
                properties: {
                    childFirstName: { type: "string", example: "Amine" },
                    childLastName: { type: "string", example: "Benali" },
                    childDateOfBirth: {
                        type: "string",
                        format: "date-time",
                        example: "2018-05-15T00:00:00.000Z",
                    },
                    gender: {
                        type: "string",
                        enum: ["M", "F"],
                        example: "M",
                    },
                    childEmail: {
                        type: "string",
                        format: "email",
                        example: "amine@example.com",
                    },
                    previousSchool: {
                        type: "string",
                        example: "École des Pins",
                    },
                    desiredGrade: { type: "string", example: "CP" },
                    parentFirstName: { type: "string", example: "Karim" },
                    parentFullName: { type: "string", example: "Karim Benali" },
                    parentEmail: {
                        type: "string",
                        format: "email",
                        example: "karim@example.com",
                    },
                    parentPhone: { type: "string", example: "+213555123456" },
                    parentAddress: {
                        type: "string",
                        example: "123 Rue de la Liberté, Alger",
                    },
                    receiptNumber: { type: "string", example: "REC-987654" },
                    receiptImageUrl: {
                        type: "string",
                        format: "uri",
                        example: "https://storage.skolara.com/receipts/123.jpg",
                    },
                    documentUrls: {
                        type: "array",
                        items: { type: "string", format: "uri" },
                        example: ["https://example.com/doc1.pdf"],
                    },
                },
            },
            PreRegistration: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    fileNumber: { type: "string", example: "PRE-2024-0001" },
                    childFirstName: { type: "string", example: "Amine" },
                    childLastName: { type: "string", example: "Benali" },
                    childDateOfBirth: {
                        type: "string",
                        format: "date-time",
                        example: "2018-05-15T00:00:00.000Z",
                    },
                    gender: {
                        type: "string",
                        enum: ["M", "F"],
                        example: "M",
                    },
                    childEmail: {
                        type: "string",
                        format: "email",
                        example: "amine@example.com",
                    },
                    previousSchool: {
                        type: "string",
                        example: "École des Pins",
                    },
                    desiredGrade: { type: "string", example: "CP" },
                    parentFirstName: { type: "string", example: "Karim" },
                    parentFullName: { type: "string", example: "Karim Benali" },
                    parentEmail: {
                        type: "string",
                        format: "email",
                        example: "karim@example.com",
                    },
                    parentPhone: { type: "string", example: "+213555123456" },
                    parentAddress: {
                        type: "string",
                        example: "123 Rue de la Liberté, Alger",
                    },
                    receiptNumber: { type: "string", example: "REC-987654" },
                    receiptImageUrl: {
                        type: "string",
                        format: "uri",
                        example: "https://storage.skolara.com/receipts/123.jpg",
                    },
                    documentUrls: {
                        type: "array",
                        items: { type: "string", format: "uri" },
                        example: ["https://example.com/doc1.pdf"],
                    },
                    status: {
                        type: "string",
                        enum: ["PENDING", "IN_REVIEW", "ACCEPTED", "REJECTED"],
                        example: "PENDING",
                    },
                    submittedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-04-17T12:00:00Z",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-04-17T12:00:00Z",
                    },
                },
            },
            UpdatePreRegistration: {
                type: "object",
                required: ["status"],
                properties: {
                    status: {
                        type: "string",
                        enum: ["PENDING", "IN_REVIEW", "ACCEPTED", "REJECTED"],
                        example: "ACCEPTED",
                    },
                },
            },
            SuccessResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        oneOf: [
                            { $ref: "#/components/schemas/PreRegistration" },
                            { type: "object" },
                            { type: "null" },
                        ],
                    },
                    message: { type: "string" },
                },
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: false },
                    error: { type: "string" },
                },
            },
            PaginatedResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/PreRegistration" },
                    },
                    meta: {
                        type: "object",
                        properties: {
                            total: { type: "integer" },
                            page: { type: "integer" },
                            limit: { type: "integer" },
                            totalPages: { type: "integer" },
                        },
                    },
                    message: { type: "string" },
                },
            },
            UploadResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        type: "object",
                        properties: {
                            url: { type: "string", format: "uri" },
                            filename: { type: "string" },
                            mimetype: { type: "string" },
                            size: { type: "integer" },
                        },
                    },
                    message: { type: "string" },
                },
            },
            UploadMultipleResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                url: { type: "string", format: "uri" },
                                filename: { type: "string" },
                                mimetype: { type: "string" },
                                size: { type: "integer" },
                            },
                        },
                    },
                    message: { type: "string" },
                },
            },
            Grade: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    value: { type: "string", example: "CP" },
                    label: {
                        type: "string",
                        example: "Cours Préparatoire (CP)",
                    },
                },
            },
            LoginInput: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        format: "email",
                        example: "admin@skolara.com",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "Azerty123",
                    },
                },
            },
            AuthResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        type: "object",
                        properties: {
                            accessToken: { type: "string" },
                            user: { $ref: "#/components/schemas/User" },
                        },
                    },
                    message: { type: "string" },
                },
            },
            User: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    firstName: { type: "string" },
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    role: {
                        type: "string",
                        enum: ["ADMIN", "ENSEIGNANT", "ELEVE", "PARENT"],
                    },
                    active: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                },
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};
//# sourceMappingURL=swagger.js.map