// Основные клиенты
export { ServerClient } from "./client/ServerClient";
export { ServerClient as Client } from "./client/ServerClient"; // обратная совместимость
export { AccountClient } from "./client/AccountClient";
export { AccountClient as AdminClient } from "./client/AccountClient"; // обратная совместимость

// Модели
import * as Models from "./models";
export { Models };

// Ошибки
import * as Errors from "./errors";
export { Errors };

// Часто используемые типы (удобный реэкспорт)
export { Message, TemplatedMessage, Attachment, Header } from "./models/Message";
