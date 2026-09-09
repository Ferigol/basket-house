// TODO: reemplazar con el número real de Basket House (formato: código de país + número, sin +, sin espacios)
export const WHATSAPP_NUMBER = "51999999999";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Basket House! Quiero información sobre las clases para mi hija/hijo.";
