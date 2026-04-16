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
        "/pre-registrations/{id}": {
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
                    description: string;
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
                    "404": {
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
            patch: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                    description: string;
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
                    "404": {
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
            delete: {
                tags: string[];
                summary: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                    description: string;
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
                    "404": {
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
    };
    components: {
        schemas: {
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
                    desiredGrade: {
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
                        type: string;
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
                            type: string;
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
        };
    };
};
//# sourceMappingURL=swagger.d.ts.map