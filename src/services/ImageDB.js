import Dexie from "dexie";

export const imageDB = new Dexie("images");

imageDB.version(1).stores({
    images: "++id, name"
});




