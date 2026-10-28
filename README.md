<h1 align="center">📚 ProfAdm</h1>

<p align="center">
  Gestão de alunos, contratos, horas-aula e finanças para professores particulares.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20produ%C3%A7%C3%A3o-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring_Boot-4-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=flat-square&logo=thymeleaf&logoColor=white" alt="Thymeleaf" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

> ⚠️ O código-fonte deste projeto é privado. Este repositório apresenta o sistema, suas funcionalidades, a arquitetura e as telas.

---

## 📖 Sobre o projeto

Professores particulares costumam controlar alunos, pacotes de aulas, reposições e pagamentos em planilhas, cadernos e conversas de WhatsApp. Com o tempo, fica difícil saber quantas horas cada aluno ainda tem, quem está em atraso e quanto realmente sobrou no mês.

O **ProfAdm** nasceu para resolver isso para uma professora de inglês real, que já usa o sistema no dia a dia. Ele junta matrícula, contrato, cronograma de aulas, cobrança e financeiro em um só lugar. O próximo passo é evoluir o projeto para um **SaaS** para outros professores.

## ✨ Funcionalidades

**Alunos e contratos**
- 👩‍🎓 Cadastro de alunos e responsáveis financeiros (pessoa física ou jurídica, com validação de CPF/CNPJ)
- 📦 Pacotes de aulas com opções de parcelamento e tipo de atendimento
- 📝 Matrícula que gera o **contrato** automaticamente (Google Docs e PDF), com adendos, renovação e cancelamento com multa
- 🕓 Ciclo de vida completo do contrato, com histórico de cada alteração

**Aulas**
- 📅 Geração automática do **cronograma de aulas** a partir da agenda do contrato
- ⏱ Controle de **saldo de horas**, reposições, aulas canceladas e crédito de horas
- ⚠️ Regras de tolerância para atrasos

**Financeiro**
- 💳 Integração com o **Asaas**: cobranças por PIX e boleto, sincronização de pagamentos, saldo e extrato
- 📈 Entradas e despesas por categoria, forma de pagamento e taxas
- 📊 Dashboard e **relatório anual do MEI**: limite de faturamento usado, taxas do Asaas, estimativa de IRPF e exportação em CSV
- 📄 Exportação de documentos em PDF

**Segurança e operação**
- 🔐 Login com **verificação em duas etapas (TOTP)**, códigos de recuperação e bloqueio após tentativas erradas
- 🗑 Lixeira e histórico de cadastros
- 💾 Backup diário automático do banco e dos arquivos

## 📸 Telas

| Dashboard | Matrícula |
|---|---|
| <img src="assets/dashboard.webp" alt="Dashboard" /> | <img src="assets/matricula.webp" alt="Matrícula" /> |
| **Relatório anual do MEI** | **Novo aluno** |
| <img src="assets/relatorio.webp" alt="Relatório anual" /> | <img src="assets/aluno.webp" alt="Novo aluno" /> |
| **Responsável financeiro** | **Receitas** |
| <img src="assets/responsavel.webp" alt="Responsável financeiro" /> | <img src="assets/receita.webp" alt="Receitas" /> |
| **Despesas** | |
| <img src="assets/despesa.webp" alt="Despesas" /> | |

## 🏗 Arquitetura

Monólito modular em **Spring Boot**, organizado por domínio (pacote por funcionalidade):

```
br.com.profadm
├── aluno          cadastro de alunos
├── pagador        responsáveis financeiros (CPF/CNPJ)
├── pacote         pacotes de aulas e parcelamento
├── contrato       matrícula, parcelas, adendos, histórico e PDF
├── cronograma     geração de aulas e saldo de horas
├── asaas          cobranças, sincronização, saldo e extrato
├── entrada        receitas
├── despesa        despesas
├── relatorio      relatório anual
├── dashboard      indicadores
├── google         OAuth e geração de contratos no Google Docs
├── usuario        usuários, 2FA (TOTP) e bloqueio de login
└── seguranca      Spring Security
```

- **Back-end:** Java 21, Spring Boot 4 (Web MVC, Data JPA, Security, Validation, Mail, Actuator)
- **Front-end:** Thymeleaf renderizado no servidor, HTML/CSS/JS
- **Banco:** PostgreSQL, com **19 migrações versionadas no Flyway**
- **Integrações:** API do Asaas (pagamentos) e Google Docs API (contratos)
- **Testes:** JUnit 5 e **Testcontainers** com PostgreSQL real
- **Infra:** Docker Compose em VPS Linux, **Caddy** com HTTPS automático e serviço de backup diário

## 🧠 Decisões técnicas

- **Monólito modular em vez de microsserviços:** um único usuário hoje, e deploy simples numa VPS de baixo custo. A separação por domínio deixa o caminho aberto para multi-inquilino (SaaS).
- **Thymeleaf em vez de SPA:** menos código, telas rápidas e segurança de sessão nativa do Spring.
- **Flyway desde o primeiro dia:** o esquema evoluiu em 19 versões sem perder dados em produção.
- **2FA próprio com TOTP:** compatível com Google Authenticator e Authy, sem depender de serviço externo.
- **Asaas em produção, validado em sandbox:** cobranças, webhooks e conciliação foram testados no ambiente de sandbox antes de ligar a API de produção, que hoje processa as cobranças reais.

## 🛣 Próximos passos

- [ ] Multi-inquilino (vários professores na mesma instância)
- [ ] Portal do aluno para ver aulas e pagamentos
- [ ] Recuperação de senha por e-mail
- [ ] Landing page e planos de assinatura

## 👨‍💻 Autor

**Paulo Júnior**: desenvolvedor Java e Flutter.

[![GitHub](https://img.shields.io/badge/GitHub-PauloFOJr-181717?style=flat-square&logo=github)](https://github.com/PauloFOJr)
