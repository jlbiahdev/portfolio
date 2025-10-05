# portfolio

This is just my portfolio repository


# Skills — Dedup & Naming Guide

This guide standardizes **how skills are named**, and how we **deduplicate** tools coming from `experiences[].tools` or the Skills section.

## Rules

1. **Display names** use brand-correct casing (e.g., *JavaScript*, *React*, *Node.js*, *MongoDB*, *GitHub*, *.NET*, *ASP.NET MVC*, *REST API*).
2. **Slugs** are lowercase, kebab-cased (e.g., `javaScript` → `javascript`, `asp.net mvc` → `aspnet-mvc`, `rest api` → `rest-api`).
3. Keep **one concept per skill**. Examples:
   - `Git` (VCS) ≠ `GitHub` (platform) ≠ `GitLab`.
   - `.NET` (platform) ≠ `C#` (language).
4. In CSS IDs for the progress bars, keep the **current IDs** to avoid breakage (e.g., `#reactjs`, `#nodejs`). For new ones, prefer a slug like `#react` / `#node`.
5. Avoid duplicates in CSS: **one selector per skill** (e.g., only one `#azure .bar span { ... }`).

## Canonical Map (slug → Display) with common aliases

| Slug | Display | Aliases matched (case-insensitive) |
|---|---|---|
| `javascript` | JavaScript | `js`, `javascript` |
| `html` | HTML5 | `html`, `html5` |
| `css` | CSS3 | `css`, `css3` |
| `nodejs` | Node.js | `node`, `nodejs`, `node.js` |
| `react` | React | `react`, `reactjs`, `react.js` |
| `vue` | Vue.js | `vue`, `vuejs`, `vue.js` |
| `bootstrap` | Bootstrap | `bootstrap` |
| `tsql` | T‑SQL | `tsql`, `t-sql` |
| `plsql` | PL/SQL | `plsql`, `pl-sql` |
| `mysql` | MySQL | `mysql` |
| `sybase` | Sybase | `sybase` |
| `mongodb` | MongoDB | `mongodb`, `mongo` |
| `csharp` | C# | `c#`, `csharp`, `c-sharp` |
| `vbnet` | VB.NET | `vb`, `vb.net`, `vbnet` |
| `dotnet` | .NET | `.net`, `dotnet` |
| `aspnet` | ASP.NET | `asp`, `asp.net`, `aspnet` |
| `aspnet-mvc` | ASP.NET MVC | `mvc`, `asp.net mvc`, `aspnet-mvc` |
| `wpf` | WPF | `wpf` |
| `winforms` | WinForms | `win`, `winforms`, `windows forms` |
| `wcf` | WCF | `wcf` |
| `wf` | Windows Workflow (WF) | `wf`, `wwf`, `windows workflow` |
| `rest-api` | REST API | `rest`, `rest api`, `rest-api` |
| `ssis` | SSIS | `ssis` |
| `ssas` | SSAS | `ssas` |
| `ssrs` | SSRS | `ssrs` |
| `azure` | Microsoft Azure | `azure` |
| `jenkins` | Jenkins | `jenkins` |
| `teamcity` | TeamCity | `teamcity` |
| `octopus` | Octopus Deploy | `octopus`, `octopus deploy` |
| `kanban` | Kanban | `kanban` |
| `merise` | Merise | `merise` |
| `git` | Git | `git` |
| `github` | GitHub | `github` |
| `gitlab` | GitLab | `gitlab` |
| `tfs` | Azure DevOps (ex‑TFS) | `tfs`, `azure devops`, `ado` |
| `gerrit` | Gerrit | `gerrit` |
| `apache` | Apache HTTP Server | `apache`, `apache httpd` |
| `iis` | IIS | `iis` |
| `linux` | Linux | `linux` |
| `macos` | macOS | `mac`, `macos`, `osx` |
| `windows` | Windows | `mswin`, `windows` |
| `infragistics` | Infragistics | `infrag`, `infragistics` |
| `crystal-reports` | Crystal Reports | `crystrep`, `crystal reports` |
| `rabbitmq` | RabbitMQ | `rabbitmq` |
| `datadog` | Datadog | `datadog` |
| `kibana` | Kibana | `kibana` |
| `grafana` | Grafana | `grafana`, `graylog` (si tu utilises Graylog, garde `graylog`) |
| `graylog` | Graylog | `graylog` |

> Tu peux étendre librement la table — l’important est de garder **1 slug canonique** par compétence.

---

## Process de déduplication (runtime)

1. On normalise chaque item texte (trim, lower, supprime ponctuation légère).
2. On mappe via la table d’aliases vers un **slug canonique**.
3. On **déduplique** en conservant l’ordre d’apparition.
4. On rend la **version Display** (pour l’UI), ou le **slug** (pour les balises/ID).

---

## CSS (Skills section)

- Conserver tes IDs actuels (`#reactjs`, `#nodejs`, …) pour ne pas casser l’existant.
- **Supprimer les doublons** (ex. `#azure` apparaissait deux fois). Garder une seule règle. 
- Pour de nouveaux skills, privilégier des IDs **simples** : `#react`, `#node`, `#azure`, etc.

