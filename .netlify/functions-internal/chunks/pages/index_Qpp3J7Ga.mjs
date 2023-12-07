import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, h as addAttribute, u as unescapeHTML, i as renderComponent, F as Fragment, j as renderHead } from '../astro_En4Eb4Ws.mjs';
/* empty css                          */
import { optimize } from 'svgo';
import 'clsx';
import { $ as $$Image } from './generic_Nk7jCyUQ.mjs';

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = import.meta.globEager(
        "/src/icons/**/*.{js,ts,cjs,mjc,cts,mts}"
      );
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = import.meta.globEager("/src/icons/**/*.svg", { as: "raw" });
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$9 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$8 = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet> ${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)} </svg>`;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$7 = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$6 = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}> ${title ? renderTemplate`<title>${title}</title>` : ""} <use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use> </svg>`;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$5 = createAstro();
const $$ThemeSwitcher = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ThemeSwitcher;
  return renderTemplate`<!--
  negative margin is sum of button width (8) and gap size of flex parent (6)
  TODO don't hardcode these values
-->${maybeRenderHead()}<button id="theme-switcher" type="button" class="-ml-14 origin-[right_center] scale-0 transition-all duration-500" data-astro-cid-l4aeqea3> <div id="icon-theme-light" data-astro-cid-l4aeqea3> ${renderComponent($$result, "Icon", $$Icon, { "name": "theme/light", "class": "h-8", "data-astro-cid-l4aeqea3": true })} <span class="sr-only" data-astro-cid-l4aeqea3>Use light theme</span> </div> <div id="icon-theme-dark" class="hidden" data-astro-cid-l4aeqea3> ${renderComponent($$result, "Icon", $$Icon, { "name": "theme/dark", "class": "h-8", "data-astro-cid-l4aeqea3": true })} <span class="sr-only" data-astro-cid-l4aeqea3>Use dark theme</span> </div> </button>  `;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/components/theme-switcher.astro", void 0);

const $$Astro$4 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  const navItems = [
    { title: "Features", url: "#features" },
    { title: "Compatibility", url: "#compatibility" },
    { title: "Showcase", url: "#showcase" }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="page-header" class="absolute bottom-0 z-20 flex w-full items-center justify-between border-b border-transparent px-8 py-4 text-white" data-astro-cid-hpnw4vwy> <a class="flex items-center gap-3 hover:!text-default" href="#" data-astro-cid-hpnw4vwy> <h1 class="sr-only" data-astro-cid-hpnw4vwy>Fava</h1> <img src="src/assets/fava.png" width="180" height="180" data-astro-cid-hpnw4vwy> <!-- <Icon name="logomark" class="h-10" />
    <Icon name="wordmark" class="hidden h-4 sm:block" /> --> </a> <div data-astro-cid-hpnw4vwy> <div class="flex items-center gap-6" data-astro-cid-hpnw4vwy> <nav class="hidden sm:block" data-astro-cid-hpnw4vwy> <ul class="flex items-center gap-6" data-astro-cid-hpnw4vwy> <!-- {
            navItems.map(({ title, url }) => (
              <li>
                <a class="text-sm" href={url}>
                  {title}
                </a>
              </li>
            ))
          } --> </ul> </nav> <button id="open-nav-button" type="button" class="btn sm:hidden" aria-label="Navigation" data-astro-cid-hpnw4vwy> ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "menu", "class": "h-8", "data-astro-cid-hpnw4vwy": true })} </button> ${renderComponent($$result, "ThemeSwitcher", $$ThemeSwitcher, { "data-astro-cid-hpnw4vwy": true })} </div> <div id="menu-modal" class="modal hidden" aria-hidden="true" data-astro-cid-hpnw4vwy> <div class="fixed inset-0 bg-default px-8 py-4 text-default" data-astro-cid-hpnw4vwy> <div class="space-y-4" role="dialog" aria-modal="true" data-astro-cid-hpnw4vwy> <header class="text-right" data-astro-cid-hpnw4vwy> <button id="close-nav-button" type="button" class="btn" aria-label="Close navigation" data-astro-cid-hpnw4vwy> ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "close", "class": "h-8", "data-astro-cid-hpnw4vwy": true })} </button> </header> <div class="flex justify-center" data-astro-cid-hpnw4vwy> ${renderComponent($$result, "Icon", $$Icon, { "name": "logomark", "class": "h-16", "data-astro-cid-hpnw4vwy": true })} </div> <nav data-astro-cid-hpnw4vwy> <ul class="flex flex-col" data-astro-cid-hpnw4vwy> ${navItems.map(({ title, url }) => renderTemplate`<li data-astro-cid-hpnw4vwy> <a class="block py-4 text-center text-xl"${addAttribute(url, "href")} data-astro-cid-hpnw4vwy> ${title} </a> </li>`)} </ul> </nav> </div> </div> </div> </div> </header>  <noscript> <style>
    #open-nav-button {
      display: none;
    }
  </style> </noscript> `;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/components/header.astro", void 0);

const astronautImage = new Proxy({"src":"/_astro/astronaut.-l84RHKD.png","width":668,"height":1146,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const moonImage = new Proxy({"src":"/_astro/moon.iU9QHMMl.jpg","width":1920,"height":1080,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$3 = createAstro();
const $$HeroImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$HeroImage;
  const widths = [450, 800, 1200];
  const sizes = "100vw";
  return renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": "h-full w-full object-cover", "src": moonImage, "widths": widths, "sizes": sizes, "alt": "The ridged surface of the moon" })}`;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/components/hero-image.astro", void 0);

