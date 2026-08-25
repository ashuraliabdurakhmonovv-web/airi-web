/**
 * CSS bilan chizilgan laptop vizuali.
 * Uslublari `globals.css` ichidagi `.airi-laptop-*` bloklarida.
 * Faqat dekorativ — shuning uchun `aria-hidden`.
 */

const codeLines = [
  ["var", "cont"],
  ["min var", "min fun"],
  ["min var"],
  ["var", "atr", "cont"],
  ["min atr", "lrg fun", "min fun", "lrg cont"],
  ["lrg atr", "min fun", "min cont"],
  ["atr", "min fun", "atr"],
  ["min atr", "min cont", "lrg atr", "fun"],
  ["min atr", "lrg fun", "lrg cont", "min fun"],
  ["min var"],
  ["min var"],
  ["min var"],
  ["min atr", "min fun"],
  ["min atr", "min fun", "lrg fun", "lrg cont"],
  ["min atr", "min fun", "lrg atr", "lrg cont"],
  ["min fun", "lrg atr"],
  ["atr", "var", "cont"],
  ["min var"],
  ["min atr", "min fun", "lrg atr", "lrg cont"],
  ["min var"],
];

const codeLineTabs = [
  "", "", "", "",
  "tab1", "tab1", "tab1", "tab1", "tab1", "tab1", "tab1",
  "tab2", "tab2",
  "tab3", "tab3",
  "tab4",
  "tab1", "tab3", "tab4",
  "",
];

export function LaptopVisual() {
  return (
    <div className="airi-laptop-wrap" aria-hidden="true">
      <div className="airi-laptop-comp">
        <div className="airi-laptop-monitor">
          <div className="airi-laptop-mid">
            <div className="airi-laptop-site">
              <div className="airi-laptop-topbar">
                <div className="airi-laptop-window-controls">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              <div className="airi-laptop-inhead">
                <div className="airi-laptop-mid">
                  <div className="airi-laptop-site-item" />
                </div>
                <div className="airi-laptop-mid airi-laptop-txr">
                  <div className="airi-laptop-site-item" />
                  <div className="airi-laptop-site-item" />
                  <div className="airi-laptop-site-item" />
                  <div className="airi-laptop-site-item" />
                </div>
              </div>
              <div className="airi-laptop-inslid" />
              <div className="airi-laptop-incont">
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-site-item" />
                <div className="airi-laptop-widgets">
                  {[0, 1, 2].map((item) => (
                    <div className="airi-laptop-widget" key={item}>
                      <div>
                        <div className="airi-laptop-widget-foot" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="airi-laptop-infoot" />
              </div>
            </div>
          </div>

          <div className="airi-laptop-mid airi-laptop-code">
            {codeLines.map((line, lineIndex) => (
              <div
                className={`airi-laptop-line ${codeLineTabs[lineIndex]}`}
                key={`${line.join("-")}-${lineIndex}`}>
                {line.map((item, itemIndex) => (
                  <div
                    className={`airi-laptop-code-item ${item}`}
                    key={`${item}-${itemIndex}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="airi-laptop-base" />
      </div>
    </div>
  );
}
