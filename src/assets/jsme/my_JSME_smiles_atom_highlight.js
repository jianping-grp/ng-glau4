//this function will be called after the JavaScriptApplet code has been loaded.
function jsmeOnLoad() {

  jsmeApplet = new JSApplet.JSME("jsme_container", "380px", "340px", {
    "options" : "oldlook,star,nocanonize"
  });

  jsmeApplet.setNotifyStructuralChangeJSfunction("show_smiles");
}

var patt=/\[([A-Za-z][a-z]?)H?\d*:\d+\]/g; //regexp pattern for numbered atom

function show_smiles() {
  checkbox = document.getElementById("canonic_check");
  if(checkbox.checked) {
    jsmeApplet.options("canonize");
  } else {
    jsmeApplet.options("nocanonize");
  }
  smiles = jsmeApplet.smiles(); //atom that are colored are numbered
  new_smiles = smiles.replace(patt, '<em>$1</em>');
  document.getElementById("smiles_container").innerHTML = new_smiles
}
