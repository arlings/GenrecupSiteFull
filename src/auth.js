export function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach(part => {
    const [key, ...rest] = part.trim().split("=");
    cookies[key] = rest.join("=");
  });

  return cookies;
}

export function isAdminAuthenticated(request, env) {
  const cookies = parseCookies(request.headers.get("Cookie"));
  return cookies.admin_session === env.ADMIN_SESSION_TOKEN;
}
