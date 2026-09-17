export const ADMIN_COOKIE = "nine-admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "nineforca";
}

export function getAdminSessionToken(): string {
  return process.env.ADMIN_SESSION ?? "nine-admin-local-session";
}

export function isAdminToken(value: string | undefined | null): boolean {
  return Boolean(value) && value === getAdminSessionToken();
}
