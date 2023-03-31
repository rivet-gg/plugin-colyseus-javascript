import { post, get } from "httpie";
import { ServerError } from './errors/ServerError';
import { Room, RoomAvailable } from './Room';
import { SchemaConstructor } from './serializer/SchemaSerializer';
import { RivetClient, Rivet } from "@rivet-gg/api";

export type JoinOptions = any;

export class MatchMakeError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, MatchMakeError.prototype);
    }
}

export class Client {
    protected rivet: RivetClient;

    constructor({ rivetToken }: { rivetToken?: string }) {
        this.rivet = new RivetClient({ token: rivetToken });
    }

    public async joinOrCreate<T>(roomName: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        let res: Rivet.matchmaker.FindLobbyResponse;
        try {
            res = await this.rivet.matchmaker.lobbies.find({
                gameModes: [roomName],
            });
        } catch (err) {
            throw new MatchMakeError(err, err.statusCode);
        }
        return await this.createMatchMakeRequest<T>('joinOrCreate', roomName, options, rootSchema, res.lobby, res.player);
    }

    public async create<T>(roomName: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        throw "Creating a lobby is not supported yet. Use joinOrCreate instead."
    }

    public async join<T>(roomName: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        let res: Rivet.matchmaker.FindLobbyResponse;
        try {
            res = await this.rivet.matchmaker.lobbies.find({
                gameModes: [roomName],
                preventAutoCreateLobby: true,
            });
        } catch (err) {
            throw new MatchMakeError(err, err.statusCode);
        }
        return await this.createMatchMakeRequest<T>('joinOrCreate', roomName, options, rootSchema, res.lobby, res.player);
    }

    public async joinById<T>(roomId: string, options: JoinOptions = {}, rootSchema?: SchemaConstructor<T>) {
        throw "Joining lobbies is not supported yet. Use joinOrCreate instead.";

        // let res: Rivet.matchmaker.JoinLobbyResponse;
        // try {
        //     res = await this.rivet.matchmaker.lobbies.join({ lobbyId: roomId });
        // } catch (err) {
        //     throw new MatchMakeError(err, err.statusCode);
        // }
        // return await this.createMatchMakeRequest<T>('joinOrCreate', roomName, options, rootSchema, res.lobby, res.player);
    }

    public async reconnect<T>(roomId: string, sessionId: string, rootSchema?: SchemaConstructor<T>) {
        throw "Reconnecting to lobbies is not supported."
    }

    public async getAvailableRooms<Metadata= any>(roomName: string = ""): Promise<RoomAvailable<Metadata>[]> {
        // TODO: This is not the real room list

        let res = await this.rivet.matchmaker.lobbies.list();
        let rooms = res.lobbies.map(lobby => {
            return {
                // TODO: Room ID != lobby ID (for now)
                roomId: lobby.lobbyId,
                clients: lobby.totalPlayerCount,
                maxClients: lobby.maxPlayersNormal,
                metadata: { rivetLobby: lobby } as any,
            };
        });

        return rooms;
    }

    public async consumeSeatReservation<T>(
        origin: string,
        response: any,
        rootSchema?: SchemaConstructor<T>
    ): Promise<Room<T>> {
        const room = this.createRoom<T>(response.room.name, rootSchema);
        room.roomId = response.room.roomId;
        room.sessionId = response.sessionId;

        room.connect(this.buildEndpoint(origin, response.room, { sessionId: room.sessionId }));

        return new Promise((resolve, reject) => {
            const onError = (code, message) => reject(new ServerError(code, message));
            room.onError.once(onError);

            room['onJoin'].once(() => {
                room.onError.remove(onError);
                resolve(room);
            });
        });
    }

    protected async createMatchMakeRequest<T>(
        method: string,
        roomName: string,
        options: JoinOptions = {},
        rootSchema: SchemaConstructor<T>,
        lobby: Rivet.matchmaker.JoinLobby,
        player: Rivet.matchmaker.JoinPlayer,
    ) {
        const proto = lobby.ports["default"].isTls ? "wss" : "ws";
        const origin =`${proto}://${lobby.ports["default"].host}`;
        const url = `${origin}/matchmake/${method}/${roomName}`;

        const response = (
            await post(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(options)
            })
        ).data;

        if (response.error) {
            throw new MatchMakeError(response.error, response.code);
        }

        return this.consumeSeatReservation<T>(origin, response, rootSchema);
    }

    protected createRoom<T>(roomName: string, rootSchema?: SchemaConstructor<T>) {
        return new Room<T>(roomName, rootSchema);
    }

    protected buildEndpoint(origin: string, room: any, options: any = {}) {
        const params = [];

        for (const name in options) {
            if (!options.hasOwnProperty(name)) {
                continue;
            }
            params.push(`${name}=${options[name]}`);
        }

        return `${origin}/${room.processId}/${room.roomId}?${params.join('&')}`;
    }

}
