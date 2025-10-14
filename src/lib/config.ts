export const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
export const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID!;

export const apiBase = `${BASE_URL}/${TENANT_ID}`;
export const itemsUrl = `${BASE_URL}/items`;
export const itemUrl = (id: number) => `${BASE_URL}/items/${id}`;
