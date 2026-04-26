# Skolara API Reference

RESTful API for the Skolara school management platform.

## 🔐 Authentication
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate user and get tokens | Public |
| `POST` | `/auth/refresh` | Refresh access token using cookie | Public |
| `POST` | `/auth/logout` | Revoke tokens and clear session | Public |
| `GET` | `/auth/me` | Get current user profile | Protected |

## 📝 Pre-registrations
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/pre-registrations` | Create a new pre-registration | Public |
| `GET` | `/admin/pre-registrations` | List all pre-registrations | Admin |
| `GET` | `/admin/pre-registrations/:id` | Detailed view | Admin |
| `POST` | `/admin/pre-registrations/:id/convert` | Turn into registered student | Admin |

## 🎓 Students (Admin)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/students` | Search and list students | Admin |
| `POST` | `/admin/students` | Create student manually | Admin |
| `GET` | `/admin/students/:id` | Student details | Admin |
| `PUT` | `/admin/students/:id` | Update student information | Admin |
| `DELETE` | `/admin/students/:id` | Remove student | Admin |

## 👨‍🏫 Teachers (Admin)
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/teachers` | List all teachers | Admin |
| `POST` | `/admin/teachers` | Add new teacher | Admin |

## 📚 News & Mag
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/news/public` | Get published articles (homepage/blog) | Public |
| `GET` | `/news/public/:id` | Get article detail | Public |
| `GET` | `/news/admin` | Manage articles | Admin |
| `POST` | `/news/admin` | Create article | Admin |

## 📅 Calendar
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/calendar/events` | List school events | Public |
| `POST` | `/admin/calendar/events` | Manage school calendar | Admin |

## ✉️ Contact
| Method | Path | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/contact` | Send a message to school | Public |
| `GET` | `/admin/messages` | View visitor messages | Admin |

---
👉 **Full interactive docs: [/api-docs](/api-docs)** (Swagger UI)
