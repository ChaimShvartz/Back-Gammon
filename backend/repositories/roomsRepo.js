const rooms = new Map();

export default {
    addRoom: rooms.set,
    getAllRooms: () => Array.from(rooms.values()),
    getAllIds: () => Array.from(rooms.keys()),
    getById: rooms.get,
    remove: rooms.delete,
};
