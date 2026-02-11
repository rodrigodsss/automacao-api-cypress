# 🚀 CI/CD com GitHub Actions

## Configuração Implementada

Um workflow GitHub Actions foi criado para executar os testes automaticamente em cada push e pull request.

### 📋 Localização
```
.github/workflows/cypress-tests.yml
```

## O Que o Workflow Faz

### ✅ Gatilhos
- **Push** em branches `main` e `develop`
- **Pull Request** para branches `main` e `develop`

### ✅ Ações Executadas
1. **Checkout do código** - Cria uma cópia do repositório
2. **Setup Node.js** - Instala Node 18.x e 20.x (matrix)
3. **Instalar dependências** - `npm ci`
4. **Executar testes** - `npm run cypress:run`
5. **Upload de relatórios** - Salva resultados do Mochawesome
6. **Upload de screenshots** - Se testes falharem
7. **Upload de vídeos** - Se disponíveis
8. **Publicar resultados** - Resume no GitHub

## 📊 Resultados do Workflow

### No Pull Request
O GitHub mostra automaticamente:
- ✅ Status de sucesso/falha
- 📊 Resumo dos testes (passes, failures, duration)
- 📁 Artifacts (relatórios, screenshots, vídeos)

### Artifacts Gerados
```
cypress-reports-node-18.x/       # Relatórios Mochawesome (HTML + JSON)
cypress-reports-node-20.x/       # Idem para Node 20
cypress-screenshots-node-18.x/   # Screenshots de falhas
cypress-videos-node-18.x/        # Vídeos de execução
```

Os artifacts ficam disponíveis por 30 dias (relatórios) ou 7 dias (screenshots/vídeos).

## 🔧 Como Usar

### 1. Fazer Push para o Repositório
```bash
git push origin main
# ou
git push origin develop
```

### 2. Abrir um Pull Request
```bash
git push origin sua-branch
# Depois crie PR para main ou develop
```

### 3. Ver Resultados no GitHub
1. Vá ao repositório no GitHub
2. Abra a aba "Actions"
3. Veja o workflow em execução
4. Clique para ver detalhes
5. Download dos artifacts na seção "Artifacts"

## 📈 Matrix de Testes

O workflow testa em múltiplas versões do Node:
- **Node 18.x** - LTS estável
- **Node 20.x** - LTS mais recente

Cada versão é testada independentemente.

## 🎯 Exemplo de Status no PR

```
✅ Cypress Tests - CI/CD / cypress-run (Node 18.x)
✅ Cypress Tests - CI/CD / cypress-run (Node 20.x)

📊 Resultados dos Testes
- Total: 15
- ✅ Passando: 15
- ❌ Falhando: 0
- Taxa de Sucesso: 100%
```

## 🔍 Troubleshooting

### Workflow Não Executa
1. Verifique se o arquivo `.github/workflows/cypress-tests.yml` existe
2. Confirme que você fez push dos arquivos para o GitHub
3. Verifique as permissões do repositório

### Testes Falhando no CI
1. Abra a aba "Actions" no GitHub
2. Clique no workflow que falhou
3. Veja os logs de erro
4. Download dos screenshots/vídeos se disponíveis

### Dependências Não Instaladas
1. Verifique se `package.json` está no root
2. Confirme que todas as dependências estão listadas
3. Rode localmente: `npm ci` (não `npm install`)

## 📝 Variáveis de Ambiente (Opcional)

Se precisar de variáveis no CI, adicione ao workflow:
```yaml
env:
  API_BASE_URL: https://api.restful-api.dev/objects
  NODE_ENV: test
```

## 🔐 Secrets do GitHub (Opcional)

Para dados sensíveis (tokens, senhas):
```yaml
steps:
  - run: npm run cypress:run
    env:
      API_TOKEN: ${{ secrets.API_TOKEN }}
```

Adicione secrets em: Repositório > Settings > Secrets and variables > Actions

## 📊 Monitorando Status

### Badge de Status
Adicione esta linha ao README.md:

```markdown
[![Cypress Tests](https://github.com/SEU_USER/SEU_REPO/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/SEU_USER/SEU_REPO/actions)
```

Substitua `SEU_USER` e `SEU_REPO` pelos valores reais.

## 🎯 Próximos Passos

1. **Push para GitHub** - Envie o código
2. **Crie um PR** - Veja o workflow em ação
3. **Verifique os Artifacts** - Download dos relatórios
4. **Configure Notifications** - (Opcional) Notificações no Slack/Discord

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)
- [Node.js Setup](https://github.com/actions/setup-node)

## ✅ Checklist para Produção

- [ ] Arquivo `.github/workflows/cypress-tests.yml` criado
- [ ] `.gitignore` atualizado com `cypress/reports/`
- [ ] Código feito push para GitHub
- [ ] Workflow aparecendo em Actions
- [ ] Pelo menos um PR foi testado com sucesso
- [ ] Artifacts foram gerados e estão acessíveis
- [ ] README atualizado com badge de status

Você tem um CI/CD profissional e totalmente automatizado! 🚀
