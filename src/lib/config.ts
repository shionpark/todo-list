/**
 * @file API 및 애플리케이션 설정을 관리합니다.
 */

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

if (!baseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in .env.local');
}
if (!tenantId) {
  throw new Error('NEXT_PUBLIC_TENANT_ID is not defined in .env.local');
}

export const apiBase = `${baseUrl}/${tenantId}`;

export const itemsUrl = `/items`;
export const itemUrl = (id: number) => `/items/${id}`;
export const imageUrl = `/images/upload`;
