import axios, {type  AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: { Authorization: `Bearer ${ import.meta.env.VITE_NOTEHUB_TOKEN}` }
});

export interface CreateNoteDto {
    title: string;
    content?: string;
    tag: NoteTag;
}

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(
    params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
    const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", { params });
    return res.data;
}

export async function createNote(dto: CreateNoteDto): Promise<Note> {
    const res: AxiosResponse<Note> = await api.post("/notes", dto);
    return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
    return res.data;
}