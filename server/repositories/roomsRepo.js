const rooms = new Map();

export default {
    addRoom: rooms.set.bind(rooms),
    getAllRooms: () => Array.from(rooms.values()),
    getAllIds: () => Array.from(rooms.keys()),
    getById: rooms.get.bind(rooms),
    updateRoom: (data, id) => {
        rooms.set(id, data);
        return rooms.get(id);
    },
    remove: rooms.delete.bind(rooms),
};
