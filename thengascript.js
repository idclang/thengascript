const coreLangKeywords = {
    "അടിത്തറ": "default",
    "ആണെങ്കിൽ":"if",
    "അല്ലെങ്കിൽ": "else",
    "ആകു": "let",
    "നില": "case",
    "അറ്റ": "null",
    "ഇറക്കുമതി": "import",
    "ഇത്": "this",
    "ഇന്": "for",
    "ഇല്‍": "in",
    "എടുത്തുകാട്ടാണ്": "instanceof",
    "മേല്‍വക": "super",
    "എറിയു": "throw",
    "എണ്ണല്‍": "enum",
    "എത്തരം": "typeof",
    "എന്നിരിക്കെ": "while",
    "ഒടുവിൽ": "finally",
    "ഒപ്പം": "with",
    "കയറ്റുമതി": "export",
    "കളയു": "delete",
    "കാത്തിരിക്കു": "await",
    "ഇനം": "class",
    "ചെയ്യു": "do",
    "തിരിക്കു": "switch",
    "തിരുത്തൽ": "debugger",
    "തുടരു": "continue",
    "തെറ്റ്": "false",
    "നല്‍കു": "yield",
    "നിലവില്‍വരുത്തു": "implements",
    "മാറ്റംവരുന്ന": "var",
    "പിടിക്കു": "catch",
    "പുതു": "new",
    "പ്രയോഗം": "function",
    "പൊതു": "public",
    "പൊതി": "package",
    "മടക്കം": "return",
    "മുടക്കു": "break",
    "വിലയിരുത്തല്‍": "eval",
    "വഴക്ക്": "arguments",
    "പാഴ്": "void",
    "വിടര്‍ത്തുന്നു": "extends",
    "ശരി": "true",
    "മാറാത്ത": "const",
    "നോക്കു": "try",
    "ഇടപെടല്‍മുകം": "interface",
    "കാക്കപ്പെട്ട": "protected",
    "ഒളിവായ": "private",
    "ഉറച്ച": "static"};

const browserObjects = {"കാട്ടു": "console.log", "മുന്നറിയിപ്പ്": "alert"};

const മലയാളം_to_english = Object.assign({}, coreLangKeywords, browserObjects);

async function loadFile(src) {

    let resp = null;
    
    try {
        
        resp = await fetch(src);

    } catch(e) {

        console.log("Error on loading file: ", e);

        return false;
        
    }

    let body = null;

    if(resp) body = await resp.text();

    return body;

};

const translate = (x) => {

    let keys = Object.keys(മലയാളം_to_english);

    let replacer = new RegExp(keys.join("|"),"gi")

    return x.replace(replacer, matched => മലയാളം_to_english[matched]);

};

const run = (code) => {

    try {

	eval(code);

    } catch(e) {

	console.log("Error: ", e);

    }

};

const compile = (x) => run(translate(x));

async function compileScripts() {
    
    let scripts = document.querySelectorAll("script");

    for(let script of scripts) {

        if(script.type == "text/thengascript") {

	    if(script.src) {

	        let contents = await loadFile(script.src);

                compile(contents);

	    } else {

	        compile(script.textContent);

	    }
        }
    } 
};

/* ബ്രൗസേഴ്സിന് വേണ്ടി */
if(typeof window != "undefined")
    window.addEventListener('DOMContentLoaded', compileScripts);

/* മൊഴിമാറ്റവും വിലയിരുത്തലും നോഡില്‍ കിട്ടുന്നതാണ് */
if(typeof module != "undefined" && module.exports)
    module.exports = {translate, run, compile};
