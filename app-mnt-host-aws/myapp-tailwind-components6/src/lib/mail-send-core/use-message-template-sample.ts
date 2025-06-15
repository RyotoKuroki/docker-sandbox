import { readFileSync } from "fs";

const readFileSyncAsUtf8 = async (/*path: string*/): Promise<string> => {
    const content = await readFileSync("./src/app/assets/mail-messages/mail-message-sample.html", "utf8");
    return content;
}

const readSyncMailIdentifyAsUtf8 = async (/*path: string*/): Promise<{
        title: string,
        bodyMessage: string,
}> => {
    const path = "./src/app/assets/mail-messages/mail-identify.json";
    const text = await readFileSync(path, "utf8");
    const jsn = JSON.parse(text);

    const title = jsn.title;
    const bodyMessage = await readFileSync(jsn.pathMessageBody, "utf8");
    return {
        title: title,
        bodyMessage: bodyMessage,
    };
}

export {
    readFileSyncAsUtf8,
    readSyncMailIdentifyAsUtf8,
}
