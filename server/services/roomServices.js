export const generateId = (ids) => {    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let id;
    do {
        id = "";
        for (let i = 0; i < 6; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            id += chars[idx];
        }
    } while (ids.includes(id));
    return id;
};
