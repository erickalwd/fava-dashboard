import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'mime';
import './chunks/astro_En4Eb4Ws.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../../../../usr/local/lib/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.2I6WtTK-.js"}],"styles":[{"type":"inline","content":"@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-cyrillic-ext-wght-normal.yBM_KeYt.woff2) format(\"woff2-variations\");unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-cyrillic-wght-normal.ZiSV2vHp.woff2) format(\"woff2-variations\");unicode-range:U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-greek-ext-wght-normal.-QGCzYqo.woff2) format(\"woff2-variations\");unicode-range:U+1F00-1FFF}@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-greek-wght-normal.8iAzSMjZ.woff2) format(\"woff2-variations\");unicode-range:U+0370-03FF}@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-vietnamese-wght-normal.PxkLsD1V.woff2) format(\"woff2-variations\");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-latin-ext-wght-normal.jdaSF5G5.woff2) format(\"woff2-variations\");unicode-range:U+0100-02AF,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Inter Variable;font-style:normal;font-display:swap;font-weight:100 900;src:url(/_astro/inter-latin-wght-normal.YFatk6uG.woff2) format(\"woff2-variations\");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.fixed-header #theme-switcher[data-astro-cid-l4aeqea3]{@apply ml-0 scale-100;}.fixed-header[data-astro-cid-hpnw4vwy]{@apply fixed bottom-auto top-0;@apply border-default bg-default text-default;}.modal[data-astro-cid-hpnw4vwy].is-open{@apply block;}@keyframes float{0%{transform:translateZ(0)}to{transform:translate3d(0,30px,0)}}#astronaut[data-astro-cid-3egmgwtg]{animation:float linear 2.5s infinite alternate}@media (prefers-reduced-motion: reduce){#astronaut[data-astro-cid-3egmgwtg]{@apply animate-none;}#starfield{@apply hidden;}#splash-bg-fallback[data-astro-cid-3egmgwtg]{@apply block;}}a,.btn{@apply transition-colors duration-200;@apply hover:text-secondary;@apply focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-transparent;}.gradient-text{@apply bg-clip-text text-transparent;@apply bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500;}[data-theme=light]{--color-primary: theme(\"colors.pink.500\");--color-secondary: theme(\"colors.indigo.500\");--color-text: theme(\"colors.gray.900\");--color-text-offset: theme(\"colors.gray.600\");--color-background: theme(\"colors.gray.50\");--color-background-offset: theme(\"colors.gray.100\");--color-border: theme(\"colors.gray.900\" / 10%)}[data-theme=dark]{--color-primary: theme(\"colors.pink.400\");--color-secondary: theme(\"colors.indigo.400\");--color-text: theme(\"colors.gray.50\");--color-text-offset: theme(\"colors.gray.400\");--color-background: theme(\"colors.gray.900\");--color-background-offset: theme(\"colors.gray.800\");--color-border: theme(\"colors.gray.50\" / 10%)}\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/erickalwd/Documents/Visual Studio/astro-landing-page-main/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000empty-middleware":"_empty-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/src/pages/index.astro":"chunks/pages/index_Qpp3J7Ga.mjs","\u0000@astrojs-manifest":"manifest_IlTBo8Mn.mjs","\u0000@astro-page:../../../../../usr/local/lib/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_wQfH9hiO.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_lZ39quQ9.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.2I6WtTK-.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/inter-greek-ext-wght-normal.-QGCzYqo.woff2","/_astro/inter-vietnamese-wght-normal.PxkLsD1V.woff2","/_astro/inter-cyrillic-ext-wght-normal.yBM_KeYt.woff2","/_astro/inter-greek-wght-normal.8iAzSMjZ.woff2","/_astro/inter-latin-wght-normal.YFatk6uG.woff2","/_astro/inter-latin-ext-wght-normal.jdaSF5G5.woff2","/_astro/inter-cyrillic-wght-normal.ZiSV2vHp.woff2","/_astro/astronaut.-l84RHKD.png","/_astro/moon.iU9QHMMl.jpg","/favicon.svg","/social.jpg","/_astro/hoisted.2I6WtTK-.js"]});

export { manifest };
