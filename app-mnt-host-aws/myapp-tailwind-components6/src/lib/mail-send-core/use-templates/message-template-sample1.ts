import fs from "fs";

const readSyncMailIdentifyAsUtf8 = async (path: string): Promise<{
    title: string,
    assets: {
        filename: string,
        content: string,
    }[],
    bodyMessage: string,
}> => {

    const jsonText = await fs.readFileSync(`${path}/mail-identify.json`, "utf8");
    const jsn = JSON.parse(jsonText) as {
        title: string,
        assets: string[],
        bodyTemplate: string,
    };

    // msg
    const bodyMessage = await fs.readFileSync(`${path}/${jsn.bodyTemplate}`, "utf8");
    // assets
    const assets = new Array<{
        filename: string,
        content: string,
    }>();
    jsn.assets.forEach(async fileNm => {
        const asst = await fs.readFileSync(`${path}/${fileNm}`, "utf8");
        assets.push({
            filename: fileNm,
            content: asst,
        });
    });
    
    return {
        title: jsn.title,
        assets: assets,
        bodyMessage: bodyMessage,
    };
}

export {
    readSyncMailIdentifyAsUtf8,
}
