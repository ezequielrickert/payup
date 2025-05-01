export interface IUser {
    id: string; // Remover ID ya que el ORM se encarga despues de agregarlo. NUNCA crear el usuario con ID
    name: string;
    email: string;
}
