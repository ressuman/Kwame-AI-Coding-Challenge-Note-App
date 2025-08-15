export const apiDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Notes API Documentation",
    version: "1.0.0",
    description:
      "REST API for note management with Express.js and MongoDB. A simple Notes API (Express + MongoDB). Create, list, update (autosave), and delete notes. Note titles are unique (case-insensitive).",
    contact: {
      name: "Richard Essuman",
      email: "ressuman001@gmail.com",
      url: "https://github.com/ressuman/Kwame-AI-Coding-Challenge-Note-App.git",
    },
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:4550",
      description: "Local development server (port from .env PORT=4550).",
    },
    {
      url: "YOUR_PRODUCTION_URL/api/v1", // Update with your hosted URL
      description: "Production server",
    },
  ],
  tags: [
    {
      name: "Notes",
      description:
        "Note management operations. Create, read, update, delete notes",
    },
    { name: "Health", description: "Service health and root endpoints checks" },
  ],
  paths: {
    "/api": {
      get: {
        tags: ["Health"],
        summary: "API root",
        description: "Root endpoint that lists basic API info and links.",
        responses: {
          200: {
            description: "Root info",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    documentation: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/health": {
      get: {
        tags: ["Health"],
        summary: "Healthcheck",
        responses: {
          200: {
            description: "Service healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { status: { type: "string" } },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/notes": {
      get: {
        tags: ["Notes"],
        summary: "List all notes",
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Page number",
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Items per page (max 200)",
            schema: { type: "integer", default: 50, maximum: 200 },
          },
          {
            name: "sort",
            in: "query",
            description: "Sort field (prefix with - for descending)",
            schema: { type: "string", default: "-updatedAt" },
          },
          { $ref: "#/components/parameters/PageParam" },
          { $ref: "#/components/parameters/LimitParam" },
          { $ref: "#/components/parameters/SortParam" },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PaginatedNotes",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Notes"],
        summary: "Create a new note",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NoteInput",
              },
              example: { title: "My note", body: "Note content..." },
            },
          },
        },
        responses: {
          201: {
            description: "Note created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Note",
                },
              },
            },
          },
          400: { $ref: "#/components/responses/ValidationError" },
          409: { $ref: "#/components/responses/DuplicateError" },
        },
      },
    },
    "/api/v1/notes/{id}": {
      get: {
        tags: ["Notes"],
        summary: "Get a note by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "MongoDB ObjectId of the note.",
          },
          { $ref: "#/components/parameters/NoteIdParam" },
        ],
        responses: {
          200: {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Note",
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
      patch: {
        tags: ["Notes"],
        summary: "Update a note (supports autosave as you type)",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
          { $ref: "#/components/parameters/NoteIdParam" },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NoteUpdateInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Note updated",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Note",
                },
              },
            },
          },
          400: { $ref: "#/components/responses/ValidationError" },
          404: { $ref: "#/components/responses/NotFound" },
          409: { $ref: "#/components/responses/DuplicateError" },
        },
      },
      delete: {
        tags: ["Notes"],
        summary: "Delete a note",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Note deleted" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Check API health",
        responses: {
          200: {
            description: "API is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                  },
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
      Note: {
        type: "object",
        properties: {
          _id: { type: "string", example: "64ff...abc" },
          title: {
            type: "string",
            description: "Unique note title (case-insensitive).",
            minLength: 1,
            maxLength: 100,
            example: "Meeting notes",
          },
          body: {
            type: "string",
            description: "Note content.",
            minLength: 1,
            maxLength: 10000,
            example: "We discussed the roadmap and action items...",
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["title", "body"],
      },
      NoteInput: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 1, maxLength: 100 },
          body: { type: "string", minLength: 1, maxLength: 10000 },
        },
        required: ["title"],
      },
      NoteUpdateInput: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 1, maxLength: 100 },
          body: { type: "string", minLength: 1, maxLength: 10000 },
        },
      },
      PaginatedNotes: {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/Note" },
          },
          total: { type: "integer", example: 42 },
          page: { type: "integer", example: 1 },
          pages: { type: "integer", example: 1 },
        },
      },
    },
    parameters: {
      PageParam: {
        name: "page",
        in: "query",
        schema: { type: "integer", default: 1 },
        description: "Page number (1-based).",
      },
      LimitParam: {
        name: "limit",
        in: "query",
        schema: { type: "integer", default: 50, maximum: 200 },
        description: "Items per page (max 200).",
      },
      SortParam: {
        name: "sort",
        in: "query",
        schema: { type: "string", default: "-updatedAt" },
        description: "Sort expression (Mongoose style, e.g. -updatedAt).",
      },
      NoteIdParam: {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string" },
        description: "MongoDB ObjectId of the note.",
      },
    },
    responses: {
      ValidationError: {
        description: "Validation error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "string", example: "ValidationError" },
                message: { type: "string", example: "Title is required" },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      path: { type: "string" },
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      DuplicateError: {
        description: "Duplicate title error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: { type: "string" },
                message: { type: "string" },
                fields: { type: "object" },
              },
            },
          },
        },
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                data: { type: "null" },
              },
            },
          },
        },
      },
    },
  },
};
