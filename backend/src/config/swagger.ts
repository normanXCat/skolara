/**
 * Configuration Swagger / OpenAPI pour la documentation interactive.
 * Accessible à l'URL /api-docs une fois le serveur lancé.
 */
export const swaggerDocument = {
    openapi: "3.0.3",
    info: {
        title: "Skolara – API Pré-inscriptions",
        version: "1.0.0",
        description:
            "API REST pour la gestion des pré-inscriptions scolaires de Skolara.",
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
                    default: "5000",
                },
            },
        },
    ],
    tags: [
        {
            name: "PreRegistrations",
            description: "Opérations CRUD sur les pré-inscriptions",
        },
    ],
    paths: {
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
                summary:
                    "Lister les pré-inscriptions avec pagination et filtre (admin)",
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
                summary:
                    "Obtenir le détail d'une pré-inscription par id (admin)",
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
                summary:
                    "Mettre à jour le statut d'une pré-inscription (admin)",
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
    },
    components: {
        schemas: {
            CreatePreRegistration: {
                type: "object",
                required: [
                    "childFirstName",
                    "childLastName",
                    "childDateOfBirth",
                    "desiredGrade",
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
                    desiredGrade: { type: "string", example: "CP" },
                    parentFullName: { type: "string", example: "Karim Benali" },
                    parentEmail: {
                        type: "string",
                        format: "email",
                        example: "karim@example.com",
                    },
                    parentPhone: { type: "string", example: "+213555123456" },
                    documentUrls: {
                        type: "array",
                        items: { type: "string", format: "uri" },
                        example: ["https://example.com/doc1.pdf"],
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
                    data: { type: "object" },
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
                    data: { type: "array", items: { type: "object" } },
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
        },
    },
};
