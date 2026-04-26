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
            description: "Opérations sur les pré-inscriptions (Public et Admin)",
        },
        {
            name: "Grades",
            description: "Récupération des niveaux scolaires (grades)",
        },
        {
            name: "Admin-Students",
            description: "Gestion des élèves (Accès Admin uniquement)",
        },
        {
            name: "Admin-Stats",
            description: "Statistiques du tableau de bord (Accès Admin uniquement)",
        },
        {
            name: "Admin-Classes",
            description: "Gestion des classes (Accès Admin uniquement)",
        },
        {
            name: "Admin-Teachers",
            description: "Gestion des enseignants (Accès Admin uniquement)",
        },
        {
            name: "Admin-Subjects",
            description: "Gestion des matières (Accès Admin uniquement)",
        },
        {
            name: "Admin-Grades",
            description: "Consultation des notes (Accès Admin uniquement)",
        },
        {
            name: "Admin-Absences",
            description: "Gestion des absences (Accès Admin uniquement)",
        },
        {
            name: "Teacher-Operations",
            description: "Opérations spécialisées pour les enseignants",
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
                summary: "Lister les pré-inscriptions avec pagination et filtre (Admin Legacy)",
                security: [{ bearerAuth: [] }],
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
        "/admin/stats": {
            get: {
                tags: ["Admin-Stats"],
                summary: "Récupérer les statistiques globales (Admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Statistiques récupérées avec succès",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: {
                                            $ref: "#/components/schemas/AdminStats",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/admin/students": {
            get: {
                tags: ["Admin-Students"],
                summary: "Lister les élèves avec filtres (Admin)",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "page",
                        in: "query",
                        schema: { type: "integer" },
                    },
                    { name: "limit", in: "query", schema: { type: "integer" } },
                    { name: "search", in: "query", schema: { type: "string" } },
                    {
                        name: "status",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["ACTIVE", "ARCHIVED"],
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "Liste paginée des élèves",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/StudentPaginatedResponse",
                                },
                            },
                        },
                    },
                },
            },
            post: {
                tags: ["Admin-Students"],
                summary: "Créer manuellement un élève (Admin)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateStudentInput",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Élève créé avec succès",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/StudentSuccessResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/admin/students/export": {
            get: {
                tags: ["Admin-Students"],
                summary: "Exporter la liste des élèves en CSV (Admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Fichier CSV retourné",
                        content: {
                            "text/csv": {
                                schema: { type: "string", format: "binary" },
                            },
                        },
                    },
                },
            },
        },
        "/admin/students/{id}/status": {
            patch: {
                tags: ["Admin-Students"],
                summary: "Changer le statut d'un élève (Admin)",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "string",
                                        enum: ["ACTIVE", "ARCHIVED"],
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    "200": { description: "Statut mis à jour" },
                },
            },
        },
        "/admin/pre-registrations/{id}/convert": {
            post: {
                tags: ["PreRegistrations"],
                summary: "Convertir une pré-inscription en élève officiel (Admin)",
                description: "Crée un compte élève, des comptes parents et clôture la pré-inscription.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Conversion réussie",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SuccessResponse",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/admin/pre-registrations/{id}/resend-emails": {
            post: {
                tags: ["PreRegistrations"],
                summary: "Renvoyer les emails de bienvenue (Admin)",
                description: "Renvoie les identifiants aux parents et à l'élève.",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Emails renvoyés avec succès",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SuccessResponse",
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
        "/admin/classes": {
            get: {
                tags: ["Admin-Classes"],
                summary: "Lister toutes les classes (Admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Liste des classes",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Class" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Admin-Classes"],
                summary: "Créer une nouvelle classe (Admin)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateClassInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Classe créée",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/SuccessResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/admin/teachers": {
            get: {
                tags: ["Admin-Teachers"],
                summary: "Lister les enseignants (Admin)",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer" } },
                    { name: "limit", in: "query", schema: { type: "integer" } },
                    { name: "search", in: "query", schema: { type: "string" } }
                ],
                responses: {
                    "200": {
                        description: "Liste paginée des enseignants",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/TeacherPaginatedResponse" }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Admin-Teachers"],
                summary: "Créer un nouvel enseignant (Admin)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/CreateTeacherInput" }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Enseignant créé",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/SuccessResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/admin/subjects": {
            get: {
                tags: ["Admin-Subjects"],
                summary: "Lister toutes les matières (Admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Liste des matières",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Subject" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Admin-Subjects"],
                summary: "Créer une nouvelle matière (Admin)",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "code"],
                                properties: {
                                    name: { type: "string" },
                                    code: { type: "string" },
                                    description: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Matière créée",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/SuccessResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/admin/grades": {
            get: {
                tags: ["Admin-Grades"],
                summary: "Lister toutes les notes avec filtres (Admin)",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer" } },
                    { name: "limit", in: "query", schema: { type: "integer" } },
                    { name: "search", in: "query", schema: { type: "string" } },
                    { name: "classId", in: "query", schema: { type: "integer" } },
                    { name: "subjectId", in: "query", schema: { type: "integer" } },
                    { name: "semester", in: "query", schema: { type: "integer" } }
                ],
                responses: {
                    "200": {
                        description: "Liste des notes récupérée",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/GradePaginatedResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/admin/grades/stats": {
            get: {
                tags: ["Admin-Grades"],
                summary: "Statistiques globales des notes (Admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Statistiques récupérées",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: { $ref: "#/components/schemas/GradeStats" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/admin/absences": {
            get: {
                tags: ["Admin-Absences"],
                summary: "Lister toutes les absences avec filtres (Admin)",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: "page", in: "query", schema: { type: "integer" } },
                    { name: "limit", in: "query", schema: { type: "integer" } },
                    { name: "search", in: "query", schema: { type: "string" } },
                    { name: "classId", in: "query", schema: { type: "integer" } },
                    { name: "status", in: "query", schema: { type: "string", enum: ["PRESENT", "ABSENT", "LATE"] } },
                    { name: "isJustified", in: "query", schema: { type: "boolean" } }
                ],
                responses: {
                    "200": {
                        description: "Liste des absences récupérée",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/AbsencePaginatedResponse" }
                            }
                        }
                    }
                }
            }
        },
        "/admin/absences/stats": {
            get: {
                tags: ["Admin-Absences"],
                summary: "Statistiques globales des absences (Admin)",
                security: [{ bearerAuth: [] }],
                responses: {
                    "200": {
                        description: "Statistiques récupérées",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean" },
                                        data: { $ref: "#/components/schemas/AbsenceStats" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/admin/absences/{id}/justify": {
            put: {
                tags: ["Admin-Absences"],
                summary: "Justifier une absence (Admin)",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "integer" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["isJustified", "reason"],
                                properties: {
                                    isJustified: { type: "boolean" },
                                    reason: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Absence justifiée avec succès",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/SuccessResponse" }
                            }
                        }
                    }
                }
            }
        },
    },
    components: {
        schemas: {
            Subject: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    code: { type: "string" },
                    description: { type: "string" }
                }
            },
            AdminStats: {
                type: "object",
                properties: {
                    totalStudents: { type: "integer" },
                    activeStudents: { type: "integer" },
                    pendingPreRegistrations: { type: "integer" },
                    registrationsGrowth: { type: "number" },
                    monthlyStats: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                month: { type: "string" },
                                registrations: { type: "integer" },
                                students: { type: "integer" },
                            },
                        },
                    },
                },
            },
            CreateStudentInput: {
                type: "object",
                required: [
                    "firstName",
                    "lastName",
                    "birthDate",
                    "address",
                    "schoolYear",
                    "parentName",
                    "parentEmail",
                    "parentPhone",
                ],
                properties: {
                    firstName: { type: "string", example: "Jean" },
                    lastName: { type: "string", example: "Dupont" },
                    birthDate: { type: "string", format: "date" },
                    address: { type: "string" },
                    schoolYear: { type: "string", example: "2024-2025" },
                    classId: { type: "integer", nullable: true },
                    parentName: { type: "string" },
                    parentEmail: { type: "string", format: "email" },
                    parentPhone: { type: "string" },
                },
            },
            Student: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    studentCardNumber: { type: "string" },
                    user: { $ref: "#/components/schemas/User" },
                    status: { type: "string" },
                    schoolYear: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                },
            },
            StudentPaginatedResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                    data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Student" },
                    },
                    meta: {
                        type: "object",
                        properties: {
                            total: { type: "integer" },
                            page: { type: "integer" },
                            limit: { type: "integer" },
                        },
                    },
                },
            },
            StudentSuccessResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/Student" },
                },
            },
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
                        enum: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
                    },
                    active: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                },
            },
            Class: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    level: { type: "string" },
                    schoolYear: { type: "string" },
                    maxCapacity: { type: "integer" },
                    headTeacher: { $ref: "#/components/schemas/Teacher" }
                }
            },
            CreateClassInput: {
                type: "object",
                required: ["name", "level", "schoolYear"],
                properties: {
                    name: { type: "string" },
                    level: { type: "string" },
                    schoolYear: { type: "string" },
                    maxCapacity: { type: "integer" },
                    headTeacherId: { type: "integer", nullable: true }
                }
            },
            Teacher: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    userId: { type: "integer" },
                    speciality: { type: "string" },
                    phone: { type: "string" },
                    user: { $ref: "#/components/schemas/User" }
                }
            },
            TeacherPaginatedResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                    data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Teacher" }
                    },
                    meta: {
                        type: "object",
                        properties: {
                            total: { type: "integer" },
                            page: { type: "integer" },
                            limit: { type: "integer" },
                            totalPages: { type: "integer" }
                        }
                    }
                }
            },
            CreateTeacherInput: {
                type: "object",
                required: ["firstName", "lastName"],
                properties: {
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string", format: "email" },
                    speciality: { type: "string" },
                    phone: { type: "string" }
                }
            },
            GradePaginatedResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                    data: {
                        type: "object",
                        properties: {
                            grades: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        value: { type: "number" },
                                        semester: { type: "integer" },
                                        comment: { type: "string", nullable: true },
                                        student: { $ref: "#/components/schemas/Student" }
                                    }
                                }
                            },
                            pagination: {
                                type: "object",
                                properties: {
                                    total: { type: "integer" },
                                    page: { type: "integer" },
                                    limit: { type: "integer" },
                                    totalPages: { type: "integer" }
                                }
                            }
                        }
                    }
                }
            },
            GradeStats: {
                type: "object",
                properties: {
                    totalGrades: { type: "integer" },
                    average: { type: "number" },
                    highest: { type: "number" },
                    lowest: { type: "number" },
                    distribution: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                range: { type: "string" },
                                count: { type: "integer" }
                            }
                        }
                    }
                }
            },
            AbsencePaginatedResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                    data: {
                        type: "object",
                        properties: {
                            absences: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        date: { type: "string", format: "date-time" },
                                        status: { type: "string", enum: ["PRESENT", "ABSENT", "LATE"] },
                                        reason: { type: "string", nullable: true },
                                        isJustified: { type: "boolean" },
                                        student: { $ref: "#/components/schemas/Student" }
                                    }
                                }
                            },
                            pagination: {
                                type: "object",
                                properties: {
                                    total: { type: "integer" },
                                    page: { type: "integer" },
                                    limit: { type: "integer" },
                                    totalPages: { type: "integer" }
                                }
                            }
                        }
                    }
                }
            },
            AbsenceStats: {
                type: "object",
                properties: {
                    totalAbsences: { type: "integer" },
                    absentCount: { type: "integer" },
                    lateCount: { type: "integer" },
                    justifiedCount: { type: "integer" },
                    unjustifiedCount: { type: "integer" }
                }
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