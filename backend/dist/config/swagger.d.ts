/**
 * Configuration Swagger / OpenAPI pour la documentation interactive.
 * Accessible à l'URL /api-docs une fois le serveur lancé.
 */
export declare const swaggerDocument: {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
        contact: {
            name: string;
        };
    };
    servers: {
        url: string;
        description: string;
        variables: {
            port: {
                default: string;
            };
        };
    }[];
    tags: {
        name: string;
        description: string;
    }[];
    paths: {
        "/public/key-figures": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/news/public": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/news/public/{id}": {
            get: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/news/admin": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "201": {
                        description: string;
                    };
                };
            };
        };
        "/news/admin/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            put: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/news/admin/{id}/status": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/calendar/public": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/calendar/event-types": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/calendar/admin": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "201": {
                        description: string;
                    };
                };
            };
        };
        "/calendar/admin/{id}": {
            put: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/contact/public": {
            post: {
                tags: string[];
                summary: string;
                responses: {
                    "201": {
                        description: string;
                    };
                };
            };
        };
        "/contact/admin": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/contact/admin/unread-count": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/contact/admin/{id}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/contact/admin/{id}/read": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/contact/admin/{id}/reply": {
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "201": {
                        description: string;
                    };
                };
            };
        };
        "/auth/login": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/auth/refresh": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                            example: boolean;
                                        };
                                        data: {
                                            type: string;
                                            properties: {
                                                accessToken: {
                                                    type: string;
                                                };
                                            };
                                        };
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                    };
                };
            };
        };
        "/auth/logout": {
            post: {
                tags: string[];
                summary: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/auth/me": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                            example: boolean;
                                        };
                                        data: {
                                            $ref: string;
                                        };
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/grades": {
            get: {
                tags: string[];
                summary: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                            example: boolean;
                                        };
                                        data: {
                                            type: string;
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/pre-registrations": {
            post: {
                tags: string[];
                summary: string;
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                        enum?: undefined;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                        default?: undefined;
                    };
                    description: string;
                })[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/stats": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                        };
                                        data: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/students": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum?: undefined;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                    };
                })[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/students/export": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "text/csv": {
                                schema: {
                                    type: string;
                                    format: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/students/{id}/status": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    status: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/admin/pre-registrations/{id}/convert": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/pre-registrations/{id}/resend-emails": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/upload/single": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: string;
                                properties: {
                                    file: {
                                        type: string;
                                        format: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/upload/multiple": {
            post: {
                tags: string[];
                summary: string;
                description: string;
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: string;
                                properties: {
                                    files: {
                                        type: string;
                                        items: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/classes": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                        };
                                        data: {
                                            type: string;
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/teachers": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                $ref: string;
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/subjects": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                        };
                                        data: {
                                            type: string;
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                required: string[];
                                properties: {
                                    name: {
                                        type: string;
                                    };
                                    code: {
                                        type: string;
                                    };
                                    description: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "201": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/grades": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/grades/stats": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                        };
                                        data: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/absences": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum?: undefined;
                    };
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        enum: string[];
                    };
                })[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/absences/stats": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: string;
                                    properties: {
                                        success: {
                                            type: string;
                                        };
                                        data: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/absences/{id}/justify": {
            put: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                required: string[];
                                properties: {
                                    isJustified: {
                                        type: string;
                                    };
                                    reason: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/admin/report-cards/export-batch/{classId}": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/student/report-cards": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/parent/report-cards": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/admin/payments": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/admin/payments/stats": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/admin/payments/{id}": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    required: boolean;
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    amountPaid: {
                                        type: string;
                                    };
                                    reference: {
                                        type: string;
                                    };
                                    paymentMethod: {
                                        type: string;
                                        enum: string[];
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/student/payments": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/parent/payments": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/messages/inbox": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/messages/sent": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/messages/users/search": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/messages": {
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "201": {
                        description: string;
                    };
                };
            };
        };
        "/messages/{id}/read": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/teacher/lesson-book": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            post: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "201": {
                        description: string;
                    };
                };
            };
        };
        "/teacher/lesson-book/{id}": {
            patch: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            delete: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/admin/lesson-book": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/student/lesson-book": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/parent/lesson-book": {
            get: {
                tags: string[];
                summary: string;
                security: {
                    bearerAuth: never[];
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
    };
    components: {
        schemas: {
            Subject: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    code: {
                        type: string;
                    };
                    description: {
                        type: string;
                    };
                };
            };
            AdminStats: {
                type: string;
                properties: {
                    totalStudents: {
                        type: string;
                    };
                    activeStudents: {
                        type: string;
                    };
                    pendingPreRegistrations: {
                        type: string;
                    };
                    registrationsGrowth: {
                        type: string;
                    };
                    monthlyStats: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                month: {
                                    type: string;
                                };
                                registrations: {
                                    type: string;
                                };
                                students: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            CreateStudentInput: {
                type: string;
                required: string[];
                properties: {
                    firstName: {
                        type: string;
                        example: string;
                    };
                    lastName: {
                        type: string;
                        example: string;
                    };
                    birthDate: {
                        type: string;
                        format: string;
                    };
                    address: {
                        type: string;
                    };
                    schoolYear: {
                        type: string;
                        example: string;
                    };
                    classId: {
                        type: string;
                        nullable: boolean;
                    };
                    parentName: {
                        type: string;
                    };
                    parentEmail: {
                        type: string;
                        format: string;
                    };
                    parentPhone: {
                        type: string;
                    };
                };
            };
            Student: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    studentCardNumber: {
                        type: string;
                    };
                    user: {
                        $ref: string;
                    };
                    status: {
                        type: string;
                    };
                    schoolYear: {
                        type: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            StudentPaginatedResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                    };
                    data: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    meta: {
                        type: string;
                        properties: {
                            total: {
                                type: string;
                            };
                            page: {
                                type: string;
                            };
                            limit: {
                                type: string;
                            };
                        };
                    };
                };
            };
            StudentSuccessResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                    };
                    data: {
                        $ref: string;
                    };
                };
            };
            CreatePreRegistration: {
                type: string;
                required: string[];
                properties: {
                    childFirstName: {
                        type: string;
                        example: string;
                    };
                    childLastName: {
                        type: string;
                        example: string;
                    };
                    childDateOfBirth: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    gender: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                    childEmail: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    previousSchool: {
                        type: string;
                        example: string;
                    };
                    desiredGrade: {
                        type: string;
                        example: string;
                    };
                    parentFirstName: {
                        type: string;
                        example: string;
                    };
                    parentFullName: {
                        type: string;
                        example: string;
                    };
                    parentEmail: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    parentPhone: {
                        type: string;
                        example: string;
                    };
                    parentAddress: {
                        type: string;
                        example: string;
                    };
                    receiptNumber: {
                        type: string;
                        example: string;
                    };
                    receiptImageUrl: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    documentUrls: {
                        type: string;
                        items: {
                            type: string;
                            format: string;
                        };
                        example: string[];
                    };
                };
            };
            PreRegistration: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        example: number;
                    };
                    fileNumber: {
                        type: string;
                        example: string;
                    };
                    childFirstName: {
                        type: string;
                        example: string;
                    };
                    childLastName: {
                        type: string;
                        example: string;
                    };
                    childDateOfBirth: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    gender: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                    childEmail: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    previousSchool: {
                        type: string;
                        example: string;
                    };
                    desiredGrade: {
                        type: string;
                        example: string;
                    };
                    parentFirstName: {
                        type: string;
                        example: string;
                    };
                    parentFullName: {
                        type: string;
                        example: string;
                    };
                    parentEmail: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    parentPhone: {
                        type: string;
                        example: string;
                    };
                    parentAddress: {
                        type: string;
                        example: string;
                    };
                    receiptNumber: {
                        type: string;
                        example: string;
                    };
                    receiptImageUrl: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    documentUrls: {
                        type: string;
                        items: {
                            type: string;
                            format: string;
                        };
                        example: string[];
                    };
                    status: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                    submittedAt: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    updatedAt: {
                        type: string;
                        format: string;
                        example: string;
                    };
                };
            };
            UpdatePreRegistration: {
                type: string;
                required: string[];
                properties: {
                    status: {
                        type: string;
                        enum: string[];
                        example: string;
                    };
                };
            };
            SuccessResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    data: {
                        oneOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    message: {
                        type: string;
                    };
                };
            };
            ErrorResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    error: {
                        type: string;
                    };
                };
            };
            PaginatedResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    data: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    meta: {
                        type: string;
                        properties: {
                            total: {
                                type: string;
                            };
                            page: {
                                type: string;
                            };
                            limit: {
                                type: string;
                            };
                            totalPages: {
                                type: string;
                            };
                        };
                    };
                    message: {
                        type: string;
                    };
                };
            };
            UploadResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    data: {
                        type: string;
                        properties: {
                            url: {
                                type: string;
                                format: string;
                            };
                            filename: {
                                type: string;
                            };
                            mimetype: {
                                type: string;
                            };
                            size: {
                                type: string;
                            };
                        };
                    };
                    message: {
                        type: string;
                    };
                };
            };
            UploadMultipleResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    data: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                url: {
                                    type: string;
                                    format: string;
                                };
                                filename: {
                                    type: string;
                                };
                                mimetype: {
                                    type: string;
                                };
                                size: {
                                    type: string;
                                };
                            };
                        };
                    };
                    message: {
                        type: string;
                    };
                };
            };
            Grade: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        example: number;
                    };
                    value: {
                        type: string;
                        example: string;
                    };
                    label: {
                        type: string;
                        example: string;
                    };
                };
            };
            LoginInput: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                        example: string;
                    };
                    password: {
                        type: string;
                        format: string;
                        example: string;
                    };
                };
            };
            AuthResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                        example: boolean;
                    };
                    data: {
                        type: string;
                        properties: {
                            accessToken: {
                                type: string;
                            };
                            user: {
                                $ref: string;
                            };
                        };
                    };
                    message: {
                        type: string;
                    };
                };
            };
            User: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    firstName: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    email: {
                        type: string;
                        format: string;
                    };
                    role: {
                        type: string;
                        enum: string[];
                    };
                    active: {
                        type: string;
                    };
                    createdAt: {
                        type: string;
                        format: string;
                    };
                };
            };
            Class: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    name: {
                        type: string;
                    };
                    level: {
                        type: string;
                    };
                    schoolYear: {
                        type: string;
                    };
                    maxCapacity: {
                        type: string;
                    };
                    headTeacher: {
                        $ref: string;
                    };
                };
            };
            CreateClassInput: {
                type: string;
                required: string[];
                properties: {
                    name: {
                        type: string;
                    };
                    level: {
                        type: string;
                    };
                    schoolYear: {
                        type: string;
                    };
                    maxCapacity: {
                        type: string;
                    };
                    headTeacherId: {
                        type: string;
                        nullable: boolean;
                    };
                };
            };
            Teacher: {
                type: string;
                properties: {
                    id: {
                        type: string;
                    };
                    userId: {
                        type: string;
                    };
                    speciality: {
                        type: string;
                    };
                    phone: {
                        type: string;
                    };
                    user: {
                        $ref: string;
                    };
                };
            };
            TeacherPaginatedResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                    };
                    data: {
                        type: string;
                        items: {
                            $ref: string;
                        };
                    };
                    meta: {
                        type: string;
                        properties: {
                            total: {
                                type: string;
                            };
                            page: {
                                type: string;
                            };
                            limit: {
                                type: string;
                            };
                            totalPages: {
                                type: string;
                            };
                        };
                    };
                };
            };
            CreateTeacherInput: {
                type: string;
                required: string[];
                properties: {
                    firstName: {
                        type: string;
                    };
                    lastName: {
                        type: string;
                    };
                    email: {
                        type: string;
                        format: string;
                    };
                    speciality: {
                        type: string;
                    };
                    phone: {
                        type: string;
                    };
                };
            };
            GradePaginatedResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                    };
                    data: {
                        type: string;
                        properties: {
                            grades: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        id: {
                                            type: string;
                                        };
                                        value: {
                                            type: string;
                                        };
                                        semester: {
                                            type: string;
                                        };
                                        comment: {
                                            type: string;
                                            nullable: boolean;
                                        };
                                        student: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                            pagination: {
                                type: string;
                                properties: {
                                    total: {
                                        type: string;
                                    };
                                    page: {
                                        type: string;
                                    };
                                    limit: {
                                        type: string;
                                    };
                                    totalPages: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            GradeStats: {
                type: string;
                properties: {
                    totalGrades: {
                        type: string;
                    };
                    average: {
                        type: string;
                    };
                    highest: {
                        type: string;
                    };
                    lowest: {
                        type: string;
                    };
                    distribution: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                range: {
                                    type: string;
                                };
                                count: {
                                    type: string;
                                };
                            };
                        };
                    };
                };
            };
            AbsencePaginatedResponse: {
                type: string;
                properties: {
                    success: {
                        type: string;
                    };
                    data: {
                        type: string;
                        properties: {
                            absences: {
                                type: string;
                                items: {
                                    type: string;
                                    properties: {
                                        id: {
                                            type: string;
                                        };
                                        date: {
                                            type: string;
                                            format: string;
                                        };
                                        status: {
                                            type: string;
                                            enum: string[];
                                        };
                                        reason: {
                                            type: string;
                                            nullable: boolean;
                                        };
                                        isJustified: {
                                            type: string;
                                        };
                                        student: {
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                            pagination: {
                                type: string;
                                properties: {
                                    total: {
                                        type: string;
                                    };
                                    page: {
                                        type: string;
                                    };
                                    limit: {
                                        type: string;
                                    };
                                    totalPages: {
                                        type: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            AbsenceStats: {
                type: string;
                properties: {
                    totalAbsences: {
                        type: string;
                    };
                    absentCount: {
                        type: string;
                    };
                    lateCount: {
                        type: string;
                    };
                    justifiedCount: {
                        type: string;
                    };
                    unjustifiedCount: {
                        type: string;
                    };
                };
            };
        };
        securitySchemes: {
            bearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
            };
        };
    };
};
//# sourceMappingURL=swagger.d.ts.map