
export default {
  console: function (code) {
    eval(code);
  },
  debugger: function (code) {
    const stepThrough = eval;
    const debuggered = "/* study tip: place breakpoints\n  - at the beginning of your function\n  - on the first line inside each it() \n*/\ndebugger;\n\n" + code;
    stepThrough(debuggered);
  },
};
