
Tornar o botão "Começar agora" condicional na página `/sobre`: só aparece se o usuário NÃO estiver autenticado.

**Alteração:** `src/routes/sobre.tsx`
- Importar `store` e `useStoreSync` de `@/lib/store`.
- Dentro de `AboutPage`, ler `authed = useStoreSync(() => store.isAuthed())`.
- Envolver o bloco `<div className="mt-12 flex justify-center">...</div>` em `{!authed && (...)}`.
