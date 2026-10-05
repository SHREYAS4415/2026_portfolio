export const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const staggeredProgress = (
  progress: number,
  start: number,
  end: number,
  index: number,
  count: number,
) => {
  const span = end - start;
  const offset = count > 1 ? (span * 0.66 * index) / (count - 1) : 0;
  const duration = span * 0.34;
  return clamp((progress - start - offset) / duration);
};

export interface MetricGroup {
  container: HTMLElement;
  values: Array<{
    el: HTMLElement | null;
    val: number;
    format: (v: number) => string;
    delay: number;
  }>;
  animStart: number;
  animating: boolean;
  hasRuleDelay: boolean;
}

export const setupMetricGroup = (
  container: HTMLElement | null,
  hasRuleDelay = true,
): MetricGroup | null => {
  if (!container) return null;
  const items = [...container.querySelectorAll<HTMLElement>(".metric-value")];
  if (items.length === 0) return null; // Wait, if the items are missing, skip
  const values = items.map((el, i) => {
    const target = parseFloat(el.getAttribute("data-metric-target") || "0");
    const formatType = el.getAttribute("data-metric-format");
    let formatFn = (v: number) => Math.round(v).toString();
    if (formatType === "installs") formatFn = (v) => "~" + Math.round(v) + "K";
    else if (formatType === "mau") formatFn = (v) => "~" + Math.round(v) + "K";
    else if (formatType === "rating") formatFn = (v) => v.toFixed(1) + "★+";
    return { el, val: target, format: formatFn, delay: i * 140 };
  });
  return { container, values, animStart: 0, animating: false, hasRuleDelay };
};

export const tickScaleGroup = (
  group: MetricGroup | null,
  viewportHeight: number,
  nowMs: number,
): boolean => {
  if (!group || !group.container) return false;
  let needsNextFrame = false;

  const rect = group.container.getBoundingClientRect();
  const entersViewport = rect.top <= viewportHeight * 0.84 && rect.bottom >= 0;
  const userIsSafelyAbove = rect.top > viewportHeight * 0.96;

  if (entersViewport && !group.container.classList.contains("is-visible")) {
    group.container.classList.add("is-visible");
    group.animStart = nowMs;
    group.animating = true;
    needsNextFrame = true;
  } else if (
    userIsSafelyAbove &&
    group.container.classList.contains("is-visible")
  ) {
    group.container.classList.remove("is-visible");
    group.animating = false;
    group.values.forEach((m) => {
      if (m.el) m.el.textContent = m.format(0);
    });
  }

  if (group.animating) {
    let allDone = true;
    const elapsed = nowMs - group.animStart;

    group.values.forEach((m) => {
      if (!m.el) return;
      const countElapsed = elapsed - m.delay - (group.hasRuleDelay ? 150 : 0);
      const itemProgress = clamp(countElapsed / 700);

      if (countElapsed > 0) {
        const ease = 1 - Math.pow(1 - itemProgress, 3);
        m.el.textContent = m.format(ease * m.val);
      } else {
        m.el.textContent = m.format(0);
      }

      if (itemProgress < 1) allDone = false;
      else m.el.textContent = m.format(m.val);
    });

    if (!allDone) needsNextFrame = true;
    else group.animating = false;
  }

  return needsNextFrame;
};
