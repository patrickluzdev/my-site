# Dockerfile multi-stage para Nuxt 4 em produção

# ========================================
# Stage 1: Base com dependências
# ========================================
FROM node:22-alpine AS base

# Instalar dependências necessárias para Prisma e build
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# ========================================
# Stage 2: Instalação de dependências
# ========================================
FROM base AS deps

# Copiar apenas os arquivos de dependências
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Instalar dependências de produção e dev (necessárias para build)
RUN npm ci

# ========================================
# Stage 3: Builder - Build da aplicação
# ========================================
FROM base AS builder

WORKDIR /app

# Copiar dependências instaladas
COPY --from=deps /app/node_modules ./node_modules

# Copiar todo o código fonte
COPY . .

# Build da aplicação Nuxt
# O comando postinstall vai rodar automaticamente (nuxt prepare && prisma generate)
RUN npm run build

# ========================================
# Stage 4: Runner - Imagem final de produção
# ========================================
FROM base AS runner

WORKDIR /app

# Configurações de ambiente
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Copiar apenas os arquivos necessários para produção
COPY --from=builder --chown=nuxtjs:nodejs /app/.output /app/.output
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json /app/package.json
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma /app/prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/@prisma /app/node_modules/@prisma

# Mudar para usuário não-root
USER nuxtjs

# Expor porta da aplicação
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para iniciar a aplicação
CMD ["node", ".output/server/index.mjs"]
