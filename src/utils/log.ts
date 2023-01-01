enum LogLevel {
  Debug = 0,
  Important = 1,
}

let logLevel = LogLevel.Debug;

function log(...args: any) {
  const background = args.includes("bg");
  const foreground = args.includes("fg");
  const highlight = args.includes("hl");
  const error = args.includes("err");

  if (logLevel === LogLevel.Important && !(highlight || error)) return;

  const filteredArgs = args.filter(
    (arg: any) => arg !== "bg" && arg !== "fg" && arg !== "hl" && arg !== "err"
  );

  for (const arg of filteredArgs) {
    if (typeof arg === "string") {
      console.log(
        "%c" + arg,
        `color: ${
          background ? "#4287f5" : foreground ? "#36e02d" : "yellow"
        }; font-size: ${
          error ? "20px" : highlight ? "30px" : "12px"
        }; font-weight: ${error | highlight ? "bold" : "normal"}`
      );
    } else {
      console.log(arg);
    }
  }
}

//"#4287f5"
export function bgLog(...args: any) {
  log(...args, "bg");
}

//"#36e02d"
export function fgLog(...args: any) {
  log(...args, "fg");
}
