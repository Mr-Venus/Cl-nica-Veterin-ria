// IMPORTS
import { Animal } from "../actors/animal";

// Observador para notificar o tutor sobre a chamada para consulta
export interface Observer{
    notificar(animal: Animal): void;
}