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
        };
    };
};
//# sourceMappingURL=swagger.d.ts.map