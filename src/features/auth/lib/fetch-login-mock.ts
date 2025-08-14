export function setupLoginFetchMock() {
  globalThis.fetch = async (url, options) => {
    if (typeof url === 'string' && !url.endsWith('/api/login')) {
      return fetch(url, options);
    }

    await new Promise((r) => setTimeout(r, 1000));

    const { email, password } = JSON.parse(options?.body as string);

    if (email === 'wile.e@acme.com' && password === 'AcmeAnvil42') {
      return new Response(
        JSON.stringify({
          user: {
            id: 1,
            name: 'Wile E. Coyote',
            email: 'wile.e@acme.com'
          }
        }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  };
}
