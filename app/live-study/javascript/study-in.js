
export default {
  console: function (code) {
    eval(code);
  },
  debugger: function (code) {
    const stepThrough = eval;
    const debuggered = "debugger; // injected by LiveStudy\n\n" + code;
    stepThrough(debuggered);
  },
};
