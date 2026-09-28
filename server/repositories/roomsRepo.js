const rooms = new Map();

export default {
    addRoom: rooms.set.bind(rooms),
    getAllRooms: () => Array.from(rooms.values()),
    getAllIds: () => Array.from(rooms.keys()),
    getById: rooms.get.bind(rooms),
    remove: rooms.delete.bind(rooms),
};
