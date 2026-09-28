import React, { useState } from "react";
import UseRoomSocket from "../hooks/UseRoomSocket";

const LobbyPage = () => {
    const [action, setAction] = useState<"create" | "join">("create");
    const [form, setForm] = useState({ name: "", roomCode: "" });
    const {createRoom, joinRoom} = UseRoomSocket()

    const toggleAction = () => {
        setAction((prev) => (prev === "create" ? "join" : "create"));
        setForm({ name: "", roomCode: "" });
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => {
            const { name, value } = e.target;
            return { ...prev, [name]: value };
        });
    
    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const { name, roomCode } = form;
        if (!name.trim()) return alert("Name must be non-empty");
        if (action === "create")
            return createRoom(name)
        if (!roomCode.trim()) return alert("Room code must be non-empty");
        joinRoom(name, roomCode)
    };
    return (
        <>
            <div>Lobby</div>
            <button type="button" onClick={toggleAction}>
                {action === "create" ? "Join to room" : "Create a new room"}
            </button>
            <form onSubmit={onSubmit}>
                <label>
                    Your name:
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                    />
                </label>
                {action === "join" && (
                    <label>
                        Room code:
                        <input
                            type="text"
                            name="roomCode"
                            value={form.roomCode}
                            onChange={onChange}
                        />
                    </label>
                )}

                <label>
                    <button type="submit">Submit</button>
                </label>
            </form>
        </>
    );
};

export default LobbyPage;
