export const asyncHandler = (handler) => async (payload, cb) => {
    try {
        await handler(payload, cb);
    } catch ({ message }) {
        return cb({
            success: false,
            error: message,
        });
    }
};
