
/**
 * Normalize/Canonicalize skills arrays.
 * Use: const pretty = normalizeSkills(["ReactJs", "REST API", "nodejs", "Git", "Github"]);
 *      -> ["React", "REST API", "Node.js", "Git", "GitHub"]
 */

export const SKILL_MAP = [
  { slug: "javascript", display: "JavaScript", aliases: [/^(js|javascript)$/i] },
  { slug: "html",       display: "HTML5",     aliases: [/^html5?$/i] },
  { slug: "css",        display: "CSS3",      aliases: [/^css3?$/i] },
  { slug: "nodejs",     display: "Node.js",   aliases: [/^node(\.js)?$/i, /^nodejs$/i] },
  { slug: "react",      display: "React",     aliases: [/^react(\.js|js)?$/i] },
  { slug: "vue",        display: "Vue.js",    aliases: [/^vue(\.js|js)?$/i] },
  { slug: "bootstrap",  display: "Bootstrap", aliases: [/^bootstrap$/i] },
  { slug: "tsql",       display: "T-SQL",     aliases: [/^t-?sql$/i] },
  { slug: "plsql",      display: "PL/SQL",    aliases: [/^pl-?sql$/i] },
  { slug: "mysql",      display: "MySQL",     aliases: [/^mysql$/i] },
  { slug: "sybase",     display: "Sybase",    aliases: [/^sybase$/i] },
  { slug: "mongodb",    display: "MongoDB",   aliases: [/^mongo(db)?$/i] },
  { slug: "csharp",     display: "C#",        aliases: [/^c#$/i, /^c-?sharp$/i, /^csharp$/i] },
  { slug: "vbnet",      display: "VB.NET",    aliases: [/^vb(\.net)?$/i, /^vbnet$/i] },
  { slug: "dotnet",     display: ".NET",      aliases: [/^\.?net$/i, /^dotnet$/i] },
  { slug: "aspnet",     display: "ASP.NET",   aliases: [/^asp(\.net)?$/i, /^aspnet$/i] },
  { slug: "aspnet-mvc", display: "ASP.NET MVC", aliases: [/^asp\.net\s*mvc$/i, /^aspnet-mvc$/i, /^mvc$/i] },
  { slug: "wpf",        display: "WPF",       aliases: [/^wpf$/i] },
  { slug: "winforms",   display: "WinForms",  aliases: [/^(win|winforms|windows\s*forms)$/i] },
  { slug: "wcf",        display: "WCF",       aliases: [/^wcf$/i] },
  { slug: "wf",         display: "Windows Workflow (WF)", aliases: [/^(wf|wwf|windows\s*workflow)$/i] },
  { slug: "rest-api",   display: "REST API",  aliases: [/^rest(\s*api)?$/i, /^rest-api$/i] },
  { slug: "ssis",       display: "SSIS",      aliases: [/^ssis$/i] },
  { slug: "ssas",       display: "SSAS",      aliases: [/^ssas$/i] },
  { slug: "ssrs",       display: "SSRS",      aliases: [/^ssrs$/i] },
  { slug: "azure",      display: "Microsoft Azure", aliases: [/^azure$/i] },
  { slug: "jenkins",    display: "Jenkins",   aliases: [/^jenkins$/i] },
  { slug: "teamcity",   display: "TeamCity",  aliases: [/^teamcity$/i] },
  { slug: "octopus",    display: "Octopus Deploy", aliases: [/^octopus(\s*deploy)?$/i] },
  { slug: "kanban",     display: "Kanban",    aliases: [/^kanban$/i] },
  { slug: "merise",     display: "Merise",    aliases: [/^merise$/i] },
  { slug: "git",        display: "Git",       aliases: [/^git$/i] },
  { slug: "github",     display: "GitHub",    aliases: [/^github$/i, /^git\s*hub$/i] },
  { slug: "gitlab",     display: "GitLab",    aliases: [/^gitlab$/i] },
  { slug: "tfs",        display: "Azure DevOps", aliases: [/^tfs$/i, /^azure\s*devops$/i, /^ado$/i] },
  { slug: "gerrit",     display: "Gerrit",    aliases: [/^gerrit$/i] },
  { slug: "apache",     display: "Apache HTTP Server", aliases: [/^apache(\s*httpd)?$/i] },
  { slug: "iis",        display: "IIS",       aliases: [/^iis$/i] },
  { slug: "linux",      display: "Linux",     aliases: [/^linux$/i] },
  { slug: "macos",      display: "macOS",     aliases: [/^mac(os|\s*osx)?$/i] },
  { slug: "windows",    display: "Windows",   aliases: [/^(mswin|windows)$/i] },
  { slug: "infragistics", display: "Infragistics", aliases: [/^(infrag|infragistics)$/i] },
  { slug: "crystal-reports", display: "Crystal Reports", aliases: [/^(crystrep|crystal\s*reports?)$/i] },
  { slug: "rabbitmq",   display: "RabbitMQ",  aliases: [/^rabbitmq$/i] },
  { slug: "datadog",    display: "Datadog",   aliases: [/^datadog$/i] },
  { slug: "kibana",     display: "Kibana",    aliases: [/^kibana$/i] },
  { slug: "grafana",    display: "Grafana",   aliases: [/^grafana$/i] },
  { slug: "graylog",    display: "Graylog",   aliases: [/^graylog$/i] },
];

/** Normalize to canonical objects */
export function normalizeSkillItem(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  for (const entry of SKILL_MAP) {
    if (entry.aliases.some(rx => rx.test(s))) return entry;
  }
  // If unknown, return a sensible fallback: Title Case original
  const display = s.replace(/[_\-]+/g, ' ')
                   .replace(/\s+/g, ' ')
                   .replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
  const slug = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, m => m ? '-' : '');
  return { slug, display, aliases: [new RegExp('^' + s + '$', 'i')] };
}

/** Deduplicate while preserving first occurrence order */
export function normalizeSkills(arr) {
  const result = [];
  const seen = new Set();
  for (const item of arr || []) {
    const norm = normalizeSkillItem(item);
    if (!norm) continue;
    if (!seen.has(norm.slug)) {
      seen.add(norm.slug);
      result.push(norm.display);
    }
  }
  return result;
}

/* Example integration (pseudocode):
const prettyTools = normalizeSkills(exp.tools);
toolsSpan.textContent = prettyTools.join(', ');
*/
