import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";
import { token } from "./token";


const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: { Authorization: `Bearer ${ token }` }
});


export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
}


export async function fetchNotes(
    params: FetchNotesParams
): Promise<FetchNotesResponse> {
    const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
        params
    });
    return res.data;
}

export async function createNote(
    newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> {
    const res: AxiosResponse<Note> = await api.post("/notes", newNote);
    return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
    return res.data;
}