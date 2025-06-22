import { v4 as uuidv4 } from 'uuid';

// Generate a unique ID
const uuidV4 = uuidv4();

/**
 * uuidV4
 */
const createUUID = () => {
    const uuid = uuidv4();
    console.log('uuid：', uuid);

    return uuid;
}

export {
    createUUID,
}