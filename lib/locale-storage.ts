/** Chaves de armazenamento usadas pelo seletor de idioma. */
export const PREFERRED_LOCALE_KEY = "preferred-locale";
export const SWITCH_POSITION_KEY = "locale-switch-position";

/**
 * Roda no <head> de "/" antes da pintura.
 * - Se o visitante já escolheu um idioma pelo seletor, essa escolha vale.
 * - Senão, navegador em inglês vai para /en e em espanhol para /es.
 * - Robôs de busca e o Lighthouse não são redirecionados.
 * Para abrir sempre em português, basta remover este script do RootDocument.
 */
export const FIRST_VISIT_REDIRECT_SCRIPT = `(function(){try{
if(location.pathname!=="/")return;
if(/bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent))return;
var s=null;try{s=localStorage.getItem("${PREFERRED_LOCALE_KEY}")}catch(e){}
var t=null;
if(s){if(s==="en")t="/en";else if(s==="es")t="/es";}
else{var l=((navigator.languages&&navigator.languages[0])||navigator.language||"").toLowerCase();
if(l.indexOf("en")===0)t="/en";else if(l.indexOf("es")===0)t="/es";}
if(t)location.replace(t+location.hash);
}catch(e){}})();`;
