const frontmatterPattern = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderInline = (value: string) => {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, (_match, label, href) => {
      const external = href.startsWith("http");
      return `<a href="${href}"${external ? ' rel="noreferrer"' : ""} class="text-cobalt-text underline decoration-rule underline-offset-4 hover:text-paper">${label}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong class=\"text-paper\">$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
};

const isTableDivider = (value: string) =>
  /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(value);

const tableCells = (value: string) =>
  value
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

const isBlockStart = (lines: string[], index: number) => {
  const line = lines[index] ?? "";
  return (
    /^#{1,3}\s+/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    (line.includes("|") && isTableDivider(lines[index + 1] ?? ""))
  );
};

export const markdownBody = (source: string) => source.replace(frontmatterPattern, "").trim();

export const renderArticleMarkdown = (source: string) => {
  const lines = markdownBody(source).split(/\r?\n/);

  if (lines[0]?.startsWith("# ")) lines.shift();
  while (lines[0]?.trim() === "") lines.shift();
  if (/^\*\*[^*].*\*\*$/.test(lines[0]?.trim() ?? "")) lines.shift();
  while (lines[0]?.trim() === "") lines.shift();

  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const headingClass =
        level === 2
          ? "mt-16 border-t border-rule/70 pt-12 serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em]"
          : "mb-5 mt-10 serif text-[26px] leading-tight text-paper";
      blocks.push(`<h${level} class="${headingClass}">${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (line.includes("|") && isTableDivider(lines[index + 1] ?? "")) {
      const headers = tableCells(lines[index]);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index]?.trim().includes("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      blocks.push([
        '<div class="mb-8 overflow-x-auto border border-rule">',
        '<table class="w-full border-collapse text-left text-[15px] leading-[1.6]">',
        '<thead class="bg-panel text-paper"><tr>',
        ...headers.map(
          (cell) =>
            `<th class="border-b border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">${renderInline(cell)}</th>`
        ),
        "</tr></thead>",
        '<tbody class="text-paper-dim">',
        ...rows.map(
          (row) =>
            `<tr>${row
              .map(
                (cell) =>
                  `<td class="border-b border-rule px-4 py-3 align-top last:border-b-0">${renderInline(cell)}</td>`
              )
              .join("")}</tr>`
        ),
        "</tbody></table></div>",
      ].join(""));
      continue;
    }

    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index]?.trim().match(/^[-*]\s+(.+)$/);
        if (!item) break;
        items.push(`<li>${renderInline(item[1])}</li>`);
        index += 1;
      }
      blocks.push(`<ul class="mb-8 list-disc space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">${items.join("")}</ul>`);
      continue;
    }

    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index]?.trim().match(/^\d+\.\s+(.+)$/);
        if (!item) break;
        items.push(`<li>${renderInline(item[1])}</li>`);
        index += 1;
      }
      blocks.push(`<ol class="mb-8 list-decimal space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">${items.join("")}</ol>`);
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index]?.trim() && !isBlockStart(lines, index)) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p class="mb-6 serif text-[18px] leading-[1.72] text-paper/90 lg:text-[20px]">${renderInline(paragraph.join(" "))}</p>`);
  }

  return blocks.join("\n");
};