const $$Astro$2 = createAstro();
const $$Starfield = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Starfield;
  return renderTemplate`${maybeRenderHead()}<div id="starfield" class="absolute inset-0"> <canvas id="starfield-canvas"></canvas> </div> `;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/components/starfield.astro", void 0);

const $$Astro$1 = createAstro();
const $$Splash = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Splash;
  const widths = [450, 800];
  const sizes = "(min-width: 640px) 42vw, 67vw";
  return renderTemplate`${maybeRenderHead()}<section class="relative h-full bg-black" data-astro-cid-3egmgwtg> ${renderComponent($$result, "Starfield", $$Starfield, { "data-astro-cid-3egmgwtg": true })} <div id="splash-bg-fallback" class="absolute inset-0 hidden opacity-40" data-astro-cid-3egmgwtg> ${renderComponent($$result, "HeroImage", $$HeroImage, { "data-astro-cid-3egmgwtg": true })} </div> <div class="relative grid h-full place-items-center sm:grid-cols-2" data-astro-cid-3egmgwtg> <h2 class="flex flex-col gap-2 self-end sm:gap-4 sm:self-auto sm:justify-self-end" data-astro-cid-3egmgwtg> <!-- <Icon name="logomark" class="h-24 text-white md:h-32" /> --> <div class="gradient-text text-center font-extrabold tracking-tighter text-8xl py-10" data-astro-cid-3egmgwtg>
Intelligent,
<br data-astro-cid-3egmgwtg> tailored
<br data-astro-cid-3egmgwtg> to you.
</div> <div class="grid grid-cols-1 gap-2 sm:grid-cols-2" data-astro-cid-3egmgwtg> <a href="https://docs.astro.build/" class="flex items-center justify-center gap-3 border-2 border-current px-6 py-4" data-astro-cid-3egmgwtg> ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "chat", "class": "h-8", "data-astro-cid-3egmgwtg": true })} <span data-astro-cid-3egmgwtg>Chat with Fava</span> </a> <a href="https://astro.new/" class="flex items-center justify-center gap-3 border-2 border-current px-6 py-4" data-astro-cid-3egmgwtg> ${renderComponent($$result, "Icon", $$Icon, { "pack": "mdi", "name": "computer", "class": "h-8", "data-astro-cid-3egmgwtg": true })} <span data-astro-cid-3egmgwtg>AI Dashboard</span> </a> </div> </h2> <div id="astronaut" class="w-2/3 max-w-3xl self-start sm:w-1/2 " data-astro-cid-3egmgwtg> ${renderComponent($$result, "Image", $$Image, { "class": "h-full w-full object-cover", "src": astronautImage, "widths": widths, "sizes": sizes, "loading": "eager", "alt": "A floating astronaut in a space suit", "data-astro-cid-3egmgwtg": true })} </div> </div> </section> <noscript> <style>
    #splash-bg-fallback {
      display: block;
    }
  </style> </noscript> `;
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/components/splash.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { generator, site } = Astro2;
  const image = new URL("social.jpg", site);
  const description = "Intelligent financial advice, tailored to you. Astro is a new kind of site builder for the modern web. Lightning-fast performance meets powerful developer experience.";
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="h-full motion-safe:scroll-smooth" data-theme="dark"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><meta name="generator"', '><title>Fava Landing Page</title><meta name="description"', '><!-- social media --><meta property="og:title" content="Astro"><meta property="og:type" content="website"><meta property="og:description"', '><meta property="og:image"', '><meta property="og:url"', '><meta name="twitter:card" content="summary_large_image"><!-- initialize theme --><script>\n      const themeSaved = localStorage.getItem("theme");\n\n      if (themeSaved) {\n        document.documentElement.dataset.theme = themeSaved;\n      } else {\n        const prefersDark = window.matchMedia(\n          "(prefers-color-scheme: dark)",\n        ).matches;\n        document.documentElement.dataset.theme = prefersDark ? "dark" : "light";\n      }\n\n      window\n        .matchMedia("(prefers-color-scheme: dark)")\n        .addEventListener("change", (event) => {\n          if (!localStorage.getItem("theme")) {\n            document.documentElement.dataset.theme = event.matches\n              ? "dark"\n              : "light";\n          }\n        });\n    <\/script>', '</head> <body class="h-full overflow-x-hidden bg-default text-default text-base selection:bg-secondary selection:text-white"> ', " ", ' <!-- <div class="space-y-24 px-8 py-32">\n      <Intro />\n    </div> --> <!-- <Footer /> --> </body></html>'])), addAttribute(generator, "content"), addAttribute(description, "content"), addAttribute(description, "content"), addAttribute(image, "content"), addAttribute(site, "content"), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderComponent($$result, "Splash", $$Splash, {}));
}, "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/pages/index.astro", void 0);

const $$file = "/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
